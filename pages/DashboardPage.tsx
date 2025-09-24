import React, { useState } from 'react';
import { User, Role, Page, Project, Employee, Job } from '../types';
import StatCard from '../components/StatCard';

// Reusable Modal Wrapper
const Modal: React.FC<{ children: React.ReactNode; onClose: () => void; title: string }> = ({ children, onClose, title }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in-fast" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg border border-gray-200" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            {children}
        </div>
    </div>
);

// Specific Modal Forms
const AddProjectForm: React.FC<{ onAddProject: (p: Project) => void; onClose: () => void }> = ({ onAddProject, onClose }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        onAddProject({
            id: `p${Date.now()}`,
            name: formData.get('name') as string, client: formData.get('client') as string,
            progress: 0, status: 'Planning', deadline: formData.get('deadline') as string,
            budget: Number(formData.get('budget')), spent: 0,
        });
        onClose();
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" type="text" placeholder="Project Name" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
            <input name="client" type="text" placeholder="Client Name" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
            <input name="budget" type="number" placeholder="Total Budget" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
            <input name="deadline" type="date" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
            <div className="flex justify-end space-x-4 pt-2"><button type="submit" className="py-2 px-6 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-md font-bold">Add</button></div>
        </form>
    );
};

const AddEmployeeForm: React.FC<{ onAddEmployee: (e: Employee) => void; onClose: () => void }> = ({ onAddEmployee, onClose }) => {
     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        onAddEmployee({
            id: `e${Date.now()}`, name, role: formData.get('role') as string, email: formData.get('email') as string,
            phone: '555-0199', hireDate: new Date().toISOString().split('T')[0],
            avatar: `https://i.pravatar.cc/150?u=${name}`, status: 'Active',
        });
        onClose();
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" type="text" placeholder="Full Name" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
            <input name="email" type="email" placeholder="Email Address" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
            <input name="role" type="text" placeholder="Job Role (e.g., Lead Carpenter)" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
            <div className="flex justify-end space-x-4 pt-2"><button type="submit" className="py-2 px-6 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-md font-bold">Add</button></div>
        </form>
    );
};

const PostJobForm: React.FC<{ onAddJob: (j: Job) => void; onClose: () => void }> = ({ onAddJob, onClose }) => {
     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        onAddJob({
            id: `j${Date.now()}`, title: formData.get('title') as string, location: formData.get('location') as string,
            type: 'Full-time', experience: formData.get('experience') as string,
            description: 'Newly posted job description.', responsibilities: ['Responsibility 1', 'Responsibility 2']
        });
        onClose();
    };
     return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input name="title" type="text" placeholder="Job Title" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
            <input name="location" type="text" placeholder="Location" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
            <input name="experience" type="text" placeholder="Experience Required" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
            <div className="flex justify-end space-x-4 pt-2"><button type="submit" className="py-2 px-6 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-md font-bold">Post</button></div>
        </form>
    );
}

interface DashboardPageProps {
  user: User;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
  setActivePage: (page: Page) => void;
}

