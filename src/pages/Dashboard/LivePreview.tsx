import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';


const logActivity = (userId: string, userName: string, action: string) => {
  console.log('Mock Log Activity:', userId, userName, action);
};

const LivePreview: React.FC = () => {
  const { user } = useAuth();
  // Placeholder URL for the live preview
  const previewUrl = "http://localhost:5173/"; // Replace with actual site URL or dynamic content

  useEffect(() => {
    if (user) {
      logActivity(user.id, user.name, "Viewed live preview");
    }
  }, [user]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">معاينة مباشرة</h1>
      <p className="mb-4">هنا سيتم عرض معاينة حية للموقع بناءً على التغييرات غير المحفوظة.</p>
      <div className="border rounded-lg overflow-hidden" style={{ height: '70vh' }}>
        <iframe src={previewUrl} title="Live Preview" className="w-full h-full border-none"></iframe>
      </div>
      {/* Add controls for refreshing or navigating the preview if needed */}
    </div>
  );
};

export default LivePreview;