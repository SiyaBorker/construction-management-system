import React from 'react';
import { Page } from '../types';
import { NAV_ITEMS } from '../constants';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  return (
    <aside className="w-16 md:w-64 bg-white flex flex-col z-30 border-r border-gray-200">
      <div className="flex items-center justify-center md:justify-start md:pl-6 h-16 border-b border-gray-200 flex-shrink-0">
        <div className="bg-amber-500 p-2 rounded-md flex items-center justify-center">
            <svg className="w-6 h-6 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-800 ml-3 hidden md:block">ConstructAI</h1>
      </div>
      <nav className="flex-1 overflow-y-auto mt-5">
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActivePage(item.id)}
                className={`flex items-center w-full py-3 px-5 text-left transition-colors duration-200 ${
                  activePage === item.id
                    ? 'text-amber-600 bg-amber-50 border-l-4 border-amber-500 font-semibold'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span className="ml-4 hidden md:block">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center justify-center md:justify-start bg-gray-100 hover:bg-gray-200 text-gray-600 p-3 rounded-md transition-colors">
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            <span className="hidden md:block ml-3">Help & Support</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;