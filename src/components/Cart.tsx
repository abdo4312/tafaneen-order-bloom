import { useState, useEffect } from "react";
import { ShoppingCart, MapPin, Truck, MessageCircle, Download, X, Plus, Minus, Trash2, FileText, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { validateEgyptianPhone, formatEgyptianPhone } from "@/utils/phoneValidation";
import QRCode from "react-qr-code";
import { useAuth } from "@/contexts/AuthContext";
// import { supabase } from "@/integrations/supabase/client";

// دالة آمنة لتحميل الملفات
const downloadFileSafely = (blob: Blob, filename: string): boolean => {
  try {
    // التحقق من دعم المتصفح
    if (!window.URL || !window.URL.createObjectURL) {
      throw new Error('Browser does not support file download');
    }
    // تنظيف اسم الملف من الأحرف الخطيرة
    const safeFilename = filename.replace(/[<>:"/\\|?*]/g, '_');

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    // تعيين الخصائص بطريقة آمنة
    link.href = url;
    link.download = safeFilename;
    link.style.display = 'none';
    link.rel = 'noopener noreferrer';

    // تنفيذ التحميل بدون إضافة العنصر للـ DOM
    link.click();

    // تنظيف الذاكرة فوراً
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('خطأ في تحميل الملف:', error);
    return false;
  }
};

// دالة لتنظيف وتعقيم النصوص
const sanitizeText = (text: string): string => {
  if (typeof text !== 'string') return '';

  // إزالة الأحرف الخطيرة
  return text
    .replace(/[<>]/g, '') // إزالة HTML tags
    .replace(/javascript:/gi, '') // إزالة javascript protocols
    .replace(/data:/gi, '') // إزالة data protocols
    .trim();
};

interface CartProps {
  onLoginClick: () => void;
}

export function Cart({ onLoginClick }: CartProps) {
  const { items, updateQuantity, removeItem, getTotalPrice, getItemCount, clearCart } = useCart();
  const { user, session, isLoading: isAuthLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showPickupOptions, setShowPickupOptions] = useState(false);
  const [showDeliveryCheckout, setShowDeliveryCheckout] = useState(false);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const action = localStorage.getItem('post-login-action');
    if (action === 'open-cart' && user) {
      setIsOpen(true);
      localStorage.removeItem('post-login-action');
    }
  }, [user]);

  // بيانات العميل
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNameError, setCustomerNameError] = useState('');
  const [customerPhoneError, setCustomerPhoneError] = useState('');

  // بيانات العنوان للتوصيل
  const [areaName, setAreaName] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [floor, setFloor] = useState('');

  // خيارات البوابات مع أسعار التوصيل
  const AREA_OPTIONS = [
    // بوابات بسعر 20 جنيه
    { label: 'البوابة الأولى', fee: 20 },
    { label: 'البوابة الثانية', fee: 20 },
    { label: 'البوابة الثالثة', fee: 20 },
    { label: 'البوابة الرابعة', fee: 20 },
    { label: 'مساكن ضباط', fee: 20 },
    { label: 'الرماية', fee: 20 },

    // بوابات بسعر 25 جنيه
    { label: 'البوابة الأولى - المناطق (ع، ص، ن، ا، س، م، ك)', fee: 25 },
    { label: 'البوابة الثانية - المناطق (ع، ص، ن، ا، س، م، ك)', fee: 25 },
    { label: 'البوابة الثالثة - المناطق (ع، ص، ن، ا، س، م، ك)', fee: 25 },
    { label: 'البوابة الرابعة - المناطق (ع، ص، ن، ا، س، م، ك)', fee: 25 },

    // بوابات بسعر 30 جنيه
    { label: 'مساكن الشباب', fee: 30 },
    { label: 'الرماية - المنطقة الخاصة', fee: 30 },
  ] as const;

  const [area, setArea] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vodafone' | 'instapay'>('cod');

  // حساب الأسعار
  const cartCount = getItemCount();
  const totalPrice = getTotalPrice();
  const deliveryFee = AREA_OPTIONS.find(o => o.label === area)?.fee ?? 0;

  // التوصيل المجاني للطلبات أكثر من 1000 ج.م
  const isFreeDelivery = totalPrice >= 1000;
  const actualDeliveryFee = isFreeDelivery ? 0 : deliveryFee;

  const subtotal = totalPrice + (showDeliveryCheckout ? actualDeliveryFee : 0);
  const surcharge = showDeliveryCheckout && paymentMethod === 'vodafone' ? Math.ceil(subtotal * 0.01) : 0;
  const finalTotal = subtotal + surcharge;

  // التحقق من إمكانية المتابعة
  const canProceed = Boolean(
    customerName &&
    !customerPhoneError &&
    customerPhone &&
    areaName &&
    apartmentNumber &&
    buildingNumber &&
    floor &&
    area
  );

  // التحقق من صحة رقم الهاتف مع تعقيم البيانات
  const handlePhoneChange = (value: string) => {
    const sanitizedValue = sanitizeText(value);
    setCustomerPhone(sanitizedValue);
    setCustomerPhoneError('');

    if (sanitizedValue.trim()) {
      const validation = validateEgyptianPhone(sanitizedValue);
      if (!validation.isValid) {
        setCustomerPhoneError(validation.errorMessage || "رقم الهاتف غير صحيح");
      }
    }
  };

  // معالجة تغيير اسم العميل مع تعقيم البيانات
  const handleNameChange = (value: string) => {
    const sanitizedValue = sanitizeText(value);
    setCustomerName(sanitizedValue);
    setCustomerNameError(sanitizedValue ? '' : 'يرجى إدخال اسم العميل');
  };

  // إنشاء رقم فاتورة آمن
  const generateInvoiceNumber = (): string => {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `TF-${timestamp}-${random}`;
  };

  // --- Secure Order Creation ---
  const createOrder = async () => {
    // 1. Validate User Authentication
    if (!user || !session) {
      toast({
        title: "يرجى تسجيل الدخول أولاً",
        description: "يجب تسجيل الدخول لتتمكن من إتمام الطلب.",
        variant: "destructive",
      });
      return;
    }

    // 2. Validate Customer Info
    const sanitizedName = sanitizeText(customerName);
    const sanitizedPhone = sanitizeText(customerPhone);
    if (!sanitizedName) {
      setCustomerNameError('يرجى إدخال اسم العميل');
      return;
    }
    const phoneValidation = validateEgyptianPhone(sanitizedPhone);
    if (!phoneValidation.isValid) {
      setCustomerPhoneError(phoneValidation.errorMessage || "رقم هاتف غير صحيح");
      return;
    }

    setIsLoading(true);

    try {
      // 3. Prepare Payload for Edge Function
      const orderPayload = {
        items: items.map(item => ({ id: item.id, quantity: item.quantity })),
      };

      // 4. Invoke the Secure Edge Function
      // Mock implementation
      console.log('Mock creating order:', orderPayload);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = { order_id: `MOCK-${Date.now()}`, total_price: getTotalPrice() };
      const error = null;
      /*
      const { data, error } = await supabase.functions.invoke("create-order", {
        body: orderPayload,
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      */

      if (error) {
        throw new Error(error.message);
      }

      // 5. Handle Successful Order Creation
      toast({
        title: "تم إنشاء الطلب بنجاح!",
        description: `رقم طلبك هو: ${data.order_id}.`,
      });

      // 6. Proceed with WhatsApp notification using server-verified data
      sendWhatsAppNotification(data.order_id, data.total_price);

      // 7. Clear cart and reset state
      clearCart();
      setIsOpen(false);

    } catch (err) {
      console.error("Order creation failed:", err);
      toast({
        title: "فشل إنشاء الطلب",
        description: "حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendWhatsAppNotification = (orderId: string, serverTotalPrice: number) => {
    const sanitizedName = sanitizeText(customerName);
    const sanitizedPhone = sanitizeText(customerPhone);

    const orderItems = items.map((item, index) => {
      const sanitizedItemName = sanitizeText(item.name);
      return `${index + 1}. ${sanitizedItemName}\nالكمية: ${item.quantity}\nسعر الوحدة: ${item.price} ج.م`;
    }).join('\n\n');

    const message = `*طلب جديد من متجر تفانين*
*رقم الطلب:* ${orderId}
*العميل:* ${sanitizedName}
*الهاتف:* ${formatEgyptianPhone(sanitizedPhone)}
---
*تفاصيل الطلب:*
${orderItems}
---
*الإجمالي (تم التحقق منه):* ${serverTotalPrice} ج.م
*طريقة الاستلام:* ${selectedDeliveryMethod === 'delivery' ? 'توصيل للمنزل' : 'استلام من المكتبة'}
`;

    const phoneNumber = "201026274235"; // Business WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    if (whatsappUrl.startsWith('https://wa.me/')) {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // إنشاء فاتورة HTML آمنة
  const generateHTMLInvoice = () => {
    if (items.length === 0) {
      toast({
        title: "السلة فارغة",
        description: "يرجى إضافة منتجات للسلة أولاً",
        variant: "destructive",
      });
      return;
    }

    try {
      const invoiceNumber = generateInvoiceNumber();
      const today = new Date();
      const date = today.toLocaleDateString('ar-EG');
      const time = today.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

      // تعقيم بيانات العميل
      const sanitizedCustomerName = sanitizeText(customerName) || 'غير محدد';
      const sanitizedCustomerPhone = sanitizeText(customerPhone) || 'غير محدد';
      const sanitizedAreaName = sanitizeText(areaName);
      const sanitizedApartmentNumber = sanitizeText(apartmentNumber);
      const sanitizedBuildingNumber = sanitizeText(buildingNumber);
      const sanitizedFloor = sanitizeText(floor);
      const sanitizedArea = sanitizeText(area);

      // تحديد نوع الخدمة والتكلفة
      const serviceType = selectedDeliveryMethod === 'pickup' ? 'استلام من المكتبة' : 'توصيل للمنزل';
      const deliveryCost = selectedDeliveryMethod === 'pickup' ? 0 : deliveryFee;
      const paymentMethodText = paymentMethod === 'cod' ? 'الدفع عند الاستلام' :
        paymentMethod === 'vodafone' ? 'فودافون كاش' : 'إنستاباي';

      // تعقيم بيانات المنتجات
      const sanitizedItems = items.map(item => ({
        ...item,
        name: sanitizeText(item.name)
      }));

      const htmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>فاتورة الطلب - مكتبة تفانين</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
            font-family: 'Cairo', sans-serif; 
            background: #f9f9f9; 
            padding: 20px; 
            direction: rtl;
            text-align: right;
        }
        .invoice-container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: white; 
            padding: 30px; 
            border-radius: 12px; 
            box-shadow: 0 4px 20px rgba(0,0,0,0.1); 
        }
        .header { 
            text-align: center; 
            margin-bottom: 30px; 
            border-bottom: 2px solid #d9534f; 
            padding-bottom: 20px; 
        }
        .header h1 { 
            color: #d9534f; 
            font-size: 28px; 
            margin-bottom: 10px; 
        }
        .header p { 
            color: #666; 
            font-size: 14px; 
        }
        .invoice-details { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 20px; 
            margin-bottom: 30px; 
        }
        .section { 
            background: #f2dede; 
            padding: 20px; 
            border-radius: 8px; 
        }
        .section h3 { 
            color: #d9534f; 
            margin-bottom: 10px; 
            font-size: 18px; 
        }
        .info-row { 
            display: flex; 
            justify-content: space-between; 
            margin-bottom: 8px; 
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0; 
        }
        th, td { 
            padding: 12px; 
            text-align: right; 
            border-bottom: 1px solid #ddd; 
        }
        th { 
            background: #d9534f; 
            color: #fff; 
            font-weight: 600; 
        }
        .total-section { 
            background: #f8f9fa; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
        }
        .total-row { 
            display: flex; 
            justify-content: space-between; 
            margin-bottom: 10px; 
            padding: 5px 0; 
        }
        .final-total { 
            font-size: 20px; 
            font-weight: bold; 
            color: #d9534f; 
            border-top: 2px solid #d9534f; 
            padding-top: 10px; 
        }
        .footer { 
            text-align: center; 
            margin-top: 30px; 
            padding-top: 20px; 
            border-top: 1px solid #ddd; 
        }
        .address-section {
            background: #e8f4f8;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
        }
        @media print { 
            body { background: white; } 
            .invoice-container { box-shadow: none; } 
        }
    </style>
</head>
<body>
    <div class="invoice-container">
        <div class="header">
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">
                <div style="background: #d9534f; color: white; border-radius: 50%; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold;">
                    T
                </div>
            </div>
            <h1>مكتبة تفانين</h1>
            <p>فاتورة طلب إلكترونية</p>
            <p>📍 122 ز البوابة الاولي حدائق الاهرام اما اسماك بورسعيد بجوار المول القديم</p>
            <p>📞 01026274235</p>
        </div>
        
        <div class="invoice-details">
            <div class="section">
                <h3>معلومات الفاتورة</h3>
                <div class="info-row"><span>رقم الفاتورة:</span><span>${invoiceNumber}</span></div>
                <div class="info-row"><span>التاريخ:</span><span>${date}</span></div>
                <div class="info-row"><span>الوقت:</span><span>${time}</span></div>
                <div class="info-row"><span>طريقة الاستلام:</span><span>${serviceType}</span></div>
            </div>
            
            <div class="section">
                <h3>معلومات العميل</h3>
                <div class="info-row"><span>الاسم:</span><span>${sanitizedCustomerName}</span></div>
                <div class="info-row"><span>الهاتف:</span><span>${sanitizedCustomerPhone}</span></div>
            </div>
        </div>
        
        ${selectedDeliveryMethod === 'delivery' ? `
        <div class="address-section">
            <h3 style="color: #d9534f; margin-bottom: 10px;">عنوان التوصيل</h3>
            <p><strong>المنطقة:</strong> ${sanitizedAreaName}</p>
            <p><strong>رقم الشقة:</strong> ${sanitizedApartmentNumber}</p>
            <p><strong>رقم العمارة:</strong> ${sanitizedBuildingNumber}</p>
            <p><strong>الدور:</strong> ${sanitizedFloor}</p>
            <p><strong>المنطقة/البوابة:</strong> ${sanitizedArea}</p>
        </div>
        ` : ''}
        
        <table>
            <thead>
                <tr>
                    <th>المنتج</th>
                    <th>الكمية</th>
                    <th>السعر</th>
                    <th>الإجمالي</th>
                </tr>
            </thead>
            <tbody>
                ${sanitizedItems.map(item => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price} ج.م</td>
                    <td>${item.price * item.quantity} ج.م</td>
                </tr>
                `).join('')}
            </tbody>
        </table>
        
        <div class="total-section">
            <div class="total-row">
                <span>مجموع المنتجات:</span>
                <span>${totalPrice} ج.م</span>
            </div>
            ${selectedDeliveryMethod === 'delivery' ? `
            <div class="total-row">
                <span>رسوم التوصيل:</span>
                <span>${deliveryCost} ج.م</span>
            </div>
            ` : ''}
            ${paymentMethod === 'vodafone' ? `
            <div class="total-row">
                <span>رسوم فودافون كاش (1%):</span>
                <span>${surcharge} ج.م</span>
            </div>
            ` : ''}
            <div class="total-row">
                <span>طريقة الدفع:</span>
                <span>${paymentMethodText}</span>
            </div>
            <div class="total-row final-total">
                <span>الإجمالي النهائي:</span>
                <span>${selectedDeliveryMethod === 'pickup' ? totalPrice : finalTotal} ج.م</span>
            </div>
        </div>
        
        <div class="footer">
            <p>شكراً لثقتك بمكتبة تفانين!</p>
            <p>للاستفسار: 01026274235</p>
            <p>تاريخ الطباعة: ${new Date().toLocaleString('ar-EG')}</p>
        </div>
    </div>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const success = downloadFileSafely(blob, `فاتورة-${invoiceNumber}.html`);

      if (success) {
        toast({
          title: "تم تحميل الفاتورة",
          description: "تم تحميل الفاتورة بتنسيق HTML بنجاح",
        });
      } else {
        toast({
          title: "خطأ في التحميل",
          description: "حدث خطأ أثناء محاولة تحميل الفاتورة",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('خطأ في إنشاء الفاتورة:', error);
      toast({
        title: "خطأ في إنشاء الفاتورة",
        description: "حدث خطأ أثناء محاولة إنشاء الفاتورة",
        variant: "destructive",
      });
    }
  };

  // معالجة خيار التوصيل
  const handleDeliveryOption = () => {
    setSelectedDeliveryMethod('delivery');
    setShowDeliveryCheckout(true);
    setShowOptions(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        setShowOptions(false);
        setShowPickupOptions(false);
        setShowDeliveryCheckout(false);
      }
    }}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <Badge className="absolute -top-2 -left-2 h-5 w-5 flex items-center justify-center p-0 text-xs badge-new">
              {cartCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg overflow-hidden">
        <SheetHeader className="pb-4 border-b">
          <SheetTitle className="text-right text-lg font-semibold">سلة التسوق</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* عناصر السلة */}
          <div className="flex-1 overflow-y-auto py-4 px-1 max-h-[50vh] cart-scrollbar">
            {items.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>السلة فارغة</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="flex-1 text-right">
                      <h4 className="font-medium">{sanitizeText(item.name)}</h4>
                      <p className="text-sm text-muted-foreground">{item.price} جنيه</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>

                      <span className="w-8 text-center">{Math.max(0, item.quantity)}</span>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, Math.min(999, item.quantity + 1))}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* التذييل */}
          {items.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              {/* الإجمالي */}
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>الإجمالي: {showDeliveryCheckout ? finalTotal : totalPrice} جنيه</span>
              </div>

              {/* الخيارات الرئيسية */}
              {!showOptions && !showPickupOptions && !showDeliveryCheckout && (
                <div className="space-y-2">
                  {isAuthLoading ? (
                    <Button className="w-full" disabled>
                      جاري التحقق...
                    </Button>
                  ) : user ? (
                    <Button
                      className="w-full btn-tafaneen"
                      onClick={() => setShowOptions(true)}
                      disabled={isLoading}
                    >
                      {isLoading ? "جاري المعالجة..." : "إتمام الطلب"}
                    </Button>
                  ) : (
                    <div className="text-center p-2 rounded-md bg-yellow-100 border border-yellow-300 text-yellow-800">
                      يرجى <a href="#" onClick={(e) => { e.preventDefault(); onLoginClick(); }} className="font-bold underline">تسجيل الدخول</a> للمتابعة.
                    </div>
                  )}
                </div>
              )}

              {/* خيارات التوصيل/الاستلام */}
              {showOptions && !showPickupOptions && !showDeliveryCheckout && (
                <div className="space-y-2 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto pr-2 cart-scrollbar">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold">اختر طريقة الاستلام</h3>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2"
                    onClick={() => {
                      setSelectedDeliveryMethod('pickup');
                      setShowPickupOptions(true);
                    }}
                  >
                    <MapPin className="h-4 w-4" />
                    استلام من المكتبة
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2"
                    onClick={handleDeliveryOption}
                  >
                    <Truck className="h-4 w-4" />
                    توصيل للمنزل
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => setShowOptions(false)}
                  >
                    <X className="h-4 w-4 ml-2" />
                    رجوع
                  </Button>
                </div>
              )}

              {/* نموذج التوصيل */}
              {showDeliveryCheckout && (
                <div className="space-y-4 max-h-96 overflow-y-auto cart-scrollbar pr-2">
                  <div className="text-center mb-2">
                    <h3 className="text-lg font-semibold">معلومات التوصيل</h3>
                    <p className="text-sm text-muted-foreground">أدخل بياناتك ثم اختر طريقة الدفع</p>
                  </div>

                  {/* البيانات الشخصية */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-right">الاسم *</label>
                      <Input
                        value={customerName}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="أدخل اسم العميل"
                        className="text-right"
                        maxLength={100}
                        required
                      />
                      {customerNameError && <p className="text-destructive text-sm mt-1 text-right">{customerNameError}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-right">رقم الهاتف *</label>
                      <Input
                        value={customerPhone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="010xxxxxxxx أو +20 10xxxxxxxx"
                        className={`text-right ${customerPhoneError ? 'border-destructive' : ''}`}
                        dir="ltr"
                        maxLength={15}
                        required
                      />
                      {customerPhoneError && <p className="text-destructive text-sm mt-1 text-right">{customerPhoneError}</p>}
                    </div>

                    {/* العنوان */}
                    <div>
                      <label className="block text-sm font-medium mb-1 text-right">اسم المنطقة *</label>
                      <Input
                        value={areaName}
                        onChange={(e) => setAreaName(sanitizeText(e.target.value))}
                        placeholder="اسم المنطقة"
                        className="text-right"
                        maxLength={100}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-right">رقم الشقة *</label>
                      <Input
                        value={apartmentNumber}
                        onChange={(e) => setApartmentNumber(sanitizeText(e.target.value))}
                        placeholder="رقم الشقة"
                        className="text-right"
                        maxLength={20}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-right">رقم العمارة *</label>
                        <Input
                          value={buildingNumber}
                          onChange={(e) => setBuildingNumber(sanitizeText(e.target.value))}
                          placeholder="مثال: 12"
                          className="text-right"
                          maxLength={20}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-right">الدور *</label>
                        <Input
                          value={floor}
                          onChange={(e) => setFloor(sanitizeText(e.target.value))}
                          placeholder="مثال: 3"
                          className="text-right"
                          maxLength={20}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-right">اختيار المنطقة / البوابة *</label>
                      <select
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full border rounded-md p-2 text-right bg-background"
                        required
                      >
                        <option value="" disabled>اختر المنطقة</option>
                        {AREA_OPTIONS.map(opt => (
                          <option key={opt.label} value={opt.label}>
                            {opt.label} - رسوم توصيل {opt.fee} ج
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-muted-foreground mt-1 text-right">
                        رسوم التوصيل الحالية: {deliveryFee} ج
                      </p>
                    </div>
                  </div>

                  {/* طريقة الدفع أو تذكير */}
                  {!canProceed ? (
                    <div className="rounded-md border border-dashed p-3 text-right text-sm text-muted-foreground">
                      يرجى إدخال جميع البيانات المطلوبة بالأعلى (الاسم، الهاتف، العنوان، المنطقة/البوابة) لإظهار طرق الدفع ورابط/رمز الدفع.
                    </div>
                  ) : (
                    <>
                      {/* طريقة الدفع */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-right">طريقة الدفع</h4>
                        <div className="grid grid-cols-1 gap-2">
                          <Button
                            variant={paymentMethod === 'cod' ? 'default' : 'outline'}
                            onClick={() => setPaymentMethod('cod')}
                            className="text-sm"
                          >
                            الدفع عند الاستلام
                          </Button>
                          <Button
                            variant={paymentMethod === 'vodafone' ? 'default' : 'outline'}
                            onClick={() => setPaymentMethod('vodafone')}
                            className="text-sm"
                          >
                            فودافون كاش (+1%)
                          </Button>
                          <Button
                            variant={paymentMethod === 'instapay' ? 'default' : 'outline'}
                            onClick={() => setPaymentMethod('instapay')}
                            className="text-sm"
                          >
                            إنستا باي
                          </Button>
                        </div>

                        {/* روابط ورموز الدفع الإلكتروني */}
                        {paymentMethod !== 'cod' && (
                          <div className="mt-3 space-y-2 text-center">
                            <Button
                              className="btn-tafaneen w-full"
                              onClick={() => {
                                const link = paymentMethod === 'vodafone'
                                  ? 'http://vf.eg/vfcash?id=mt&qrId=E9kZZk&qrString=ac04f93ecff3b89619c576f2fa4436a0872aca3a6ccdfb5a8f6ef3a6b92ebeb7'
                                  : 'https://ipn.eg/C/Q/mosaadhosny7890/instapay?ISIGN=23052603MEUCIQC/ACli2Pcxq8/e/to1eqMfNxYCj4wQd8l/o2KSJTg1LwIgScy/K3IM2HEEei0Zkzqru9bBWjuFwgsbjHL1q0iffKA=';

                                // التحقق من أن الرابط آمن
                                if (link.startsWith('http://vf.eg/') || link.startsWith('https://ipn.eg/')) {
                                  window.open(link, '_blank', 'noopener,noreferrer');
                                }
                              }}
                            >
                              الانتقال إلى الدفع
                            </Button>
                            <div className="flex flex-col items-center gap-2">
                              <QRCode
                                value={paymentMethod === 'vodafone'
                                  ? 'http://vf.eg/vfcash?id=mt&qrId=E9kZZk&qrString=ac04f93ecff3b89619c576f2fa4436a0872aca3a6ccdfb5a8f6ef3a6b92ebeb7'
                                  : 'https://ipn.eg/C/Q/mosaadhosny7890/instapay?ISIGN=23052603MEUCIQC/ACli2Pcxq8/e/to1eqMfNxYCj4wQd8l/o2KSJTg1LwIgScy/K3IM2HEEei0Zkzqru9bBWjuFwgsbjHL1q0iffKA='
                                }
                                size={128}
                              />
                              <p className="text-xs text-muted-foreground">يمكنك المسح للدفع مباشرة</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* ملخص الحساب */}
                      <div className="space-y-1 text-right">
                        <div className="flex justify-between"><span>مجموع المنتجات</span><span>{totalPrice} ج</span></div>
                        {isFreeDelivery ? (
                          <div className="flex justify-between text-green-600"><span>رسوم التوصيل</span><span>مجاني ✨</span></div>
                        ) : (
                          <div className="flex justify-between"><span>رسوم التوصيل</span><span>{actualDeliveryFee} ج</span></div>
                        )}
                        {paymentMethod === 'vodafone' && (
                          <div className="flex justify-between"><span>+ 1% رسوم فودافون كاش</span><span>{surcharge} ج</span></div>
                        )}
                        {!isFreeDelivery && totalPrice < 1000 && (
                          <div className="text-xs text-green-600 text-center py-2 bg-green-50 rounded-md">
                            أضف {(1000 - totalPrice)} ج.م أخرى للحصول على التوصيل المجاني
                          </div>
                        )}
                        <div className="flex justify-between font-semibold"><span>الإجمالي النهائي</span><span>{finalTotal} ج</span></div>
                      </div>

                      {/* الإجراءات */}
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className="w-full flex items-center gap-2"
                          style={{ backgroundColor: '#25D366', color: 'white' }}
                          onClick={createOrder}
                          disabled={isLoading}
                        >
                          <MessageCircle className="h-4 w-4" />
                          {isLoading ? "جاري الإنشاء..." : "إنشاء الطلب وإرسال الإشعار"}
                        </Button>

                        <Button variant="outline" className="w-full flex items-center gap-2" onClick={generateHTMLInvoice}>
                          <FileText className="h-4 w-4" />
                          تنزيل الفاتورة (HTML)
                        </Button>

                        <Button variant="ghost" className="w-full" onClick={() => setShowDeliveryCheckout(false)}>
                          <X className="h-4 w-4 ml-2" />
                          رجوع
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* خيارات الاستلام الفرعية */}
              {showPickupOptions && (
                <div className="space-y-4 max-h-80 overflow-y-auto cart-scrollbar pr-2">
                  <div className="text-center mb-2">
                    <h3 className="text-lg font-semibold">معلومات العميل</h3>
                    <p className="text-sm text-muted-foreground">يرجى إدخال بياناتك لإتمام الطلب</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label htmlFor="customerName" className="block text-sm font-medium mb-1 text-right">الاسم</label>
                      <Input
                        id="customerName"
                        value={customerName}
                        onChange={(e) => handleNameChange(e.target.value)}
                        placeholder="أدخل اسم العميل"
                        className="text-right"
                        maxLength={100}
                      />
                      {customerNameError && <p className="text-destructive text-sm mt-1 text-right">{customerNameError}</p>}
                    </div>

                    <div>
                      <label htmlFor="customerPhone" className="block text-sm font-medium mb-1 text-right">رقم الهاتف</label>
                      <Input
                        id="customerPhone"
                        value={customerPhone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="010xxxxxxxx أو +20 10xxxxxxxx"
                        className={`text-right ${customerPhoneError ? 'border-destructive' : ''}`}
                        dir="ltr"
                        maxLength={15}
                      />
                      {customerPhoneError && <p className="text-destructive text-sm mt-1 text-right">{customerPhoneError}</p>}
                      <p className="text-xs text-muted-foreground text-right mt-1">
                        رقم هاتف مصري صحيح (موبايل أو أرضي)
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2"
                    style={{ backgroundColor: '#25D366', color: 'white' }}
                    onClick={createOrder}
                    disabled={!!customerPhoneError || isLoading}
                  >
                    <MessageCircle className="h-4 w-4" />
                    {isLoading ? "جاري الإنشاء..." : "إنشاء الطلب وإرسال الإشعار"}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2"
                    style={{ backgroundColor: '#2c6ea5', color: 'white' }}
                    onClick={generateHTMLInvoice}
                  >
                    <FileText className="h-4 w-4" />
                    تنزيل الفاتورة
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => setShowPickupOptions(false)}
                  >
                    <X className="h-4 w-4 ml-2" />
                    رجوع
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
