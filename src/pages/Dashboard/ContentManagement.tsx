import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';


const logActivity = (userId: string, userName: string, action: string) => {
  console.log('Mock Log Activity:', userId, userName, action);
};

const ContentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('texts'); // 'texts', 'images', 'articles'
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      logActivity(user.id, user.name, `Viewed content management tab: ${activeTab}`);
    }
  }, [activeTab, user]);

  const renderContent = () => {
    switch (activeTab) {
      case 'texts':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">إدارة النصوص</h2>
            <p>هنا يمكنك إدارة النصوص والمحتوى المكتوب.</p>
            {/* Add text management UI here */}
          </div>
        );
      case 'images':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">إدارة الصور</h2>
            <p>هنا يمكنك إدارة الصور وتحميلها.</p>
            {/* Add image management UI here */}
          </div>
        );
      case 'articles':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-2">إدارة المقالات</h2>
            <p>هنا يمكنك إدارة المقالات والمدونات.</p>
            {/* Add article management UI here */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">إدارة المحتوى</h1>
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 ${activeTab === 'texts' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('texts')}
        >
          النصوص
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'images' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('images')}
        >
          الصور
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'articles' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('articles')}
        >
          المقالات
        </button>
      </div>
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default ContentManagement;