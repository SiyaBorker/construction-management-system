import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import AICostEstimatorPage from './pages/AICostEstimatorPage';
import StockManagementPage from './pages/MarketplacePage';
import FinancialsPage from './pages/FinancialsPage';
import EmployeeManagementPage from './pages/EmployeeManagementPage';
import HiringPage from './pages/HiringPage';
import ReportsPage from './pages/ReportsPage';
import LoginPage from './pages/LoginPage';
import { Page, Project, Employee, StockItem, Invoice, Notification } from './types';
import { PROJECTS, EMPLOYEES, INVENTORY, INVOICES, NOTIFICATIONS } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('Dashboard');
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [employees, setEmployees] = useState<Employee[]>(EMPLOYEES);
  const [inventory, setInventory] = useState<StockItem[]>(INVENTORY);
  const [invoices, setInvoices] = useState<Invoice[]>(INVOICES);
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);

  const renderPage = () => {
    switch (currentPage) {
      case 'Dashboard':
        return <DashboardPage projects={projects} employees={employees} />;
      case 'Projects':
        return <ProjectsPage projects={projects} setProjects={setProjects} />;
      case 'AI Cost Estimator':
        return <AICostEstimatorPage />;
      case 'Stock Management':
        return <StockManagementPage inventory={inventory} setInventory={setInventory} />;
      case 'Financials':
        return <FinancialsPage invoices={invoices} setInvoices={setInvoices} />;
      case 'Team':
        return <EmployeeManagementPage />;
      case 'Hiring':
          return <HiringPage />;
      case 'Reports':
          return <ReportsPage projects={projects} employees={employees} inventory={inventory} />;
      default:
        return <DashboardPage projects={projects} employees={employees} />;
    }
  };

  if (!isLoggedIn) {
      return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col ml-64">
        <Header 
          pageTitle={currentPage} 
          notifications={notifications}
          setNotifications={setNotifications}
        />
        <main className="flex-1 p-8 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default App;