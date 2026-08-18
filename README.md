# Construction Management System

A modular web-based construction management platform designed to centralize
project tracking, inventory management, financial operations, workforce
management, reporting, and AI-assisted cost estimation.

## Overview

The Construction Management System provides a unified interface for managing
day-to-day construction operations. The application is organized into
independent modules that can be accessed through a common dashboard and
navigation system.

The system currently includes:

- Project Management
- Stock & Inventory Management
- Financial Management
- Employee Management
- Hiring
- Reports & Analytics
- AI Cost Estimation
- User Authentication

## Features

### Project Management
- Create and manage construction projects
- Track project information and progress
- View project details through a centralized dashboard

### Stock Management
- Track construction materials and inventory
- Update stock quantities
- Monitor material availability

### Financial Management
- Manage invoices and financial records
- Track project-related financial information

### Employee Management
- Maintain employee information
- Manage workforce-related data

### Hiring
- Manage hiring-related information and workflows

### Reports & Dashboard
- Centralized dashboard for project and workforce information
- Generate reports from project, employee, and inventory data
- Display notifications and important system information

### AI Cost Estimation
- Provides AI-assisted construction cost estimation
- Uses the Gemini API through a dedicated service layer
- Separates AI integration from the main application components

## Application Architecture

The application follows a modular React architecture.

```text
construction-management-system/
│
├── components/
│   ├── Header
│   ├── Sidebar
│   ├── Loader
│   └── Reusable UI components
│
├── pages/
│   ├── Dashboard
│   ├── Projects
│   ├── AI Cost Estimator
│   ├── Stock Management
│   ├── Financials
│   ├── Employee Management
│   ├── Hiring
│   ├── Reports
│   └── Login
│
├── services/
│   └── geminiService.ts
│
├── App.tsx
├── types.ts
├── constants.tsx
└── package.json
