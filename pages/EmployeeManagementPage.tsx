import React, { useState } from 'react';
import { EMPLOYEES } from '../constants';
import { Employee, EmployeeStatus } from '../types';

const getStatusColor = (status: EmployeeStatus) => {
    switch (status) {
        case 'Active': return 'bg-green-100 text-green-800';
        case 'On Leave': return 'bg-yellow-100 text-yellow-800';
        case 'Terminated': return 'bg-red-100 text-red-800';
    }
};

const EmployeeManagementPage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>(EMPLOYEES);
    
    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
                    <p className="text-gray-600 mt-1">View and manage your company's employees.</p>
                </div>
                 <button className="bg-amber-500 text-slate-900 font-bold py-2 px-4 rounded-md hover:bg-amber-600 transition-colors flex items-center shadow-sm">
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>
                    Add Employee
                </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-x-auto border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {employees.map(employee => (
                            <tr key={employee.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img className="h-10 w-10 rounded-full" src={employee.avatarUrl} alt="" />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{employee.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{employee.email}</div>
                                    <div className="text-sm text-gray-500">{employee.phone}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                                        {employee.status}
                                    </span>
                                </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                                    <button className="text-amber-600 hover:text-amber-800">Edit</button>
                                    <button className="text-red-600 hover:text-red-800">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeManagementPage;
