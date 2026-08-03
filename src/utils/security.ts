// دالات الأمان المساعدة

/**
 * تعقيم النصوص من الأحرف الخطيرة
 */
export const sanitizeText = (text: string): string => {
  if (typeof text !== 'string') return '';
  
  return text
    .replace(/[<>]/g, '') // إزالة HTML tags
    .replace(/javascript:/gi, '') // إزالة javascript protocols
    .replace(/data:/gi, '') // إزالة data protocols
    .replace(/on\w+\s*=/gi, '') // إزالة event handlers
    .trim()
    .substring(0, 1000); // تحديد الحد الأقصى للطول
};

/**
 * التحقق من صحة URL
 */
export const isValidUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
};

/**
 * التحقق من صحة رقم الهاتف
 */
export const sanitizePhoneNumber = (phone: string): string => {
  if (typeof phone !== 'string') return '';
  
  // إزالة جميع الأحرف غير الرقمية والرموز المسموحة
  return phone.replace(/[^\d+\-\s()]/g, '').substring(0, 20);
};

/**
 * تنظيف بيانات الكوكيز
 */
export const sanitizeCookieValue = (value: string): string => {
  if (typeof value !== 'string') return '';
  
  return value
    .replace(/[;\r\n]/g, '') // إزالة الأحرف التي قد تكسر الكوكي
    .substring(0, 4000); // تحديد الحد الأقصى للطول
};

/**
 * إنشاء اسم ملف آمن
 */
export const sanitizeFilename = (filename: string): string => {
  if (typeof filename !== 'string') return 'file';
  
  return filename
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, '_') // إزالة الأحرف غير المسموحة
    .replace(/^\.+/, '') // إزالة النقاط في البداية
    .substring(0, 255); // تحديد الحد الأقصى للطول
};

/**
 * التحقق من صحة JSON
 */
export const isValidJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};
