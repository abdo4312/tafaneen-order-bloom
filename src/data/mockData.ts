// Mock data for Dashboard
export interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    categoryId: string;
    subcategoryId?: string;
    isBestSeller: boolean;
    isNewArrival: boolean;
    active: boolean;
}

export interface Subcategory {
    id: string;
    name: string;
    image: string;
    categoryId: string;
    order: number;
}

export interface Category {
    id: string;
    name: string;
    image: string;
    bgColor: string;
    order: number;
    subcategories?: Subcategory[];
}

export interface Banner {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    link: string;
    order: number;
    active: boolean;
}

// Mock Categories Data
export const mockCategories: Category[] = [
    {
        id: 'notebooks',
        name: 'نوت بوك',
        image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=300',
        bgColor: 'bg-orange-50',
        order: 1,
        subcategories: [
            { id: 'nb-1', name: 'سلك A4', image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=300', categoryId: 'notebooks', order: 1 },
            { id: 'nb-2', name: 'دبوس 28 ورقة', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300', categoryId: 'notebooks', order: 2 },
            { id: 'nb-3', name: 'كشكول 100 ورقة', image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=300', categoryId: 'notebooks', order: 3 },
            { id: 'nb-4', name: 'مفكرة جيب', image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=300', categoryId: 'notebooks', order: 4 },
        ]
    },
    {
        id: 'books',
        name: 'كتب',
        image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=300',
        bgColor: 'bg-green-50',
        order: 2,
        subcategories: [
            { id: 'bk-1', name: 'كتب تعليمية', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=300', categoryId: 'books', order: 1 },
            { id: 'bk-2', name: 'كتب تلوين', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=300', categoryId: 'books', order: 2 },
            { id: 'bk-3', name: 'قصص أطفال', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=300', categoryId: 'books', order: 3 },
        ]
    },
    {
        id: 'geometry',
        name: 'ادوات هندسيه',
        image: 'https://images.unsplash.com/photo-1542319630-55fb7f7c944a?q=80&w=300',
        bgColor: 'bg-pink-50',
        order: 3,
        subcategories: [
            { id: 'geo-1', name: 'براجل', image: 'https://images.unsplash.com/photo-1542319630-55fb7f7c944a?q=80&w=300', categoryId: 'geometry', order: 1 },
            { id: 'geo-2', name: 'مساطر', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=300', categoryId: 'geometry', order: 2 },
            { id: 'geo-3', name: 'منقلة', image: 'https://images.unsplash.com/photo-1542319630-55fb7f7c944a?q=80&w=300', categoryId: 'geometry', order: 3 },
            { id: 'geo-4', name: 'أطقم هندسة', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=300', categoryId: 'geometry', order: 4 },
        ]
    },
    {
        id: 'coloring',
        name: 'تلوين',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=300',
        bgColor: 'bg-gray-50',
        order: 4,
        subcategories: [
            { id: 'col-1', name: 'ألوان خشبية', image: 'https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=300', categoryId: 'coloring', order: 1 },
            { id: 'col-2', name: 'ألوان فلوماستر', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=300', categoryId: 'coloring', order: 2 },
            { id: 'col-3', name: 'ألوان مائية', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=300', categoryId: 'coloring', order: 3 },
        ]
    },
    {
        id: 'stickers',
        name: 'استيكرات',
        image: 'https://images.unsplash.com/photo-1572375958582-1224c2b9daa5?q=80&w=300',
        bgColor: 'bg-purple-50',
        order: 5,
        subcategories: [
            { id: 'stk-1', name: 'استيكرات تعليمية', image: 'https://images.unsplash.com/photo-1572375958582-1224c2b9daa5?q=80&w=300', categoryId: 'stickers', order: 1 },
            { id: 'stk-2', name: 'استيكرات ديزني', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=300', categoryId: 'stickers', order: 2 },
        ]
    },
    {
        id: 'pens',
        name: 'اقلام',
        image: 'https://images.unsplash.com/photo-1585336139118-24cc3f21f313?q=80&w=300',
        bgColor: 'bg-yellow-50',
        order: 6,
        subcategories: [
            { id: 'pn-1', name: 'أقلام جاف', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=300', categoryId: 'pens', order: 1 },
            { id: 'pn-2', name: 'أقلام رصاص', image: 'https://images.unsplash.com/photo-1563200030-4e08272993f3?q=80&w=300', categoryId: 'pens', order: 2 },
            { id: 'pn-3', name: 'أقلام جل', image: 'https://images.unsplash.com/photo-1585336139118-24cc3f21f313?q=80&w=300', categoryId: 'pens', order: 3 },
            { id: 'pn-4', name: 'أقلام تحديد', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=300', categoryId: 'pens', order: 4 },
        ]
    },
];

// Mock Products Data
export const mockProducts: Product[] = [
    // Notebooks (categoryId: 'notebooks')
    {
        id: 'p-nb-1',
        name: 'كشكول سلك A4 فابل',
        image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=300',
        price: 45.00,
        originalPrice: 50.00,
        categoryId: 'notebooks',
        subcategoryId: 'nb-1',
        isBestSeller: true,
        isNewArrival: false,
        active: true,
    },
    {
        id: 'p-nb-2',
        name: 'كراسة دبوس ٢٨ ورقة ديزني',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300',
        price: 12.50,
        categoryId: 'notebooks',
        subcategoryId: 'nb-2',
        isBestSeller: false,
        isNewArrival: true,
        active: true,
    },
    {
        id: 'p-nb-3',
        name: 'كشكول سلك A4 فاخر',
        image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=300',
        price: 55.00,
        categoryId: 'notebooks',
        subcategoryId: 'nb-1',
        isBestSeller: false,
        isNewArrival: false,
        active: true,
    },
    {
        id: 'p-nb-4',
        name: 'مفكرة جيب جلدية',
        image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=300',
        price: 35.00,
        categoryId: 'notebooks',
        subcategoryId: 'nb-4',
        isBestSeller: true,
        isNewArrival: true,
        active: true,
    },

    // Pens (categoryId: 'pens')
    {
        id: 'p-pn-1',
        name: 'قلم جاف أزرق بريما',
        image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=300',
        price: 5.00,
        originalPrice: 7.00,
        categoryId: 'pens',
        subcategoryId: 'pn-1',
        isBestSeller: true,
        isNewArrival: false,
        active: true,
    },
    {
        id: 'p-pn-2',
        name: 'قلم رصاص فابر كاستل',
        image: 'https://images.unsplash.com/photo-1563200030-4e08272993f3?q=80&w=300',
        price: 8.00,
        categoryId: 'pens',
        subcategoryId: 'pn-2',
        isBestSeller: false,
        isNewArrival: true,
        active: true,
    },
    {
        id: 'p-pn-3',
        name: 'طقم أقلام تحديد ٦ ألوان',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=300',
        price: 60.00,
        categoryId: 'pens',
        subcategoryId: 'pn-4',
        isBestSeller: true,
        isNewArrival: false,
        active: true,
    },

    // Geometry (categoryId: 'geometry')
    {
        id: 'p-geo-1',
        name: 'برجل هندسي احترافي',
        image: 'https://images.unsplash.com/photo-1542319630-55fb7f7c944a?q=80&w=300',
        price: 25.00,
        categoryId: 'geometry',
        subcategoryId: 'geo-1',
        isBestSeller: false,
        isNewArrival: true,
        active: true,
    },
    {
        id: 'p-geo-2',
        name: 'مسطرة ٣٠ سم مرنة',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=300',
        price: 10.00,
        categoryId: 'geometry',
        subcategoryId: 'geo-2',
        isBestSeller: true,
        isNewArrival: false,
        active: true,
    },
];

// Mock Banners Data
export const mockBanners: Banner[] = [
    {
        id: '1',
        title: 'موسم المدارس',
        subtitle: 'خصومات تصل إلى ٥٠٪',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop',
        link: '/offers',
        order: 1,
        active: true,
    },
    {
        id: '2',
        title: 'ألوان مائية',
        subtitle: 'اشتري ٢ واحصل على ١ مجاناً',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop',
        link: '/category/coloring',
        order: 2,
        active: true,
    },
    {
        id: '3',
        title: 'تمور فاخرة',
        subtitle: 'خصومات حصرية تصل إلى 50%',
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784720?q=80&w=2070&auto=format&fit=crop',
        link: '/category/dates',
        order: 3,
        active: false,
    },
];

// Notifications Data
export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'order' | 'customer' | 'system' | 'payment';
    status: 'unread' | 'read';
    time: string;
    customerName?: string;
    orderId?: string;
    amount?: number;
}

export const mockNotifications: Notification[] = [
    {
        id: 'n1',
        title: 'طلب جديد مستلم 🛍️',
        message: 'قام أحمد محمد بطلب 3 منتجات من قسم الأقلام.',
        type: 'order',
        status: 'unread',
        time: 'منذ دقيقتين',
        customerName: 'أحمد محمد',
        orderId: 'ORD-5542',
        amount: 15.00
    },
    {
        id: 'n2',
        title: 'تواصل عميل جديد 💬',
        message: 'سارة أرسلت استفساراً بخصوص توفر "طابعة كانون".',
        type: 'customer',
        status: 'unread',
        time: 'منذ ساعة',
        customerName: 'سارة علي'
    },
    {
        id: 'n3',
        title: 'تم تأكيد الدفع ✅',
        message: 'تم استلام مبلغ 150.00 ج.م لطلب مجموعة الهندسة.',
        type: 'payment',
        status: 'read',
        time: 'منذ 3 ساعات',
        customerName: 'محمود حسن',
        orderId: 'ORD-5530',
        amount: 150.00
    },
    {
        id: 'n4',
        title: 'تنبيه النظام ⚠️',
        message: 'مخزون "قلم بريما" قارب على الانتهاء (أقل من 5 قطع).',
        type: 'system',
        status: 'unread',
        time: 'منذ 5 ساعات'
    },
    {
        id: 'n5',
        title: 'طلب مكتمل 📦',
        message: 'تم تسليم الطلب رقم #ORD-5521 بنجاح.',
        type: 'order',
        status: 'read',
        time: 'أمس',
        customerName: 'ليلى يوسف',
        orderId: 'ORD-5521'
    }
];

// User Specific Notifications
export interface UserNotification {
    id: string;
    title: string;
    message: string;
    type: 'offer' | 'status' | 'account';
    isRead: boolean;
    date: string;
    image?: string;
}

export const mockUserNotifications: UserNotification[] = [
    {
        id: 'un1',
        title: 'طلبك جاهز للاستلام! 🎉',
        message: 'تم تجهيز طلبك رقم #ORD-5542 وهو الآن بانتظار استلامك من الفرع.',
        type: 'status',
        isRead: false,
        date: 'اليوم، 10:30 ص'
    },
    {
        id: 'un2',
        title: 'خصم حصري لك فقط 🎁',
        message: 'استخدم الكود TAF-20 واحصل على خصم 20% على طلبك القادم من قسم النوت بوك.',
        type: 'offer',
        isRead: false,
        date: 'أمس، 09:00 م',
        image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=300'
    },
    {
        id: 'un3',
        title: 'تحديث حالة الطلب 👋',
        message: 'طلبك رقم #ORD-5480 قيد التجهيز الآن في ورشة تفانين.',
        type: 'status',
        isRead: true,
        date: 'منذ يومين'
    }
];

export interface UserOrder {
    id: string;
    status: 'pending' | 'processing' | 'ready' | 'delivered';
    date: string;
    total: number;
    itemsCount: number;
}

export const mockUserOrders: UserOrder[] = [
    {
        id: 'ORD-5542',
        status: 'ready',
        date: '29 ديسمبر 2025',
        total: 15.00,
        itemsCount: 3
    },
    {
        id: 'ORD-5480',
        status: 'processing',
        date: '27 ديسمبر 2025',
        total: 85.50,
        itemsCount: 5
    }
];
