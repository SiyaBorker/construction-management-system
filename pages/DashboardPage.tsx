// Fix: Create DashboardPage.tsx component file.
import React from 'react';
import { Project, Employee } from '../types';
import StatCard from '../components/StatCard';
import ProjectCard from '../components/ProjectCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardPageProps {
    projects: Project[];
    employees: Employee[];
}

const recentActivity = [
    { text: 'Alice Johnson updated "Downtown Tower" progress to 75%.', time: '2h ago' },
    { text: 'New material "Steel Rebar" added to inventory.', time: '5h ago' },
    { text: 'Invoice #INV-1003 for "City Council" is now overdue.', time: '1d ago' },
    { text: 'Bob Williams was assigned to "Bridge Renovation".', time: '2d ago' },
];

const financialOverviewData = [
    { name: 'Jan', revenue: 40, expenses: 24 },
    { name: 'Feb', revenue: 30, expenses: 14 },
    { name: 'Mar', revenue: 20, expenses: 98 },
    { name: 'Apr', revenue: 28, expenses: 39 },
    { name: 'May', revenue: 19, expenses: 48 },
    { name: 'Jun', revenue: 24, expenses: 38 },
];

const DashboardPage: React.FC<DashboardPageProps> = ({ projects, employees }) => {
    const activeProjects = projects.filter(p => p.status === 'In Progress');
    const onTrackProjects = activeProjects.filter(p => p.progress > 60).length;
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(e => e.status === 'Active').length;

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Active Projects" value={activeProjects.length.toString()} icon={<FolderIcon />} trend={`${onTrackProjects} on track`} trendDirection="up" />
                <StatCard title="Total Employees" value={totalEmployees.toString()} icon={<UsersIcon />} trend={`${activeEmployees} active`} />
                <StatCard title="Budget Overview" value="$1.2M / $5M" icon={<CurrencyDollarIcon />} trend="Under budget" trendDirection="up" />
                <StatCard title="Safety Incidents" value="0" icon={<ShieldCheckIcon />} trend="45 days clear" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Financial Overview (in thousands)</h2>
                         <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={financialOverviewData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                                <Area type="monotone" dataKey="expenses" stackId="1" stroke="#ffc658" fill="#ffc658" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Ongoing Projects</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {activeProjects.slice(0, 2).map(project => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                    <ul className="space-y-4">
                        {recentActivity.map((item, index) => (
                            <li key={index} className="flex items-start space-x-3">
                                <div className="bg-gray-100 p-2 rounded-full mt-1">
                                    <ClockIcon />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-800">{item.text}</p>
                                    <p className="text-xs text-gray-500">{item.time}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

// Icons
const FolderIcon = () => <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>;
const UsersIcon = () => <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663l.005-.004c.285.432.62.826.994 1.178M15 15.128a4.125 4.125 0 10-8.25 0 4.125 4.125 0 008.25 0z" /></svg>;
const CurrencyDollarIcon = () => <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ShieldCheckIcon = () => <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" /></svg>;
const ClockIcon = () => <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

export default DashboardPage;
