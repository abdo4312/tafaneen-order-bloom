import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';


const logActivity = (userId: string, userName: string, action: string) => {
  console.log('Mock Log Activity:', userId, userName, action);
};

const GeneralSettings: React.FC = () => {
  const [siteTitle, setSiteTitle] = useState('');
  const [siteDescription, setSiteDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const { user } = useAuth();

  const handleSave = () => {
    // Logic to save settings
    console.log('Saving settings:', { siteTitle, siteDescription, contactEmail });
    alert('Settings saved successfully!');
    if (user) {
      logActivity(user.id, user.name, `Updated general settings: Site Title - ${siteTitle}, Site Description - ${siteDescription}, Contact Email - ${contactEmail}`);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">الإعدادات العامة</h1>
      <div className="space-y-4">
        <div>
          <label htmlFor="siteTitle" className="block text-sm font-medium text-gray-700">عنوان الموقع</label>
          <input
            type="text"
            id="siteTitle"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={siteTitle}
            onChange={(e) => setSiteTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700">وصف الموقع</label>
          <textarea
            id="siteDescription"
            rows={3}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={siteDescription}
            onChange={(e) => setSiteDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">البريد الإلكتروني للتواصل</label>
          <input
            type="email"
            id="contactEmail"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>
        <button
          onClick={handleSave}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          حفظ الإعدادات
        </button>
      </div>
    </div>
  );
};

export default GeneralSettings;