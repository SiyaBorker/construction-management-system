export enum Role {
  Admin = 'Admin',
  Supervisor = 'Supervisor',
  Employee = 'Employee',
  Accountant = 'Accountant',
  Client = 'Client'
}

export interface User {
  name: string;
  role: Role;
  avatar: string;
}

export enum Page {
  Dashboard = 'Dashboard',
  Projects = 'Projects',
  StockManagement = 'Stock & Material Management',
  Hiring = 'Hiring',
  EmployeeManagement = 'Employee Management',
  AICostEstimator = 'AI Cost Estimator'
}

export interface Project {
  id: string;
  name: string;
  client: string;
  progress: number;
  status: 'In Progress' | 'Completed' | 'On Hold' | 'Planning';
  deadline: string;
  budget: number;
  spent: number;
}

export interface StockItem {
    id: string;
    name: string;
    supplier: string;
    rating: number;
    price: number; // Cost per unit
    unit: string;
    imageUrl: string;
    quantityInStock: number;
    location: string;
    reorderPoint: number;
    averageDailyUsage: number;
}

export interface Job {
    id: string;
    title: string;
    location: string;
    type: 'Full-time' | 'Contract';
    experience: string;
    description: string;
    responsibilities: string[];
}

export interface Employee {
    id: string;
    name: string;
    role: string;
    email: string;
    phone: string;
    hireDate: string;
    avatar: string;
    status: 'Active' | 'On Leave' | 'Terminated';
}


export interface Applicant {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: 'New' | 'Interviewing' | 'Offer' | 'Rejected';
    appliedDate: string;
}


export interface CostEstimate {
  estimatedTotalCost: {
    min: number;
    max: number;
  };
  costBreakdown: {
    category: string;
    cost: number;
    percentage: number;
    details: string;
  }[];
  timelineEstimate: string;
  contingency: {
    percentage: number;
    amount: number;
  };
  summary: string;
}