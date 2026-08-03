import { DashboardLayout } from '@/components/DashboardLayout';
import { useState } from 'react';
import { mockBanners, Banner } from '@/data/mockData';
import { Plus, Edit2, Trash2, Upload, X, Eye, EyeOff, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const BannersManagement = () => {
    const [banners, setBanners] = useState<Banner[]>(mockBanners);
    const [showDialog, setShowDialog] = useState(false);
    const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
    const [bannerForm, setBannerForm] = useState({
        title: '',
        subtitle: '',
        image: '',
        link: '',
        active: true
    });

    // Add Banner
    const handleAddBanner = () => {
        setEditingBanner(null);
        setBannerForm({ title: '', subtitle: '', image: '', link: '', active: true });
        setShowDialog(true);
    };

    // Edit Banner
    const handleEditBanner = (banner: Banner) => {
        setEditingBanner(banner);
        setBannerForm({
            title: banner.title,
            subtitle: banner.subtitle,
            image: banner.image,
            link: banner.link,
            active: banner.active
        });
        setShowDialog(true);
    };

    // Save Banner
    const handleSaveBanner = () => {
        if (editingBanner) {
            setBanners(banners.map(b =>
                b.id === editingBanner.id
                    ? { ...b, ...bannerForm }
                    : b
            ));
        } else {
            const newBanner: Banner = {
                id: Date.now().toString(),
                ...bannerForm,
                order: banners.length + 1,
            };
            setBanners([...banners, newBanner]);
        }
        setShowDialog(false);
    };

    // Delete Banner
    const handleDeleteBanner = (bannerId: string) => {
        if (confirm('هل أنت متأكد من حذف هذا البانر؟')) {
            setBanners(banners.filter(b => b.id !== bannerId));
        }
    };

    // Toggle Active
    const toggleActive = (bannerId: string) => {
        setBanners(banners.map(b =>
            b.id === bannerId ? { ...b, active: !b.active } : b
        ));
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black text-gray-800">إدارة البانرات</h1>
                        <p className="text-sm text-gray-500 mt-1">البانرات الترويجية في الصفحة الرئيسية</p>
                    </div>
                    <Button onClick={handleAddBanner} className="gap-2 bg-primary hover:bg-primary/90">
                        <Plus className="w-4 h-4" />
                        إضافة بانر جديد
                    </Button>
                </div>

                {/* Banners List */}
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-6 space-y-4">
                        {banners.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500">لا توجد بانرات حالياً</p>
                                <Button onClick={handleAddBanner} className="mt-4" variant="outline">
                                    إضافة أول بانر
                                </Button>
                            </div>
                        ) : (
                            banners.map((banner) => (
                                <div
                                    key={banner.id}
                                    className={`border rounded-lg overflow-hidden transition-all ${banner.active ? 'border-gray-200' : 'border-gray-100 opacity-60'
                                        }`}
                                >
                                    <div className="flex items-center gap-4 p-4">
                                        {/* Drag Handle */}
                                        <div className="cursor-move text-gray-400 hover:text-gray-600">
                                            <GripVertical className="w-5 h-5" />
                                        </div>

                                        {/* Banner Preview */}
                                        <div className="w-32 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                            {banner.image ? (
                                                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                    <Upload className="w-8 h-8" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Banner Info */}
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-800">{banner.title}</h3>
                                            <p className="text-sm text-gray-500">{banner.subtitle}</p>
                                            <p className="text-xs text-gray-400 mt-1">الرابط: {banner.link}</p>
                                        </div>

                                        {/* Status Badge */}
                                        <div className="flex items-center gap-2">
                                            {banner.active ? (
                                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                                    نشط
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full">
                                                    غير نشط
                                                </span>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2">
                                            <Button
                                                onClick={() => toggleActive(banner.id)}
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                            >
                                                {banner.active ? (
                                                    <EyeOff className="w-4 h-4 text-gray-600" />
                                                ) : (
                                                    <Eye className="w-4 h-4 text-gray-600" />
                                                )}
                                            </Button>
                                            <Button
                                                onClick={() => handleEditBanner(banner)}
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                            >
                                                <Edit2 className="w-4 h-4 text-blue-600" />
                                            </Button>
                                            <Button
                                                onClick={() => handleDeleteBanner(banner.id)}
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-600" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                        <p className="text-3xl font-black text-primary">{banners.length}</p>
                        <p className="text-sm text-gray-600 mt-1">إجمالي البانرات</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                        <p className="text-3xl font-black text-green-600">
                            {banners.filter(b => b.active).length}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">البانرات النشطة</p>
                    </div>
                </div>
            </div>

            {/* Banner Dialog */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="text-right">
                            {editingBanner ? 'تعديل البانر' : 'إضافة بانر جديد'}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-right block">عنوان البانر</Label>
                            <Input
                                id="title"
                                value={bannerForm.title}
                                onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                                placeholder="مثال: موسم المدارس"
                                className="text-right"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="subtitle" className="text-right block">العنوان الفرعي</Label>
                            <Input
                                id="subtitle"
                                value={bannerForm.subtitle}
                                onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                                placeholder="مثال: خصومات تصل إلى ٥٠٪"
                                className="text-right"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="link" className="text-right block">أين سيذهب البانر عند الضغط عليه؟</Label>
                            <select
                                id="link"
                                value={bannerForm.link}
                                onChange={(e) => setBannerForm({ ...bannerForm, link: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="">اختر الصفحة...</option>
                                <optgroup label="الصفحات الرئيسية">
                                    <option value="/">الصفحة الرئيسية</option>
                                    <option value="/offers">العروض والخصومات</option>
                                    <option value="/categories">جميع الأقسام</option>
                                </optgroup>
                                <optgroup label="أقسام المنتجات">
                                    <option value="/category/notebooks">نوت بوك</option>
                                    <option value="/category/books">كتب</option>
                                    <option value="/category/geometry">أدوات هندسية</option>
                                    <option value="/category/coloring">تلوين</option>
                                    <option value="/category/stickers">استيكرات</option>
                                    <option value="/category/pens">أقلام</option>
                                </optgroup>
                            </select>
                            <p className="text-xs text-gray-500 text-right">اختر الصفحة التي سينتقل إليها المستخدم عند الضغط على البانر</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image" className="text-right block">صورة البانر</Label>
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                                {bannerForm.image ? (
                                    <div className="relative">
                                        <img src={bannerForm.image} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                                        <button
                                            onClick={() => setBannerForm({ ...bannerForm, image: '' })}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2 py-4">
                                        <Upload className="w-8 h-8 text-gray-400" />
                                        <p className="text-sm font-bold text-gray-600">اضغط لرفع صورة</p>
                                        <p className="text-xs text-gray-400">PNG, JPG (حد أقصى 2MB)</p>
                                    </label>
                                )}
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setBannerForm({ ...bannerForm, image: reader.result as string });
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <Label htmlFor="active" className="text-right font-bold">البانر نشط</Label>
                            <input
                                id="active"
                                type="checkbox"
                                checked={bannerForm.active}
                                onChange={(e) => setBannerForm({ ...bannerForm, active: e.target.checked })}
                                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                            />
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setShowDialog(false)}>إلغاء</Button>
                        <Button onClick={handleSaveBanner} className="bg-primary">حفظ</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
};

export default BannersManagement;
