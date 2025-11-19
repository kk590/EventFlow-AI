import React from 'react';
import { BellIcon, UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <div className="header">
      <div className="header-title">EventFlow AI Dashboard</div>
      <div className="header-actions">
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="p-2 text-gray-600 hover:text-gray-900">
          <BellIcon className="h-6 w-6" />
        </button>
        <button className="p-2 text-gray-600 hover:text-gray-900">
          <UserCircleIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Header;
