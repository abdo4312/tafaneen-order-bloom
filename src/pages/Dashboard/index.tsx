import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ContentManagement from './ContentManagement';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-semibold mb-6">لوحة التحكم</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <Link to="/dashboard/content" className="block p-2 rounded hover:bg-gray-200">
                إدارة المحتوى
              </Link>
            </li>
            {/* Add more navigation links here */}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet /> {/* This will render nested routes */}
        {/* For now, directly render ContentManagement */}
        <ContentManagement />
      </main>
    </div>
  );
};

export default Dashboard;