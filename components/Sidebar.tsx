import React from 'react';
import { Page } from '../types';

interface SidebarProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
    const navItems: { name: Page, icon: React.ReactNode }[] = [
        { name: 'Dashboard', icon: <HomeIcon /> },
        { name: 'Projects', icon: <FolderIcon /> },
        { name: 'AI Cost Estimator', icon: <CpuChipIcon /> },
        { name: 'Stock Management', icon: <CircleStackIcon /> },
        { name: 'Financials', icon: <BanknotesIcon /> },
        { name: 'Team', icon: <UsersIcon /> },
        { name: 'Hiring', icon: <UserPlusIcon /> },
        { name: 'Reports', icon: <ChartBarIcon /> },
    ];

    return (
        <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 fixed h-full">
            <div className="text-2xl font-bold text-amber-500 mb-10 px-2">ConstructAI</div>
            <nav>
                <ul>
                    {navItems.map(item => (
                        <li key={item.name}>
                            <a
                                href="#"
                                onClick={(e) => { e.preventDefault(); setCurrentPage(item.name); }}
                                className={`flex items-center px-3 py-3 my-1 rounded-lg transition-colors ${currentPage === item.name ? 'bg-amber-500 text-gray-900 font-bold' : 'hover:bg-gray-700'}`}
                            >
                                <span className="w-6 h-6 mr-3">{item.icon}</span>
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

// Icons
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" /></svg>;
const FolderIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>;
const CpuChipIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5m0 15v1.5M12 4.5v1.5m0 12v1.5" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 7.5h-9a3 3 0 00-3 3v3a3 3 0 003 3h9a3 3 0 003-3v-3a3 3 0 00-3-3z" /></svg>;
const CircleStackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" /></svg>;
const BanknotesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663l.005-.004c.285.432.62.826.994 1.178M15 15.128a4.125 4.125 0 10-8.25 0 4.125 4.125 0 008.25 0z" /></svg>;
const UserPlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766z" /></svg>;
const ChartBarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-6.75zM12 3c.621 0 1.125.504 1.125 1.125v16.75c0 .621-.504 1.125-1.125 1.125h-2.25c-.621 0-1.125-.504-1.125-1.125V4.125C8.625 3.504 9.129 3 9.75 3h2.25zM19.875 9c.621 0 1.125.504 1.125 1.125v10.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V10.125c0-.621.504-1.125 1.125-1.125h2.25z" /></svg>;

export default Sidebar;
