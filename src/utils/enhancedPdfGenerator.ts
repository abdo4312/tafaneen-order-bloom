import jsPDF from 'jspdf';
import { CartItem } from '@/contexts/CartContext';
import { toArabicNumbers, formatArabicDate, formatArabicTime, formatCurrency } from './arabicNumbers';

export interface EnhancedInvoiceData {
  items: CartItem[];
  totalPrice: number;
  customerName?: string;
  customerPhone?: string;
  invoiceNumber: string;
  date: Date;
  subtotal?: number;
  discount?: number;
  tax?: number;
  deliveryMethod: 'pickup' | 'delivery';
  notes?: string;
}

// ألوان الفاتورة
const COLORS = {
  primary: '#2c6ea5',
  primaryDark: '#173752',
  primaryLight: '#eaf2f8',
  borderLight: '#c1d5e5',
  accent: '#0e8a3e',
  text: '#333333',
  textLight: '#666666'
};

export function generateEnhancedInvoicePDF(data: EnhancedInvoiceData): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // إعداد الخط للعربية
  doc.setFont('helvetica');
  doc.setR2L(true);

  let yPosition = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  // 1. الترويسة
  drawHeader(doc, yPosition, pageWidth, margin);
  yPosition += 35;

  // 2. معلومات الفاتورة
  yPosition = drawInvoiceInfo(doc, data, yPosition, pageWidth, margin);
  yPosition += 15;

  // 3. معلومات العميل
  if (data.customerName || data.customerPhone) {
    yPosition = drawCustomerInfo(doc, data, yPosition, margin);
    yPosition += 15;
  }

  // 4. جدول المنتجات
  yPosition = drawProductsTable(doc, data.items, yPosition, margin, contentWidth);
  yPosition += 10;

  // 5. ملخص الحساب
  yPosition = drawInvoiceSummary(doc, data, yPosition, pageWidth, margin);
  yPosition += 15;

  // 6. معلومات الاستلام
  yPosition = drawPickupInfo(doc, data.deliveryMethod, yPosition, margin);
  yPosition += 15;

  // 7. التذييل
  drawFooter(doc, yPosition, pageWidth, margin);

  // إضافة رقم الصفحة
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(COLORS.textLight);
    const pageText = `صفحة ${toArabicNumbers(i)} من ${toArabicNumbers(pageCount)}`;
    doc.text(pageText, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
  }

  return doc;
}

function drawHeader(doc: jsPDF, yPos: number, pageWidth: number, margin: number) {
  // خلفية الترويسة
  doc.setFillColor(COLORS.primary);
  doc.rect(0, 0, pageWidth, 40, 'F');

  // اسم المكتبة
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('مكتبة تفانين', pageWidth / 2, yPos, { align: 'center' });

  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('للأدوات المكتبية والقرطاسية', pageWidth / 2, yPos + 8, { align: 'center' });

  // خط فاصل
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos + 12, pageWidth - margin, yPos + 12);
}

function drawInvoiceInfo(doc: jsPDF, data: EnhancedInvoiceData, yPos: number, pageWidth: number, margin: number): number {
  doc.setTextColor(COLORS.text);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('فاتورة إلكترونية', pageWidth / 2, yPos, { align: 'center' });

  yPos += 12;

  // إطار معلومات الفاتورة
  doc.setFillColor(COLORS.primaryLight);
  doc.setDrawColor(COLORS.borderLight);
  doc.setLineWidth(0.5);
  doc.rect(margin, yPos, pageWidth - (margin * 2), 25, 'FD');

  doc.setTextColor(COLORS.primaryDark);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');

  const invoiceInfo = [
    `رقم الفاتورة: ${toArabicNumbers(data.invoiceNumber)}`,
    `التاريخ: ${formatArabicDate(data.date)}`,
    `الوقت: ${formatArabicTime(data.date)}`
  ];

  let infoY = yPos + 8;
  invoiceInfo.forEach(info => {
    doc.text(info, pageWidth - margin - 5, infoY, { align: 'right' });
    infoY += 6;
  });

  return yPos + 25;
}

function drawCustomerInfo(doc: jsPDF, data: EnhancedInvoiceData, yPos: number, margin: number): number {
  doc.setTextColor(COLORS.primaryDark);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('بيانات العميل:', margin + 5, yPos);

  yPos += 8;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(COLORS.text);

  if (data.customerName) {
    doc.text(`الاسم: ${data.customerName}`, margin + 10, yPos);
    yPos += 6;
  }

  if (data.customerPhone) {
    doc.text(`رقم الهاتف: ${data.customerPhone}`, margin + 10, yPos);
    yPos += 6;
  }

  return yPos;
}

function drawProductsTable(doc: jsPDF, items: CartItem[], yPos: number, margin: number, contentWidth: number): number {
  // عنوان الجدول
  doc.setTextColor(COLORS.primaryDark);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('تفاصيل الطلب:', margin + 5, yPos);
  yPos += 10;

  // رأس الجدول
  const tableHeaders = ['المنتج', 'الكمية', 'سعر الوحدة', 'الإجمالي'];
  const colWidths = [contentWidth * 0.5, contentWidth * 0.15, contentWidth * 0.175, contentWidth * 0.175];
  let colX = margin;

  // خلفية رأس الجدول
  doc.setFillColor(COLORS.primaryDark);
  doc.rect(margin, yPos, contentWidth, 10, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');

  tableHeaders.forEach((header, index) => {
    const textX = colX + (colWidths[index] / 2);
    doc.text(header, textX, yPos + 7, { align: 'center' });
    colX += colWidths[index];
  });

  yPos += 10;

  // محتوى الجدول
  doc.setTextColor(COLORS.text);
  doc.setFont('helvetica', 'normal');
  doc.setDrawColor(COLORS.borderLight);
  doc.setLineWidth(0.3);

  items.forEach((item, index) => {
    // تظليل خفيف للصفوف المتناوبة
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, yPos, contentWidth, 12, 'F');
    }

    colX = margin;
    const rowData = [
      item.name,
      toArabicNumbers(item.quantity),
      formatCurrency(item.price),
      formatCurrency(item.price * item.quantity)
    ];

    rowData.forEach((data, colIndex) => {
      const textX = colX + (colWidths[colIndex] / 2);
      doc.text(data, textX, yPos + 8, { align: 'center' });
      colX += colWidths[colIndex];
    });

    // خط أسفل الصف
    doc.line(margin, yPos + 12, margin + contentWidth, yPos + 12);
    yPos += 12;
  });

  return yPos;
}

