import { DashboardLayout } from '@/components/DashboardLayout';
import { useState } from 'react';
import { mockProducts, mockCategories, Product } from '@/data/mockData';
import { Plus, Edit2, Trash2, Upload, X, Star, Sparkles, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ProductsManagement = () => {
    const [products, setProducts] = useState<Product[]>(mockProducts);
    const [showDialog, setShowDialog] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [productForm, setProductForm] = useState({
        name: '',
        image: '',
        price: 0,
        originalPrice: 0,
        categoryId: '',
        subcategoryId: '',
        isBestSeller: false,
        isNewArrival: false,
        active: true,
    });

    // Add Product
    const handleAddProduct = () => {
        setEditingProduct(null);
        setProductForm({
            name: '',
            image: '',
            price: 0,
            originalPrice: 0,
            categoryId: '',
            subcategoryId: '',
            isBestSeller: false,
            isNewArrival: false,
            active: true,
        });
        setShowDialog(true);
    };

    // Edit Product
    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setProductForm({
            name: product.name,
            image: product.image,
            price: product.price,
            originalPrice: product.originalPrice || 0,
            categoryId: product.categoryId,
            subcategoryId: product.subcategoryId || '',
            isBestSeller: product.isBestSeller,
            isNewArrival: product.isNewArrival,
            active: product.active,
        });
        setShowDialog(true);
    };

    // Save Product
    const handleSaveProduct = () => {
        if (editingProduct) {
            setProducts(products.map(p =>
                p.id === editingProduct.id
                    ? { ...p, ...productForm }
                    : p
            ));
        } else {
            const newProduct: Product = {
                id: Date.now().toString(),
                ...productForm,
            };
            setProducts([...products, newProduct]);
        }
        setShowDialog(false);
    };

    // Delete Product
    const handleDeleteProduct = (productId: string) => {
        if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
            setProducts(products.filter(p => p.id !== productId));
        }
    };

    // Get category name
    const getCategoryName = (categoryId: string) => {
        return mockCategories.find(c => c.id === categoryId)?.name || 'غير محدد';
    };

    // Get subcategories for selected category
    const getSubcategories = (categoryId: string) => {
        return mockCategories.find(c => c.id === categoryId)?.subcategories || [];
    };

    // Filter products
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black text-gray-800">إدارة المنتجات</h1>
                        <p className="text-sm text-gray-500 mt-1">جميع المنتجات في المتجر</p>
                    </div>
                    <Button onClick={handleAddProduct} className="gap-2 bg-primary hover:bg-primary/90">
                        <Plus className="w-4 h-4" />
                        إضافة منتج جديد
                    </Button>
                </div>

                {/* Search */}
                <div className="bg-white rounded-xl shadow-sm p-4">
                    <div className="relative">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="ابحث عن منتج..."
                            className="pr-10 text-right"
                        />
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600">الصورة</th>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600">اسم المنتج</th>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600">القسم</th>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600">السعر</th>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600">العلامات</th>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600">الحالة</th>
                                    <th className="px-4 py-3 text-right text-xs font-bold text-gray-600">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredProducts.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                            لا توجد منتجات
                                        </td>
                                    </tr>
                                ) : (
                                    filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                                    {product.image ? (
                                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <Upload className="w-5 h-5 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="font-bold text-gray-800 text-sm">{product.name}</p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="text-sm text-gray-600">{getCategoryName(product.categoryId)}</p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="text-right">
                                                    <p className="font-bold text-primary">{product.price} ج.م</p>
                                                    {product.originalPrice && product.originalPrice > product.price && (
                                                        <p className="text-xs text-gray-400 line-through">{product.originalPrice} ج.م</p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-1 justify-end">
                                                    {product.isBestSeller && (
                                                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full flex items-center gap-1">
                                                            <Star className="w-3 h-3" />
                                                            الأكثر مبيعاً
                                                        </span>
                                                    )}
                                                    {product.isNewArrival && (
                                                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full flex items-center gap-1">
                                                            <Sparkles className="w-3 h-3" />
                                                            وصل حديثاً
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                {product.active ? (
                                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                                        نشط
                                                    </span>
                                                ) : (
                                                    <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full">
                                                        غير نشط
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2 justify-end">
                                                    <Button
                                                        onClick={() => handleEditProduct(product)}
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <Edit2 className="w-4 h-4 text-blue-600" />
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleDeleteProduct(product.id)}
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <Trash2 className="w-4 h-4 text-red-600" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                        <p className="text-3xl font-black text-primary">{products.length}</p>
                        <p className="text-sm text-gray-600 mt-1">إجمالي المنتجات</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                        <p className="text-3xl font-black text-green-600">
                            {products.filter(p => p.active).length}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">المنتجات النشطة</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                        <p className="text-3xl font-black text-yellow-600">
                            {products.filter(p => p.isBestSeller).length}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">الأكثر مبيعاً</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                        <p className="text-3xl font-black text-blue-600">
                            {products.filter(p => p.isNewArrival).length}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">وصل حديثاً</p>
                    </div>
                </div>
            </div>

            {/* Product Dialog */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-right">
                            {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-right block">اسم المنتج</Label>
                                <Input
                                    id="name"
                                    value={productForm.name}
                                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                    placeholder="مثال: قلم جاف أزرق"
                                    className="text-right"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-right block">القسم الرئيسي</Label>
                                <select
                                    id="category"
                                    value={productForm.categoryId}
                                    onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value, subcategoryId: '' })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="">اختر القسم...</option>
                                    {mockCategories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {productForm.categoryId && getSubcategories(productForm.categoryId).length > 0 && (
                            <div className="space-y-2">
                                <Label htmlFor="subcategory" className="text-right block">القسم الفرعي (اختياري)</Label>
                                <select
                                    id="subcategory"
                                    value={productForm.subcategoryId}
                                    onChange={(e) => setProductForm({ ...productForm, subcategoryId: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="">بدون قسم فرعي</option>
                                    {getSubcategories(productForm.categoryId).map(sub => (
                                        <option key={sub.id} value={sub.id}>{sub.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price" className="text-right block">السعر الحالي (ج.م)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={productForm.price}
                                    onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) || 0 })}
                                    placeholder="0.00"
                                    className="text-right"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="originalPrice" className="text-right block">السعر الأصلي (اختياري)</Label>
                                <Input
                                    id="originalPrice"
                                    type="number"
                                    value={productForm.originalPrice}
                                    onChange={(e) => setProductForm({ ...productForm, originalPrice: parseFloat(e.target.value) || 0 })}
                                    placeholder="0.00"
                                    className="text-right"
                                />
                                <p className="text-xs text-gray-500 text-right">لعرض الخصم (يجب أن يكون أكبر من السعر الحالي)</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image" className="text-right block">صورة المنتج</Label>
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                                {productForm.image ? (
                                    <div className="relative">
                                        <img src={productForm.image} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                                        <button
                                            onClick={() => setProductForm({ ...productForm, image: '' })}
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
                                                setProductForm({ ...productForm, image: reader.result as string });
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                <Label htmlFor="bestSeller" className="text-right font-bold text-sm">الأكثر مبيعاً</Label>
                                <input
                                    id="bestSeller"
                                    type="checkbox"
                                    checked={productForm.isBestSeller}
                                    onChange={(e) => setProductForm({ ...productForm, isBestSeller: e.target.checked })}
                                    className="w-5 h-5 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500 cursor-pointer"
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <Label htmlFor="newArrival" className="text-right font-bold text-sm">وصل حديثاً</Label>
                                <input
                                    id="newArrival"
                                    type="checkbox"
                                    checked={productForm.isNewArrival}
                                    onChange={(e) => setProductForm({ ...productForm, isNewArrival: e.target.checked })}
                                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                                <Label htmlFor="active" className="text-right font-bold text-sm">المنتج نشط</Label>
                                <input
                                    id="active"
                                    type="checkbox"
                                    checked={productForm.active}
                                    onChange={(e) => setProductForm({ ...productForm, active: e.target.checked })}
                                    className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="gap-2">
                        <Button variant="outline" onClick={() => setShowDialog(false)}>إلغاء</Button>
                        <Button onClick={handleSaveProduct} className="bg-primary">حفظ</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
};

export default ProductsManagement;
