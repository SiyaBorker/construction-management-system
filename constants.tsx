import { Project, Employee, StockItem, Invoice, Applicant, Notification, Job } from './types';

export const PROJECTS: Project[] = [
  { id: 'p1', name: 'Downtown Tower', client: 'SkyHigh Inc.', progress: 75, status: 'In Progress', deadline: '2024-12-31', budget: 5000000, spent: 3200000 },
  { id: 'p2', name: 'City Bridge Renovation', client: 'City Council', progress: 40, status: 'In Progress', deadline: '2025-06-30', budget: 2500000, spent: 1100000 },
  { id: 'p3', name: 'Suburban Housing Complex', client: 'HomeBuilders Ltd.', progress: 100, status: 'Completed', deadline: '2023-11-20', budget: 8000000, spent: 7800000 },
  { id: 'p4', name: 'Coastal Wind Farm', client: 'GreenEnergy Co.', progress: 15, status: 'Planning', deadline: '2026-01-15', budget: 12000000, spent: 500000 },
  { id: 'p5', name: 'Metro Station Upgrade', client: 'Urban Transit Authority', progress: 60, status: 'On Hold', deadline: '2025-09-01', budget: 3200000, spent: 1800000 },
];

export const EMPLOYEES: Employee[] = [
  { id: 'e1', name: 'Alice Johnson', role: 'Project Manager', email: 'alice.j@example.com', phone: '555-0101', status: 'Active', avatarUrl: 'https://picsum.photos/id/1027/200/200' },
  { id: 'e2', name: 'Bob Williams', role: 'Lead Engineer', email: 'bob.w@example.com', phone: '555-0102', status: 'Active', avatarUrl: 'https://picsum.photos/id/1005/200/200' },
  { id: 'e3', name: 'Charlie Brown', role: 'Architect', email: 'charlie.b@example.com', phone: '555-0103', status: 'On Leave', avatarUrl: 'https://picsum.photos/id/1011/200/200' },
  { id: 'e4', name: 'Diana Prince', role: 'Safety Officer', email: 'diana.p@example.com', phone: '555-0104', status: 'Active', avatarUrl: 'https://picsum.photos/id/1012/200/200' },
  { id: 'e5', name: 'Ethan Hunt', role: 'Foreman', email: 'ethan.h@example.com', phone: '555-0105', status: 'Active', avatarUrl: 'https://picsum.photos/id/1013/200/200' },
];

export const INVENTORY: StockItem[] = [
  { id: 's1', name: 'Steel Rebar (10mm)', quantityInStock: 5000, unit: 'meter', reorderPoint: 2000, supplier: 'SteelWorks', rating: 4.5, price: 1.5, averageDailyUsage: 150 },
  { id: 's2', name: 'Portland Cement (Type I)', quantityInStock: 800, unit: 'bag', reorderPoint: 500, supplier: 'CemCo', rating: 4.8, price: 12, averageDailyUsage: 50 },
  { id: 's3', name: 'Plywood Sheets (4x8)', quantityInStock: 300, unit: 'sheet', reorderPoint: 250, supplier: 'Woodland Inc.', rating: 4.2, price: 25, averageDailyUsage: 20 },
  { id: 's4', name: 'HVAC Units (5-ton)', quantityInStock: 15, unit: 'unit', reorderPoint: 10, supplier: 'CoolAir Systems', rating: 4.9, price: 3500, averageDailyUsage: 1 },
  { id: 's5', name: 'Copper Wiring (12-gauge)', quantityInStock: 1200, unit: 'meter', reorderPoint: 1500, supplier: 'ElecSupply', rating: 4.6, price: 0.8, averageDailyUsage: 80 },
];

export const INVOICES: Invoice[] = [
  { id: 'INV-1001', clientName: 'SkyHigh Inc.', projectName: 'Downtown Tower', amount: 250000, dueDate: '2024-07-30', status: 'Paid' },
  { id: 'INV-1002', clientName: 'City Council', projectName: 'City Bridge Renovation', amount: 120000, dueDate: '2024-08-15', status: 'Pending' },
  { id: 'INV-1003', clientName: 'HomeBuilders Ltd.', projectName: 'Suburban Housing', amount: 500000, dueDate: '2023-10-01', status: 'Overdue' },
  { id: 'INV-1004', clientName: 'SkyHigh Inc.', projectName: 'Downtown Tower', amount: 300000, dueDate: '2024-08-25', status: 'Pending' },
];

export const JOBS: Job[] = [
  { id: 'job1', title: 'Senior Civil Engineer', department: 'Engineering', location: 'New York, NY', type: 'Full-time', openings: 2 },
  { id: 'job2', title: 'Project Coordinator', department: 'Management', location: 'Remote', type: 'Full-time', openings: 1 },
  { id: 'job3', title: 'Electrician', department: 'Trades', location: 'San Francisco, CA', type: 'Contract', openings: 5 },
  { id: 'job4', title: 'Safety Inspector', department: 'Compliance', location: 'Austin, TX', type: 'Full-time', openings: 1 },
];

export const APPLICANTS: Applicant[] = [
    { id: 'a1', name: 'Frank Miller', role: 'Civil Engineer', jobId: 'job1', stage: 'Interview', submissionDate: '2024-06-20', avatarUrl: 'https://picsum.photos/id/201/200/200' },
    { id: 'a2', name: 'Grace Hopper', role: 'Project Coordinator', jobId: 'job2', stage: 'Offer', submissionDate: '2024-06-18', avatarUrl: 'https://picsum.photos/id/202/200/200' },
    { id: 'a3', name: 'Henry Ford', role: 'Electrician', jobId: 'job3', stage: 'Screening', submissionDate: '2024-07-01', avatarUrl: 'https://picsum.photos/id/203/200/200' },
    { id: 'a4', name: 'Ivy Green', role: 'Safety Inspector', jobId: 'job4', stage: 'Hired', submissionDate: '2024-05-30', avatarUrl: 'https://picsum.photos/id/204/200/200' },
    { id: 'a5', name: 'Jack Ryan', role: 'Civil Engineer', jobId: 'job1', stage: 'Rejected', submissionDate: '2024-06-22', avatarUrl: 'https://picsum.photos/id/206/200/200' },
    { id: 'a6', name: 'Nikola Tesla', role: 'Electrician', jobId: 'job3', stage: 'Interview', submissionDate: '2024-07-02', avatarUrl: 'https://picsum.photos/id/207/200/200' },
];


export const NOTIFICATIONS: Notification[] = [
  { id: 'n1', message: 'Project "Downtown Tower" is 75% complete.', timestamp: '2 hours ago', read: false },
  { id: 'n2', message: 'New invoice #INV-1004 created for SkyHigh Inc.', timestamp: '8 hours ago', read: false },
  { id: 'n3', message: 'Material "Portland Cement" is running low.', timestamp: '1 day ago', read: false },
  { id: 'n4', message: 'Applicant Grace Hopper has accepted the offer.', timestamp: '2 days ago', read: true },
];