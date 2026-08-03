import { DashboardLayout } from '@/components/DashboardLayout';
import { useState } from 'react';
import { Eye, EyeOff, GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HomeSection {
    id: string;
    name: string;
    description: string;
    visible: boolean;
    order: number;
}

const HomepageSettings = () => {
    const [sections, setSections] = useState<HomeSection[]>([
        { id: 'hero', name: 'البانر الرئيسي', description: 'البانر الكبير في أعلى الصفحة', visible: true, order: 1 },
        { id: 'categories', name: 'الفئات المميزة', description: 'عرض الأقسام الرئيسية', visible: true, order: 2 },
        { id: 'secondary-banner', name: 'البانر الثانوي', description: 'بانر ترويجي إضافي', visible: true, order: 3 },
        { id: 'luxury-dates', name: 'تمور فاخرة', description: 'قسم منتجات التمور', visible: true, order: 4 },
        { id: 'promo-banner', name: 'البانر الترويجي', description: 'بانر متحرك للعروض', visible: true, order: 5 },
        { id: 'offers', name: 'عروض وخصومات', description: 'قسم المنتجات المخفضة', visible: true, order: 6 },
    ]);

    const toggleVisibility = (sectionId: string) => {
        setSections(sections.map(s =>
            s.id === sectionId ? { ...s, visible: !s.visible } : s
        ));
    };

    const moveUp = (index: number) => {
        if (index === 0) return;
        const newSections = [...sections];
        [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
        // Update order numbers
        newSections.forEach((s, i) => s.order = i + 1);
        setSections(newSections);
    };

    const moveDown = (index: number) => {
        if (index === sections.length - 1) return;
        const newSections = [...sections];
        [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
        // Update order numbers
        newSections.forEach((s, i) => s.order = i + 1);
        setSections(newSections);
    };

    const visibleSections = sections.filter(s => s.visible).length;

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-black text-gray-800">إعدادات الصفحة الرئيسية</h1>
                    <p className="text-sm text-gray-500 mt-1">تحكم في ترتيب وإظهار الأقسام</p>
                </div>

                {/* Info Card */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Eye className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-blue-900 text-sm">كيفية الاستخدام</h3>
                            <p className="text-xs text-blue-700 mt-1">
                                اضغط على أيقونة العين لإظهار/إخفاء أي قسم من الصفحة الرئيسية. الأقسام المخفية لن تظهر للزوار.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sections List */}
                <div className="bg-white rounded-xl shadow-sm">
                    <div className="p-6 space-y-3">
                        {sections.map((section, index) => (
                            <div
                                key={section.id}
                                className={`border rounded-lg p-4 transition-all ${section.visible
                                    ? 'border-gray-200 bg-white'
                                    : 'border-gray-100 bg-gray-50 opacity-60'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    {/* Order Number */}
                                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm font-black text-primary">{index + 1}</span>
                                    </div>

                                    {/* Section Info */}
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800">{section.name}</h3>
                                        <p className="text-sm text-gray-500">{section.description}</p>
                                    </div>

                                    {/* Status Badge */}
                                    <div>
                                        {section.visible ? (
                                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                                ظاهر
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full">
                                                مخفي
                                            </span>
                                        )}
                                    </div>

                                    {/* Move Up/Down Buttons */}
                                    <div className="flex flex-col gap-1">
                                        <Button
                                            onClick={() => moveUp(index)}
                                            disabled={index === 0}
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 w-7 p-0 disabled:opacity-30"
                                            title="تحريك لأعلى"
                                        >
                                            <ArrowUp className="w-4 h-4 text-blue-600" />
                                        </Button>
                                        <Button
                                            onClick={() => moveDown(index)}
                                            disabled={index === sections.length - 1}
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 w-7 p-0 disabled:opacity-30"
                                            title="تحريك لأسفل"
                                        >
                                            <ArrowDown className="w-4 h-4 text-blue-600" />
                                        </Button>
                                    </div>

                                    {/* Toggle Visibility Button */}
                                    <Button
                                        onClick={() => toggleVisibility(section.id)}
                                        variant="ghost"
                                        size="sm"
                                        className="h-10 w-10 p-0"
                                        title={section.visible ? 'إخفاء' : 'إظهار'}
                                    >
                                        {section.visible ? (
                                            <Eye className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <EyeOff className="w-5 h-5 text-gray-400" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                        <p className="text-3xl font-black text-primary">{sections.length}</p>
                        <p className="text-sm text-gray-600 mt-1">إجمالي الأقسام</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                        <p className="text-3xl font-black text-green-600">{visibleSections}</p>
                        <p className="text-sm text-gray-600 mt-1">الأقسام الظاهرة</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                        <p className="text-3xl font-black text-gray-600">
                            {sections.length - visibleSections}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">الأقسام المخفية</p>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button className="bg-primary hover:bg-primary/90 px-8">
                        حفظ التغييرات
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default HomepageSettings;
