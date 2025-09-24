import React from 'react';
import { Page, Project, StockItem, Job, Role, Employee, Applicant } from './types';

// Icons are defined here as functional components for easy reuse.
const DashboardIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
  </svg>
);

const ProjectsIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
  </svg>
);

const StockIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
);

const HiringIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.598m-1.5-6.375a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EmployeeIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);


const EstimatorIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm3-6h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zM12 21a9 9 0 110-18 9 9 0 010 18z" />
  </svg>
);

export const NAV_ITEMS = [
  { id: Page.Dashboard, icon: DashboardIcon, label: 'Dashboard' },
  { id: Page.Projects, icon: ProjectsIcon, label: 'Projects' },
  { id: Page.StockManagement, icon: StockIcon, label: 'Stock Management' },
  { id: Page.Hiring, icon: HiringIcon, label: 'Hiring' },
  { id: Page.EmployeeManagement, icon: EmployeeIcon, label: 'Employees'},
  { id: Page.AICostEstimator, icon: EstimatorIcon, label: 'AI Cost Estimator' },
];

export const MOCK_PROJECTS: Project[] = [
    { id: 'p1', name: 'Downtown High-Rise', client: 'Skyline Corp', progress: 75, status: 'In Progress', deadline: '2025-12-20', budget: 50000000, spent: 38500000 },
    { id: 'p2', name: 'Oakwood Residence', client: 'John & Jane Doe', progress: 100, status: 'Completed', deadline: '2024-05-15', budget: 1200000, spent: 1150000 },
    { id: 'p3', name: 'Bridge Repair Project', client: 'City Municipality', progress: 40, status: 'In Progress', deadline: '2026-08-01', budget: 15000000, spent: 6000000 },
    { id: 'p4', name: 'Suburban Mall Extension', client: 'Retail Ventures', progress: 15, status: 'Planning', deadline: '2027-01-30', budget: 25000000, spent: 500000 },
    { id: 'p5', name: 'Industrial Warehouse', client: 'Logistics Inc.', progress: 95, status: 'On Hold', deadline: '2024-09-01', budget: 7500000, spent: 7000000 },
];

export const MOCK_INVENTORY: StockItem[] = [
    { id: 'm1', name: 'Portland Cement (Type I)', supplier: 'Global Cement Co.', rating: 4.8, price: 12.50, unit: 'bag', imageUrl: 'https://picsum.photos/seed/cement/400/300', quantityInStock: 2500, location: 'Warehouse A, Bay 3', reorderPoint: 1000, averageDailyUsage: 50 },
    { id: 'm2', name: 'Steel Rebar (#5)', supplier: 'SteelStrong', rating: 4.9, price: 1200, unit: 'ton', imageUrl: 'https://picsum.photos/seed/rebar/400/300', quantityInStock: 50, location: 'Yard 2', reorderPoint: 20, averageDailyUsage: 2 },
    { id: 'm3', name: 'Plywood Sheathing (1/2")', supplier: 'Woodland Products', rating: 4.5, price: 35.00, unit: 'sheet', imageUrl: 'https://picsum.photos/seed/plywood/400/300', quantityInStock: 800, location: 'Warehouse B, Rack 12', reorderPoint: 500, averageDailyUsage: 25 },
    { id: 'm4', name: 'Drywall (4x8 ft)', supplier: 'BuildRight Supplies', rating: 4.6, price: 15.75, unit: 'sheet', imageUrl: 'https://picsum.photos/seed/drywall/400/300', quantityInStock: 450, location: 'Warehouse B, Rack 15', reorderPoint: 500, averageDailyUsage: 40 },
    { id: 'm5', name: 'Asphalt Shingles', supplier: 'Roofer\'s Choice', rating: 4.7, price: 95.00, unit: 'bundle', imageUrl: 'https://picsum.photos/seed/shingles/400/300', quantityInStock: 150, location: 'Warehouse A, Bay 5', reorderPoint: 100, averageDailyUsage: 5 },
];