const AdminDashboard: React.FC<Omit<DashboardPageProps, 'user'>> = ({ setProjects, setEmployees, setJobs, setActivePage }) => {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    return (
        <div>
            {activeModal === 'addProject' && <Modal title="Add New Project" onClose={() => setActiveModal(null)}><AddProjectForm onAddProject={(p) => setProjects(prev => [p, ...prev])} onClose={() => setActiveModal(null)} /></Modal>}
            {activeModal === 'addEmployee' && <Modal title="Add New Employee" onClose={() => setActiveModal(null)}><AddEmployeeForm onAddEmployee={(e) => setEmployees(prev => [e, ...prev])} onClose={() => setActiveModal(null)} /></Modal>}
            {activeModal === 'postJob' && <Modal title="Post a Job Opening" onClose={() => setActiveModal(null)}><PostJobForm onAddJob={(j) => setJobs(prev => [j, ...prev])} onClose={() => setActiveModal(null)} /></Modal>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Ongoing Projects" value="12" icon={<ProjectsIcon />} trend="+2 this month" trendDirection="up" />
                <StatCard title="Stock Alerts" value="3" icon={<StockAlertIcon />} trend="Re-order cement" trendDirection="down" />
                <StatCard title="Active Employees" value="142" icon={<EmployeesIcon />} trend="+5 new hires" trendDirection="up"/>
                <StatCard title="Budget vs Actual" value="85%" icon={<BudgetIcon />} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <QuickActionButton label="Add New Project" onClick={() => setActiveModal('addProject')} />
                        <QuickActionButton label="Add New Employee" onClick={() => setActiveModal('addEmployee')} />
                        <QuickActionButton label="Create Purchase Order" onClick={() => setActivePage(Page.StockManagement)} />
                        <QuickActionButton label="Post a Job Opening" onClick={() => setActiveModal('postJob')} />
                        <QuickActionButton label="Request Cost Estimate" onClick={() => setActivePage(Page.AICostEstimator)} />
                        <QuickActionButton label="Generate Report" onClick={() => alert('Report generation module would open here.')} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Notifications</h2>
                    <ul className="space-y-4">
                        <NotificationItem text="Project 'Downtown High-Rise' is now 75% complete." time="2m ago" />
                        <NotificationItem text="Supplier 'Global Cement' delivered materials to Site B." time="1h ago" />
                        <NotificationItem text="Worker 'John Doe' checked in at 'Oakwood Residence'." time="3h ago" />
                        <NotificationItem text="Safety compliance check due for 'Bridge Repair' project." time="1d ago" />
                    </ul>
                </div>
            </div>
        </div>
    );
};

const EmployeeDashboard: React.FC = () => (
    <div>
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">My Tasks Today</h2>
                <ul className="space-y-3">
                    <TaskItem text="Install electrical wiring on 2nd floor" priority="High" project="Oakwood Residence" />
                    <TaskItem text="Attend daily safety briefing" priority="Medium" project="Oakwood Residence" />
                    <TaskItem text="Unload cement delivery" priority="Low" project="Oakwood Residence" />
                </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Daily Actions</h2>
                <div className="space-y-4">
                     <button className="w-full text-left bg-green-50 hover:bg-green-100 text-green-800 p-4 rounded-md font-semibold transition-colors border border-green-200">
                        Check-in for Today
                    </button>
                    <button className="w-full text-left bg-gray-100 hover:bg-gray-200 text-gray-800 p-4 rounded-md font-semibold transition-colors border border-gray-200">
                        Submit Timesheet
                    </button>
                    <button className="w-full text-left bg-gray-100 hover:bg-gray-200 text-gray-800 p-4 rounded-md font-semibold transition-colors border border-gray-200">
                        View Safety Checklist
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const DashboardPage: React.FC<DashboardPageProps> = ({ user, ...props }) => {
  return (
    <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
        <p className="text-gray-600 mb-8">Here's your overview for today. Your role: <span className="font-semibold text-amber-600">{user.role}</span></p>
        
        {(user.role === Role.Admin || user.role === Role.Supervisor) && <AdminDashboard {...props} />}
        {user.role === Role.Employee && <EmployeeDashboard />}
        {(user.role === Role.Accountant || user.role === Role.Client) && <div className="text-center text-gray-500 p-8 bg-white rounded-lg border border-gray-200">Dashboard for {user.role} role is under construction.</div>}
    </div>
  );
};

// Helper Components for Dashboard
const ProjectsIcon: React.FC = () => <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>;
const StockAlertIcon: React.FC = () => <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>;
const EmployeesIcon: React.FC = () => <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;
const BudgetIcon: React.FC = () => <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

const QuickActionButton: React.FC<{label: string; onClick?: () => void}> = ({ label, onClick }) => (
    <button onClick={onClick} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-2 rounded-lg text-center text-sm transition-colors border border-gray-200">
        {label}
    </button>
);

const NotificationItem: React.FC<{text: string, time: string}> = ({ text, time }) => (
    <li className="flex justify-between items-start border-b border-gray-200 pb-3 last:border-b-0">
        <p className="text-sm text-gray-700 pr-4">{text}</p>
        <span className="text-xs text-gray-500 flex-shrink-0">{time}</span>
    </li>
);

const TaskItem: React.FC<{text: string, priority: string, project: string}> = ({text, priority, project}) => {
    const priorityColor = priority === 'High' ? 'text-red-600' : priority === 'Medium' ? 'text-yellow-600' : 'text-green-600';
    return (
        <li className="bg-gray-50 p-3 rounded-md flex justify-between items-center border border-gray-200">
            <div>
                <p className="text-gray-800">{text}</p>
                <p className="text-xs text-gray-500">{project}</p>
            </div>
            <span className={`font-bold text-sm ${priorityColor}`}>{priority}</span>
        </li>
    );
};

export default DashboardPage;