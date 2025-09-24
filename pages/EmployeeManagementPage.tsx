import React, { useState, useMemo } from 'react';
import { Employee } from '../types';

interface EmployeeManagementPageProps {
    employees: Employee[];
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}

const AddEmployeeModal: React.FC<{ onClose: () => void; onAdd: (employee: Employee) => void; }> = ({ onClose, onAdd }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const newEmployee: Employee = {
            id: `e${Date.now()}`,
            name,
            email: formData.get('email') as string,
            role: formData.get('role') as string,
            phone: '555-0199', // Placeholder
            hireDate: new Date().toISOString().split('T')[0],
            avatar: `https://i.pravatar.cc/150?u=${name}`,
            status: 'Active',
        };
        onAdd(newEmployee);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Employee</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="name" type="text" placeholder="Full Name" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
                    <input name="email" type="email" placeholder="Email Address" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
                    <input name="role" type="text" placeholder="Job Role (e.g., Lead Carpenter)" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-semibold transition">Cancel</button>
                        <button type="submit" className="py-2 px-4 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-md font-bold transition">Add Employee</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const EmployeeManagementPage: React.FC<EmployeeManagementPageProps> = ({ employees, setEmployees }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const filteredEmployees = useMemo(() => {
        return employees.filter(emp =>
            emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [employees, searchTerm]);
    
    const handleAddEmployee = (employee: Employee) => {
        setEmployees(prev => [employee, ...prev]);
    };

    const getStatusColor = (status: Employee['status']) => {
        switch(status) {
            case 'Active': return 'bg-green-100 text-green-800';
            case 'On Leave': return 'bg-yellow-100 text-yellow-800';
            case 'Terminated': return 'bg-red-100 text-red-800';
        }
    };

    return (
        <div className="container mx-auto">
            {isModalOpen && <AddEmployeeModal onClose={() => setIsModalOpen(false)} onAdd={handleAddEmployee} />}

            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
                    <p className="text-gray-600 mt-1">Manage profiles, attendance, and performance.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-amber-500 text-slate-900 font-bold py-2 px-6 rounded-md hover:bg-amber-600 transition-colors flex items-center shadow-sm">
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    Add Employee
                </button>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by name, role, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md bg-white border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-sm"
                />
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-x-auto border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hire Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredEmployees.map(emp => (
                            <tr key={emp.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img className="h-10 w-10 rounded-full object-cover" src={emp.avatar} alt={emp.name} />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{emp.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{emp.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{emp.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(emp.status)}`}>
                                        {emp.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{emp.hireDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default EmployeeManagementPage;