import React, { useState } from 'react';
import { Role } from '../types';
import { ALL_ROLES } from '../constants';

interface LoginPageProps {
  onLogin: (role: Role) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<Role>(Role.Admin);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div className="text-center mb-8">
            <div className="bg-amber-500 p-3 rounded-md flex items-center justify-center w-16 h-16 mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">ConstructAI</h1>
            <p className="text-gray-500">Your AI-Powered Construction Hub</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email or Phone</label>
            <input type="text" id="email" name="email" defaultValue="demo@constructai.com" className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" name="password" defaultValue="password" className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500" />
          </div>

           <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Select Your Role</label>
            <select id="role" name="role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value as Role)} className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500">
              {ALL_ROLES.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <a href="#" className="text-sm text-amber-600 hover:text-amber-700">Forgot Password?</a>
          </div>

          <div>
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-slate-900 bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-amber-500 transition-colors">
              Login as {selectedRole}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;