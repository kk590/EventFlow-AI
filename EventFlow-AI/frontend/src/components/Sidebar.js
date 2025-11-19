import React from 'react';
import {
  HomeIcon,
  UsersIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const Sidebar = ({ currentView, setCurrentView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'leads', label: 'Leads', icon: UsersIcon },
    { id: 'analytics', label: 'Analytics', icon: ChartBarIcon },
    { id: 'settings', label: 'Settings', icon: Cog6ToothIcon }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="text-xl font-bold">EventFlow AI</h1>
        <p className="text-sm text-blue-100 opacity-80">Event Planning Platform</p>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`sidebar-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => setCurrentView(item.id)}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 px-4">
        <div className="bg-blue-700 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-white mb-2">Quick Stats</h3>
          <div className="space-y-1 text-xs text-blue-100">
            <div className="flex justify-between">
              <span>Active Leads</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span>Today's Calls</span>
              <span className="font-medium">8</span>
            </div>
            <div className="flex justify-between">
              <span>New Messages</span>
              <span className="font-medium">3</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 px-4">
        <div className="flex space-x-2">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 px-3 rounded-lg transition-colors">
            <PhoneIcon className="h-4 w-4 inline mr-1" />
            Call
          </button>
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs py-2 px-3 rounded-lg transition-colors">
            <EnvelopeIcon className="h-4 w-4 inline mr-1" />
            SMS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
