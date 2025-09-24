import React, { useState, useCallback } from 'react';
import { User, Page, Role, Project, StockItem, Job, Employee } from './types';
import { MOCK_PROJECTS, MOCK_INVENTORY, MOCK_JOBS, MOCK_EMPLOYEES } from './constants';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import StockManagementPage from './pages/MarketplacePage';
import HiringPage from './pages/HiringPage';
import AICostEstimatorPage from './pages/AICostEstimatorPage';
import EmployeeManagementPage from './pages/EmployeeManagementPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activePage, setActivePage] = useState<Page>(Page.Dashboard);

  // Centralized state for all major data types
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [inventory, setInventory] = useState<StockItem[]>(MOCK_INVENTORY);
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);


  const handleLogin = useCallback((role: Role) => {
    setUser({
      name: `Demo ${role}`,
      role: role,
      avatar: `https://i.pravatar.cc/150?u=${role}`
    });
    setActivePage(Page.Dashboard);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case Page.Dashboard:
        return <DashboardPage user={user!} setProjects={setProjects} setEmployees={setEmployees} setJobs={setJobs} setActivePage={setActivePage} />;
      case Page.Projects:
        return <ProjectsPage projects={projects} setProjects={setProjects} />;
      case Page.StockManagement:
        return <StockManagementPage inventory={inventory} setInventory={setInventory} />;
      case Page.Hiring:
        return <HiringPage jobs={jobs} setJobs={setJobs} userRole={user!.role} />;
      case Page.EmployeeManagement:
          return <EmployeeManagementPage employees={employees} setEmployees={setEmployees} />;
      case Page.AICostEstimator:
        return <AICostEstimatorPage />;
      default:
        return <DashboardPage user={user!} setProjects={setProjects} setEmployees={setEmployees} setJobs={setJobs} setActivePage={setActivePage} />;
    }
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 md:p-8">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;