function drawInvoiceSummary(doc: jsPDF, data: EnhancedInvoiceData, yPos: number, pageWidth: number, margin: number): number {
  const summaryWidth = 80;
  const summaryX = pageWidth - margin - summaryWidth;

  // إطار الملخص
  doc.setFillColor(COLORS.primaryLight);
  doc.setDrawColor(COLORS.borderLight);
  doc.setLineWidth(0.5);
  doc.rect(summaryX, yPos, summaryWidth, 35, 'FD');

  doc.setTextColor(COLORS.primaryDark);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');

  let summaryY = yPos + 8;

  // المجموع الفرعي
  const subtotal = data.subtotal || data.totalPrice;
  doc.text('المجموع الفرعي:', summaryX + 5, summaryY);
  doc.text(formatCurrency(subtotal), summaryX + summaryWidth - 5, summaryY, { align: 'right' });
  summaryY += 6;

  // الخصم (إن وجد)
  if (data.discount && data.discount > 0) {
    doc.setTextColor(COLORS.accent);
    doc.text('الخصم:', summaryX + 5, summaryY);
    doc.text(`-${formatCurrency(data.discount)}`, summaryX + summaryWidth - 5, summaryY, { align: 'right' });
    summaryY += 6;
  }

  // الضريبة (إن وجدت)
  if (data.tax && data.tax > 0) {
    doc.setTextColor(COLORS.text);
    doc.text('الضريبة:', summaryX + 5, summaryY);
    doc.text(formatCurrency(data.tax), summaryX + summaryWidth - 5, summaryY, { align: 'right' });
    summaryY += 6;
  }

  // خط فاصل
  doc.setDrawColor(COLORS.primaryDark);
  doc.setLineWidth(1);
  doc.line(summaryX + 5, summaryY + 1, summaryX + summaryWidth - 5, summaryY + 1);
  summaryY += 4;

  // المجموع النهائي
  doc.setTextColor(COLORS.primaryDark);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('المجموع النهائي:', summaryX + 5, summaryY);
  doc.text(formatCurrency(data.totalPrice), summaryX + summaryWidth - 5, summaryY, { align: 'right' });

  return yPos + 35;
}

function drawPickupInfo(doc: jsPDF, deliveryMethod: string, yPos: number, margin: number): number {
  doc.setTextColor(COLORS.primaryDark);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');

  const title = deliveryMethod === 'pickup' ? 'معلومات الاستلام:' : 'معلومات التوصيل:';
  doc.text(title, margin + 5, yPos);
  yPos += 8;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(COLORS.text);

  if (deliveryMethod === 'pickup') {
    const pickupInfo = [
      '• العنوان: مكتبة تفانين - شارع الجامعة الرئيسي',
      '• ساعات العمل: من ٩:٠٠ صباحاً إلى ٩:٠٠ مساءً',
      '• أيام العمل: السبت إلى الخميس',
      '• يرجى إحضار هذه الفاتورة عند الاستلام'
    ];

    pickupInfo.forEach(info => {
      doc.text(info, margin + 10, yPos);
      yPos += 6;
    });
  } else {
    doc.text('• سيتم التواصل معكم لتحديد موعد التوصيل', margin + 10, yPos);
    yPos += 6;
    doc.text('• رسوم التوصيل: مجاني للطلبات أكثر من ١٠٠٠ جنيه', margin + 10, yPos);
    yPos += 6;
  }

  return yPos;
}

function drawFooter(doc: jsPDF, yPos: number, pageWidth: number, margin: number) {
  // التأكد من وجود مساحة كافية للتذييل
  if (yPos > 250) {
    doc.addPage();
    yPos = 50;
  }

  // خط فاصل
  doc.setDrawColor(COLORS.borderLight);
  doc.setLineWidth(0.5);
  doc.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  // خلفية التذييل
  doc.setFillColor(COLORS.primaryLight);
  doc.rect(margin, yPos, pageWidth - (margin * 2), 25, 'F');

  doc.setTextColor(COLORS.primaryDark);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('شكراً لتسوقكم معنا!', pageWidth / 2, yPos + 8, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('للاستفسارات: ٠١٠٢٦٢٧٤٢٣٥', pageWidth / 2, yPos + 15, { align: 'center' });
  doc.text('مكتبة تفانين - جودة وثقة منذ سنوات', pageWidth / 2, yPos + 20, { align: 'center' });
}

export function downloadEnhancedInvoice(data: EnhancedInvoiceData) {
  const pdf = generateEnhancedInvoicePDF(data);
  const fileName = `فاتورة-${data.invoiceNumber}-${formatArabicDate(data.date).replace(/\s/g, '-')}.pdf`;
  pdf.save(fileName);
}
