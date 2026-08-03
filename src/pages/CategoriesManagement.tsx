import { DashboardLayout } from '@/components/DashboardLayout';
import { useState } from 'react';
import { mockCategories, Category, Subcategory } from '@/data/mockData';
import { Plus, Edit2, Trash2, ChevronDown, ChevronRight, Image as ImageIcon, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CategoriesManagement = () => {
    const [categories, setCategories] = useState<Category[]>(mockCategories);
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

    // Dialog states
    const [showCategoryDialog, setShowCategoryDialog] = useState(false);
    const [showSubcategoryDialog, setShowSubcategoryDialog] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);
    const [selectedParentCategory, setSelectedParentCategory] = useState<string>('');

    // Form states
    const [categoryForm, setCategoryForm] = useState({ name: '', image: '', bgColor: 'bg-blue-50' });
    const [subcategoryForm, setSubcategoryForm] = useState({ name: '', image: '' });

    const toggleCategory = (categoryId: string) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(categoryId)) {
            newExpanded.delete(categoryId);
        } else {
            newExpanded.add(categoryId);
        }
        setExpandedCategories(newExpanded);
    };

    // Add Category
    const handleAddCategory = () => {
        setEditingCategory(null);
        setCategoryForm({ name: '', image: '', bgColor: 'bg-blue-50' });
        setShowCategoryDialog(true);
    };

    // Edit Category
    const handleEditCategory = (category: Category) => {
        setEditingCategory(category);
        setCategoryForm({ name: category.name, image: category.image, bgColor: category.bgColor });
        setShowCategoryDialog(true);
    };

    // Save Category
    const handleSaveCategory = () => {
        if (editingCategory) {
            // Update existing
            setCategories(categories.map(cat =>
                cat.id === editingCategory.id
                    ? { ...cat, ...categoryForm }
                    : cat
            ));
        } else {
            // Add new
            const newCategory: Category = {
                id: Date.now().toString(),
                ...categoryForm,
                order: categories.length + 1,
            };
            setCategories([...categories, newCategory]);
        }
        setShowCategoryDialog(false);
    };

    // Delete Category
    const handleDeleteCategory = (categoryId: string) => {
        if (confirm('هل أنت متأكد من حذف هذا القسم؟')) {
            setCategories(categories.filter(cat => cat.id !== categoryId));
        }
    };

    // Add Subcategory
    const handleAddSubcategory = (categoryId: string) => {
        setSelectedParentCategory(categoryId);
        setEditingSubcategory(null);
        setSubcategoryForm({ name: '', image: '' });
        setShowSubcategoryDialog(true);
    };

    // Edit Subcategory
    const handleEditSubcategory = (subcategory: Subcategory, categoryId: string) => {
        setSelectedParentCategory(categoryId);
        setEditingSubcategory(subcategory);
        setSubcategoryForm({ name: subcategory.name, image: subcategory.image });
        setShowSubcategoryDialog(true);
    };

    // Save Subcategory
    const handleSaveSubcategory = () => {
        setCategories(categories.map(cat => {
            if (cat.id === selectedParentCategory) {
                const subcategories = cat.subcategories || [];
                if (editingSubcategory) {
                    // Update existing
                    return {
                        ...cat,
                        subcategories: subcategories.map(sub =>
                            sub.id === editingSubcategory.id
                                ? { ...sub, ...subcategoryForm }
                                : sub
                        )
                    };
                } else {
                    // Add new
                    const newSubcategory: Subcategory = {
                        id: `${cat.id}-${Date.now()}`,
                        ...subcategoryForm,
                        categoryId: cat.id,
                        order: subcategories.length + 1,
                    };
                    return {
                        ...cat,
                        subcategories: [...subcategories, newSubcategory]
                    };
                }
            }
            return cat;
        }));
        setShowSubcategoryDialog(false);
    };

    // Delete Subcategory
    const handleDeleteSubcategory = (categoryId: string, subcategoryId: string) => {
        if (confirm('هل أنت متأكد من حذف هذا القسم الفرعي؟')) {
            setCategories(categories.map(cat => {
                if (cat.id === categoryId) {
                    return {
                        ...cat,
                        subcategories: cat.subcategories?.filter(sub => sub.id !== subcategoryId)
                    };
                }
                return cat;
            }));
        }
    };

    const colorOptions = [
        { name: 'أزرق', value: 'bg-blue-50' },
        { name: 'أخضر', value: 'bg-green-50' },
        { name: 'برتقالي', value: 'bg-orange-50' },
        { name: 'وردي', value: 'bg-pink-50' },
        { name: 'بنفسجي', value: 'bg-purple-50' },
        { name: 'أصفر', value: 'bg-yellow-50' },
        { name: 'رمادي', value: 'bg-gray-50' },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black text-gray-800">إدارة الأقسام</h1>
                        <p className="text-sm text-gray-500 mt-1">قسم ← قسم فرعي ← منتج</p>
                    </div>
                    <Button onClick={handleAddCategory} className="gap-2 bg-primary hover:bg-primary/90">
                        <Plus className="w-4 h-4" />
                        إضافة قسم جديد
                    </Button>
                </div>

                {/* Categories Tree */}
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-6 space-y-2">
                        {categories.map((category) => (
                            <div key={category.id} className="border border-gray-100 rounded-lg overflow-hidden">
                                {/* Category Row */}
                                <div className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors">
                                    <button
                                        onClick={() => toggleCategory(category.id)}
                                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                                    >
                                        {expandedCategories.has(category.id) ? (
                                            <ChevronDown className="w-5 h-5 text-gray-600" />
                                        ) : (
                                            <ChevronRight className="w-5 h-5 text-gray-600" />
                                        )}
                                    </button>

                                    <div className={`w-12 h-12 rounded-lg ${category.bgColor} flex items-center justify-center overflow-hidden`}>
                                        {category.image ? (
                                            <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="w-6 h-6 text-gray-400" />
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800">{category.name}</h3>
                                        <p className="text-xs text-gray-500">
                                            {category.subcategories?.length || 0} قسم فرعي
                                        </p>
                                    </div>

                                    <div className={`w-8 h-8 rounded-full ${category.bgColor} border-2 border-white shadow-sm`} />

                                    <div className="flex items-center gap-2">
                                        <Button onClick={() => handleEditCategory(category)} variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <Edit2 className="w-4 h-4 text-blue-600" />
                                        </Button>
                                        <Button onClick={() => handleDeleteCategory(category.id)} variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Subcategories */}
                                {expandedCategories.has(category.id) && (
                                    <div className="bg-gray-50 border-t border-gray-100">
                                        <div className="p-4 space-y-2">
                                            {category.subcategories?.map((subcategory) => (
                                                <div
                                                    key={subcategory.id}
                                                    className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-all mr-8"
                                                >
                                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                                        <ImageIcon className="w-5 h-5 text-gray-400" />
                                                    </div>

                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-sm text-gray-700">{subcategory.name}</h4>
                                                        <p className="text-xs text-gray-500">قسم فرعي</p>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Button onClick={() => handleEditSubcategory(subcategory, category.id)} variant="ghost" size="sm" className="h-7 w-7 p-0">
                                                            <Edit2 className="w-3.5 h-3.5 text-blue-600" />
                                                        </Button>
                                                        <Button onClick={() => handleDeleteSubcategory(category.id, subcategory.id)} variant="ghost" size="sm" className="h-7 w-7 p-0">
                                                            <Trash2 className="w-3.5 h-3.5 text-red-600" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}

                                            <button
                                                onClick={() => handleAddSubcategory(category.id)}
                                                className="w-full p-3 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-sm font-bold text-gray-600 hover:text-primary mr-8"
                                            >
                                                + إضافة قسم فرعي
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                        <p className="text-3xl font-black text-primary">{categories.length}</p>
                        <p className="text-sm text-gray-600 mt-1">إجمالي الأقسام</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                        <p className="text-3xl font-black text-blue-600">
                            {categories.reduce((acc, cat) => acc + (cat.subcategories?.length || 0), 0)}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">الأقسام الفرعية</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                        <p className="text-3xl font-black text-green-600">24</p>
                        <p className="text-sm text-gray-600 mt-1">المنتجات</p>
                    </div>
                </div>
            </div>

            {/* Category Dialog */}
            <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-right">
                            {editingCategory ? 'تعديل القسم' : 'إضافة قسم جديد'}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-right block">اسم القسم</Label>
                            <Input
                                id="name"
                                value={categoryForm.name}
                                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                                placeholder="مثال: أقلام"
                                className="text-right"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="image" className="text-right block">صورة القسم</Label>
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                                {categoryForm.image ? (
                                    <div className="relative">
                                        <img src={categoryForm.image} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                                        <button
                                            onClick={() => setCategoryForm({ ...categoryForm, image: '' })}
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
                                                setCategoryForm({ ...categoryForm, image: reader.result as string });
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-right block">لون الخلفية</Label>
                            <div className="grid grid-cols-4 gap-2">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color.value}
                                        onClick={() => setCategoryForm({ ...categoryForm, bgColor: color.value })}
                                        className={`h-12 rounded-lg ${color.value} border-2 transition-all ${categoryForm.bgColor === color.value ? 'border-primary scale-110' : 'border-gray-200'
                                            }`}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setShowCategoryDialog(false)}>إلغاء</Button>
                        <Button onClick={handleSaveCategory} className="bg-primary">حفظ</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Subcategory Dialog */}
            <Dialog open={showSubcategoryDialog} onOpenChange={setShowSubcategoryDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-right">
                            {editingSubcategory ? 'تعديل القسم الفرعي' : 'إضافة قسم فرعي'}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="sub-name" className="text-right block">اسم القسم الفرعي</Label>
                            <Input
                                id="sub-name"
                                value={subcategoryForm.name}
                                onChange={(e) => setSubcategoryForm({ ...subcategoryForm, name: e.target.value })}
                                placeholder="مثال: أقلام جاف"
                                className="text-right"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sub-image" className="text-right block">صورة القسم الفرعي (اختياري)</Label>
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                                {subcategoryForm.image ? (
                                    <div className="relative">
                                        <img src={subcategoryForm.image} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                                        <button
                                            onClick={() => setSubcategoryForm({ ...subcategoryForm, image: '' })}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <label htmlFor="sub-image-upload" className="cursor-pointer flex flex-col items-center gap-2 py-4">
                                        <Upload className="w-8 h-8 text-gray-400" />
                                        <p className="text-sm font-bold text-gray-600">اضغط لرفع صورة</p>
                                        <p className="text-xs text-gray-400">PNG, JPG (حد أقصى 2MB)</p>
                                    </label>
                                )}
                                <input
                                    id="sub-image-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setSubcategoryForm({ ...subcategoryForm, image: reader.result as string });
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setShowSubcategoryDialog(false)}>إلغاء</Button>
                        <Button onClick={handleSaveSubcategory} className="bg-primary">حفظ</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
};

export default CategoriesManagement;
