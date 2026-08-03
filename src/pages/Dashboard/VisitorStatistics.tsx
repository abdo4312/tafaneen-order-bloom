import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';


const logActivity = (userId: string, userName: string, action: string) => {
  console.log('Mock Log Activity:', userId, userName, action);
};

const VisitorStatistics: React.FC = () => {
  const { user } = useAuth();
  // Dummy data for demonstration
  const totalVisitors = 12500;
  const pageViews = 35000;
  const uniqueVisitors = 9800;

  useEffect(() => {
    if (user) {
      logActivity(user.id, user.name, "Viewed visitor statistics");
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">إحصائيات الزوار والنشاطات</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">إجمالي الزوار</h2>
          <p className="text-3xl font-bold text-blue-600">{totalVisitors}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">مشاهدات الصفحة</h2>
          <p className="text-3xl font-bold text-green-600">{pageViews}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">الزوار الفريدون</h2>
          <p className="text-3xl font-bold text-purple-600">{uniqueVisitors}</p>
        </div>
      </div>
      {/* Add more detailed visitor statistics UI here */}
    </div>
  );
};

export default VisitorStatistics;