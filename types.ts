export type ProjectStatus = 'In Progress' | 'Completed' | 'On Hold' | 'Planning';

export interface Project {
  id: string;
  name: string;
  client: string;
  progress: number;
  status: ProjectStatus;
  deadline: string;
  budget: number;
  spent: number;
}

export type EmployeeStatus = 'Active' | 'On Leave' | 'Terminated';

export interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: EmployeeStatus;
  avatarUrl: string;
}

export interface CostEstimateRequest {
    projectType: string;
    area: number;
    floors: number;
    quality: string;
    materials: string;
    features: string;
}

export interface CostBreakdownItem {
    category: string;
    cost: number;
    percentage: number;
    details: string;
}

export interface CostEstimate {
    estimatedTotalCost: {
        min: number;
        max: number;
    };
    contingency: {
        percentage: number;
        amount: number;
    };
    timelineEstimate: string;
    summary: string;
    costBreakdown: CostBreakdownItem[];
}

export interface StockItem {
  id: string;
  name: string;
  quantityInStock: number;
  unit: string;
  reorderPoint: number;
  supplier: string;
  rating: number;
  price: number;
  averageDailyUsage: number;
}

export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue';

export interface Invoice {
  id: string;
  clientName: string;
  projectName: string;
  amount: number;
  dueDate: string;
  status: InvoiceStatus;
}

export type ApplicantStatus = 'Screening' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';

export interface Applicant {
    id: string;
    name: string;
    role: string;
    stage: ApplicantStatus;
    submissionDate: string;
    avatarUrl: string;
}

export type Page = 'Dashboard' | 'Projects' | 'AI Cost Estimator' | 'Stock Management' | 'Financials' | 'Team' | 'Hiring' | 'Reports';