export const MOCK_JOBS: Job[] = [
    { id: 'j1', title: 'Senior Site Supervisor', location: 'Downtown, Metropolis', type: 'Full-time', experience: '8+ years', description: 'Oversee all on-site activities, ensuring projects are completed on schedule, within budget, and to the highest quality standards.', responsibilities: ['Manage subcontractors and site personnel.', 'Enforce safety protocols rigorously.', 'Coordinate material deliveries and equipment usage.', 'Provide daily progress reports to the Project Manager.'] },
    { id: 'j2', title: 'Licensed Electrician', location: 'Oakwood Residence Project', type: 'Contract', experience: '5+ years', description: 'Seeking a skilled electrician for a high-end residential project. Must be proficient in modern wiring techniques and smart home installations.', responsibilities: ['Install and maintain wiring, control, and lighting systems.', 'Inspect electrical components, such as transformers and circuit breakers.', 'Identify electrical problems with a variety of testing devices.', 'Repair or replace wiring, equipment, or fixtures using hand tools and power tools.'] },
    { id: 'j3', title: 'Heavy Equipment Operator', location: 'Citywide', type: 'Full-time', experience: '3+ years', description: 'Operate heavy machinery like excavators, bulldozers, and loaders for various civil and commercial projects across the city.', responsibilities: ['Operate heavy equipment in compliance with the company\'s operating safety policies and procedures.', 'Perform daily maintenance and safety checks of equipment.', 'Work with ground personnel to align and position equipment.', 'Understand and follow grade stakes and markings.'] },
    { id: 'j4', title: 'Project Accountant', location: 'Head Office', type: 'Full-time', experience: '4+ years in construction accounting', description: 'Manage all financial aspects of construction projects, from budgeting and forecasting to invoicing and reporting.', responsibilities: ['Prepare and manage project budgets.', 'Process subcontractor invoices and payments.', 'Track project costs and provide regular financial reports.', 'Collaborate with project managers to ensure financial success.'] },
];

export const MOCK_EMPLOYEES: Employee[] = [
    { id: 'e1', name: 'Maria Garcia', role: 'Project Manager', email: 'maria.g@constructai.com', phone: '555-0101', hireDate: '2020-03-15', avatar: 'https://i.pravatar.cc/150?u=e1', status: 'Active' },
    { id: 'e2', name: 'John Smith', role: 'Site Supervisor', email: 'john.s@constructai.com', phone: '555-0102', hireDate: '2021-07-22', avatar: 'https://i.pravatar.cc/150?u=e2', status: 'Active' },
    { id: 'e3', name: 'David Chen', role: 'Lead Carpenter', email: 'david.c@constructai.com', phone: '555-0103', hireDate: '2019-01-10', avatar: 'https://i.pravatar.cc/150?u=e3', status: 'On Leave' },
    { id: 'e4', name: 'Emily White', role: 'Accountant', email: 'emily.w@constructai.com', phone: '555-0104', hireDate: '2022-11-01', avatar: 'https://i.pravatar.cc/150?u=e4', status: 'Active' },
    { id: 'e5', name: 'Robert Brown', role: 'Electrician', email: 'robert.b@constructai.com', phone: '555-0105', hireDate: '2023-02-18', avatar: 'https://i.pravatar.cc/150?u=e5', status: 'Active' },
];

export const MOCK_APPLICANTS: Applicant[] = [
    { id: 'a1', name: 'Jessica Miller', email: 'j.miller@email.com', phone: '555-0201', status: 'Interviewing', appliedDate: '2024-07-15' },
    { id: 'a2', name: 'Kevin Davis', email: 'kevin.d@email.com', phone: '555-0202', status: 'New', appliedDate: '2024-07-18' },
    { id: 'a3', name: 'Sarah Wilson', email: 's.wilson@email.com', phone: '555-0203', status: 'Offer', appliedDate: '2024-07-12' },
    { id: 'a4', name: 'Michael Rodriguez', email: 'm.rod@email.com', phone: '555-0204', status: 'Rejected', appliedDate: '2024-07-10' },
];


export const ALL_ROLES = Object.values(Role);