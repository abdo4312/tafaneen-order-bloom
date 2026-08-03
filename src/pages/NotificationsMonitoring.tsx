
import { DashboardLayout } from '@/components/DashboardLayout';
import { useState } from 'react';
import { mockNotifications, Notification } from '@/data/mockData';
import {
    Bell,
    ShoppingBag,
    MessageSquare,
    CreditCard,
    AlertTriangle,
    CheckCircle2,
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    Check,
    Clock,
    User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NotificationsMonitoring = () => {
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
    const [filter, setFilter] = useState<'all' | 'unread' | 'order' | 'customer'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const getTypeIcon = (type: Notification['type']) => {
        switch (type) {
            case 'order': return <ShoppingBag className="w-5 h-5 text-orange-500" />;
            case 'customer': return <MessageSquare className="w-5 h-5 text-blue-500" />;
            case 'payment': return <CreditCard className="w-5 h-5 text-green-500" />;
            case 'system': return <AlertTriangle className="w-5 h-5 text-red-500" />;
            default: return <Bell className="w-5 h-5 text-gray-500" />;
        }
    };

    const getTypeColor = (type: Notification['type']) => {
        switch (type) {
            case 'order': return 'bg-orange-50 border-orange-100';
            case 'customer': return 'bg-blue-50 border-blue-100';
            case 'payment': return 'bg-green-50 border-green-100';
            case 'system': return 'bg-red-50 border-red-100';
            default: return 'bg-gray-50 border-gray-100';
        }
    };

    const filteredNotifications = notifications.filter(n => {
        const matchesFilter = filter === 'all' ||
            (filter === 'unread' && n.status === 'unread') ||
            (filter === 'order' && n.type === 'order') ||
            (filter === 'customer' && n.type === 'customer');

        const matchesSearch = n.title.includes(searchQuery) ||
            n.message.includes(searchQuery) ||
            (n.customerName?.includes(searchQuery));

        return matchesFilter && matchesSearch;
    });

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, status: 'read' } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, status: 'read' })));
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100/50 backdrop-blur-xl">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">متابعة الإشعارات</h1>
                        <p className="text-gray-500 mt-1 font-medium">ابقَ على اطلاع دائم بكل ما يحدث في متجرك</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={markAllAsRead}
                            variant="outline"
                            className="rounded-2xl border-gray-200 hover:bg-gray-50 transition-all font-bold"
                        >
                            تحديد الكل كمقروء
                        </Button>
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center relative">
                            <Bell className="w-6 h-6 text-primary" />
                            {notifications.some(n => n.status === 'unread') && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full animate-pulse shadow-sm"></span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-8 flex flex-wrap gap-2">
                        {[
                            { id: 'all', label: 'الكل', icon: <Bell className="w-4 h-4" /> },
                            { id: 'unread', label: 'غير مقروء', icon: <Clock className="w-4 h-4" /> },
                            { id: 'order', label: 'الطلبات', icon: <ShoppingBag className="w-4 h-4" /> },
                            { id: 'customer', label: 'العملاء', icon: <User className="w-4 h-4" /> },
                        ].map((btn) => (
                            <button
                                key={btn.id}
                                onClick={() => setFilter(btn.id as any)}
                                className={`
                                    flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300
                                    ${filter === btn.id
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
                                    }
                                `}
                            >
                                {btn.icon}
                                {btn.label}
                            </button>
                        ))}
                    </div>
                    <div className="lg:col-span-4 relative group">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                        <Input
                            placeholder="ابحث في الإشعارات..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white border-gray-100 rounded-2xl pr-12 h-14 shadow-sm focus:ring-primary/20 transition-all text-right"
                        />
                    </div>
                </div>

                {/* Notifications List */}
                <div className="space-y-4">
                    {filteredNotifications.length === 0 ? (
                        <div className="bg-white rounded-[2rem] p-20 text-center border border-dashed border-gray-200">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Bell className="w-10 h-10 text-gray-300" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">لا توجد إشعارات حالياً</h3>
                            <p className="text-gray-500">جرب تغيير الفلتر أو البحث عن كلمة أخرى</p>
                        </div>
                    ) : (
                        filteredNotifications.map((notification, index) => (
                            <div
                                key={notification.id}
                                className={`
                                    group relative flex flex-col md:flex-row items-start md:items-center gap-4 bg-white p-5 rounded-[2rem] transition-all duration-500 border
                                    ${notification.status === 'unread'
                                        ? 'border-primary/20 shadow-xl shadow-primary/5 bg-gradient-to-l from-primary/[0.02] to-white'
                                        : 'border-gray-100 hover:border-gray-200 shadow-sm'
                                    }
                                    hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-200/50
                                `}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {/* Active Indicator */}
                                {notification.status === 'unread' && (
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-primary rounded-l-full shadow-[0_0_15px_rgba(var(--primary),0.5)]"></div>
                                )}

                                {/* Icon Wrapper */}
                                <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center border transition-transform duration-500 group-hover:rotate-12 ${getTypeColor(notification.type)}`}>
                                    {getTypeIcon(notification.type)}
                                </div>

                                {/* Content */}
                                <div className="flex-1 text-right space-y-1">
                                    <div className="flex items-center justify-between gap-4">
                                        <h3 className={`font-black text-lg ${notification.status === 'unread' ? 'text-gray-900' : 'text-gray-700'}`}>
                                            {notification.title}
                                        </h3>
                                        <span className="text-xs font-bold text-gray-400 whitespace-nowrap bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                                            {notification.time}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                        {notification.message}
                                    </p>

                                    {/* Sub-info pills */}
                                    <div className="flex flex-wrap gap-2 mt-3 justify-end">
                                        {notification.customerName && (
                                            <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-600 text-[10px] font-black rounded-lg border border-gray-100 uppercase tracking-tight">
                                                <User className="w-3 h-3" />
                                                {notification.customerName}
                                            </span>
                                        )}
                                        {notification.orderId && (
                                            <span className="flex items-center gap-1.5 px-3 py-1 bg-violet-50 text-violet-600 text-[10px] font-black rounded-lg border border-violet-100 uppercase tracking-tight">
                                                <ShoppingBag className="w-3 h-3" />
                                                #{notification.orderId}
                                            </span>
                                        )}
                                        {notification.amount && (
                                            <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black rounded-lg border border-green-100 uppercase tracking-tight">
                                                <CreditCard className="w-3 h-3" />
                                                {notification.amount.toFixed(2)} ج.م
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2 md:ml-4 mt-4 md:mt-0">
                                    {notification.status === 'unread' ? (
                                        <Button
                                            onClick={() => markAsRead(notification.id)}
                                            className="h-10 w-10 p-0 rounded-xl bg-primary hover:bg-primary-dark transition-all scale-100 hover:scale-110 shadow-lg shadow-primary/20"
                                            title="تحديد كمقروء"
                                        >
                                            <Check className="w-5 h-5" />
                                        </Button>
                                    ) : (
                                        <div className="h-10 w-10 flex items-center justify-center text-green-500 bg-green-50 rounded-xl border border-green-100">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                    )}
                                    <Button
                                        variant="outline"
                                        className="h-10 w-10 p-0 rounded-xl border-gray-100 hover:border-gray-200 transition-all hover:bg-gray-50"
                                        title="التفاصيل"
                                    >
                                        <Eye className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default NotificationsMonitoring;
