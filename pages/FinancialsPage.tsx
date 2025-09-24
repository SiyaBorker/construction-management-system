import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Invoice, InvoiceStatus } from '../types';

interface FinancialsPageProps {
    invoices: Invoice[];
    setInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>;
}

const monthlyData = [
  { name: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
  { name: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
  { name: 'Mar', revenue: 2000, expenses: 9800, profit: -7800 },
  { name: 'Apr', revenue: 2780, expenses: 3908, profit: -1128 },
  { name: 'May', revenue: 1890, expenses: 4800, profit: -2910 },
  { name: 'Jun', revenue: 2390, expenses: 3800, profit: -1410 },
  { name: 'Jul', revenue: 3490, expenses: 4300, profit: -810 },
];

const RevenueIcon = () => <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ProfitIcon = () => <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ExpensesIcon = () => <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m-6 2.25h6M3 17.25a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25h18a2.25 2.25 0 012.25 2.25v8.25a2.25 2.25 0 01-2.25 2.25H3z" /></svg>;

const AddInvoiceModal: React.FC<{ onClose: () => void; onAddInvoice: (invoice: Invoice) => void; }> = ({ onClose, onAddInvoice }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newInvoice: Invoice = {
            id: `INV-${String(Date.now()).slice(-4)}`,
            clientName: formData.get('clientName') as string,
            projectName: formData.get('projectName') as string,
            amount: Number(formData.get('amount')),
            dueDate: formData.get('dueDate') as string,
            status: 'Pending',
        };
        onAddInvoice(newInvoice);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Invoice</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="clientName" type="text" placeholder="Client Name" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
                    <input name="projectName" type="text" placeholder="Project Name" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
                    <input name="amount" type="number" placeholder="Invoice Amount" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
                    <div>
                        <label htmlFor="dueDate" className="text-sm text-gray-500">Due Date</label>
                        <input id="dueDate" name="dueDate" type="date" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-semibold transition">Cancel</button>
                        <button type="submit" className="py-2 px-4 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-md font-bold transition">Create Invoice</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const FinancialsPage: React.FC<FinancialsPageProps> = ({ invoices, setInvoices }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddInvoice = (invoice: Invoice) => {
        setInvoices(prev => [invoice, ...prev]);
    };

    const getStatusColor = (status: InvoiceStatus) => {
      switch (status) {
        case 'Paid': return 'bg-green-100 text-green-800';
        case 'Pending': return 'bg-yellow-100 text-yellow-800';
        case 'Overdue': return 'bg-red-100 text-red-800';
      }
    };

    return (
        <div className="animate-fade-in">
            {isModalOpen && <AddInvoiceModal onClose={() => setIsModalOpen(false)} onAddInvoice={handleAddInvoice} />}

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Financials & Billing</h1>
            <p className="text-gray-600 mb-6">Track revenue, expenses, and client billing.</p>

            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button onClick={() => setActiveTab('overview')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                        Overview
                    </button>
                    <button onClick={() => setActiveTab('billing')} className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'billing' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                        Invoices & Billing
                    </button>
                </nav>
            </div>

            {activeTab === 'overview' && (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <StatCard title="Total Revenue (YTD)" value="$2.1M" icon={<RevenueIcon />} trend="+12% vs last year" trendDirection="up" />
                        <StatCard title="Total Expenses (YTD)" value="$1.8M" icon={<ExpensesIcon />} trend="+8% vs last year" trendDirection="down" />
                        <StatCard title="Net Profit (YTD)" value="$300K" icon={<ProfitIcon />} trend="+42% vs last year" trendDirection="up" />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Performance</h2>
                        <div style={{ width: '100%', height: 400 }}>
                            <ResponsiveContainer>
                                <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/><stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/></linearGradient>
                                        <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/><stop offset="95%" stopColor="#ffc658" stopOpacity={0}/></linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" /><YAxis /><CartesianGrid strokeDasharray="3 3" /><Tooltip /><Legend />
                                    <Area type="monotone" dataKey="revenue" stroke="#82ca9d" fillOpacity={1} fill="url(#colorRevenue)" />
                                    <Area type="monotone" dataKey="expenses" stroke="#ffc658" fillOpacity={1} fill="url(#colorExpenses)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'billing' && (
                <div>
                    <div className="flex justify-end mb-4">
                         <button onClick={() => setIsModalOpen(true)} className="bg-amber-500 text-slate-900 font-bold py-2 px-4 rounded-md hover:bg-amber-600 transition-colors flex items-center shadow-sm">
                            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>
                            Create Invoice
                        </button>
                    </div>
                    <div className="bg-white rounded-lg shadow-md overflow-x-auto border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {invoices.map(invoice => (
                                    <tr key={invoice.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">{invoice.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{invoice.clientName}</div>
                                            <div className="text-xs text-gray-500">{invoice.projectName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">${invoice.amount.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{invoice.dueDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                                                {invoice.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinancialsPage;
