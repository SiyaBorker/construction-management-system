import React, { useState, useMemo } from 'react';
import StatCard from '../components/StatCard';
import { Project, Employee, StockItem } from '../types';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ReportsPageProps {
    projects: Project[];
    employees: Employee[];
    inventory: StockItem[];
}

type ReportTab = 'projects' | 'financials' | 'team' | 'materials';

const ReportsPage: React.FC<ReportsPageProps> = ({ projects, employees, inventory }) => {
    const [activeTab, setActiveTab] = useState<ReportTab>('projects');

    const stats = useMemo(() => {
        const activeProjects = projects.filter(p => p.status === 'In Progress').length;
        const completionRate = (projects.filter(p => p.status === 'Completed').length / projects.length) * 100;
        const activeEmployees = employees.filter(e => e.status === 'Active').length;
        const reorderAlerts = inventory.filter(i => i.quantityInStock <= i.reorderPoint).length;
        
        return {
            projects: { count: activeProjects, rate: `${completionRate.toFixed(0)}%` },
            budget: { spent: "$480K", variance: "-5%" }, // Mock data
            team: { count: activeEmployees, attendance: "98.5%" }, // Mock data
            materials: { count: inventory.length, alerts: reorderAlerts },
            safety: { incidents: 0, daysClear: 45 }, // Mock data
        }
    }, [projects, employees, inventory]);
    
    // Data for charts
    const projectStatusData = useMemo(() => {
        const statuses = projects.reduce((acc, p) => {
            acc[p.status] = (acc[p.status] || 0) + 1;
            return acc;
        }, {} as Record<Project['status'], number>);
        return Object.entries(statuses).map(([name, value]) => ({ name, projects: value }));
    }, [projects]);

    const financialData = [
        { name: 'Jan', revenue: 4000, expenses: 2400 },
        { name: 'Feb', revenue: 3000, expenses: 1398 },
        { name: 'Mar', revenue: 2000, expenses: 9800 },
        { name: 'Apr', revenue: 2780, expenses: 3908 },
        { name: 'May', revenue: 1890, expenses: 4800 },
        { name: 'Jun', revenue: 2390, expenses: 3800 },
    ];
    
    const teamRoleData = useMemo(() => {
        const roles = employees.reduce((acc, e) => {
            acc[e.role] = (acc[e.role] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return Object.entries(roles).map(([name, value]) => ({ name, count: value }));
    }, [employees]);

    const materialStockData = useMemo(() => {
        return inventory.slice(0, 5).map(item => ({
            name: item.name.substring(0, 15),
            'In Stock': item.quantityInStock,
            'Reorder Point': item.reorderPoint,
        }));
    }, [inventory]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const renderContent = () => {
        switch (activeTab) {
            case 'projects':
                return (
                    <div>
                        <h3 className="text-lg font-bold mb-4">Project Progress Overview</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={projectStatusData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false}/>
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="projects" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                );
            case 'financials':
                 return (
                    <div>
                        <h3 className="text-lg font-bold mb-4">Monthly Expense Trends</h3>
                         <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={financialData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                                <Line type="monotone" dataKey="expenses" stroke="#ffc658" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                );
            case 'team':
                 return (
                    <div>
                        <h3 className="text-lg font-bold mb-4">Team Composition by Role</h3>
                         <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie data={teamRoleData} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                    {teamRoleData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                );
            case 'materials':
                return (
                    <div>
                        <h3 className="text-lg font-bold mb-4">Inventory Levels</h3>
                         <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={materialStockData} layout="vertical" margin={{ left: 100 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number"/>
                                <YAxis type="category" dataKey="name" width={100}/>
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="In Stock" fill="#82ca9d" />
                                <Bar dataKey="Reorder Point" fill="#ffc658" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                );
        }
    };


    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Reports & Analytics</h1>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                <StatCard title="Active Projects" value={stats.projects.count.toString()} icon={<div className="text-sm">{stats.projects.rate} done</div>} />
                <StatCard title="Monthly Spend" value={stats.budget.spent} icon={<div className="text-sm text-red-500">{stats.budget.variance}</div>} />
                <StatCard title="Active Team" value={stats.team.count.toString()} icon={<div className="text-sm">{stats.team.attendance}</div>} />
                <StatCard title="Material Alerts" value={stats.materials.alerts.toString()} icon={<div className="text-sm">{stats.materials.count} total</div>} />
                <StatCard title="Safety" value={`${stats.safety.daysClear} days`} icon={<div className="text-sm">{stats.safety.incidents} incidents</div>} />
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <div className="flex-grow bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <div className="flex border-b border-gray-200 mb-4">
                        {(['projects', 'financials', 'team', 'materials'] as ReportTab[]).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`capitalize py-2 px-4 text-sm font-medium transition-colors ${activeTab === tab ? 'border-b-2 border-amber-500 text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    {renderContent()}
                </div>

                {/* Right Sidebar */}
                <aside className="w-full lg:w-72 flex-shrink-0">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-6">
                        <h3 className="text-lg font-bold text-gray-800">Report Controls</h3>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Date Range</label>
                            <select className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500">
                                <option>Last 30 Days</option>
                                <option>Last Quarter</option>
                                <option>Last Year</option>
                            </select>
                        </div>
                         <div>
                            <label className="text-sm font-medium text-gray-700">Report Type</label>
                            <select className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500">
                                <option>Summary</option>
                                <option>Detailed</option>
                                <option>Comparison</option>
                            </select>
                        </div>
                        <div>
                           <h4 className="text-sm font-medium text-gray-700 mb-2">Export</h4>
                           <div className="flex space-x-2">
                                <button onClick={() => alert('Exporting to PDF...')} className="text-xs flex-1 bg-gray-100 hover:bg-gray-200 p-2 rounded-md">PDF</button>
                                <button onClick={() => alert('Exporting to Excel...')} className="text-xs flex-1 bg-gray-100 hover:bg-gray-200 p-2 rounded-md">Excel</button>
                                <button onClick={() => alert('Exporting to CSV...')} className="text-xs flex-1 bg-gray-100 hover:bg-gray-200 p-2 rounded-md">CSV</button>
                           </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ReportsPage;
