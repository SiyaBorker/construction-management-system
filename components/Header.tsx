import React from 'react';

interface HeaderProps {
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  return (
    <header className="bg-white shadow-sm p-4 border-b border-gray-200 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">{pageTitle}</h1>
      <div className="flex items-center space-x-4">
        <button className="relative text-gray-500 hover:text-gray-700">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
            <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>
        </button>
        <div className="flex items-center space-x-2">
            <img src="https://picsum.photos/id/1027/200/200" alt="User Avatar" className="h-9 w-9 rounded-full"/>
            <div>
                <p className="text-sm font-semibold text-gray-800">Alice Johnson</p>
                <p className="text-xs text-gray-500">Project Manager</p>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
