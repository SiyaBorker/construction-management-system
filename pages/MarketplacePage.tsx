import React, { useState, useMemo } from 'react';
import { StockItem } from '../types';
import StatCard from '../components/StatCard';

interface StockManagementPageProps {
    inventory: StockItem[];
    setInventory: React.Dispatch<React.SetStateAction<StockItem[]>>;
}

const StockIcon: React.FC = () => <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>;
const AlertIcon: React.FC = () => <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>;

// Modal for Logging Usage
const LogUsageModal: React.FC<{ item: StockItem; onClose: () => void; onUpdate: (itemId: string, quantityUsed: number) => void; }> = ({ item, onClose, onUpdate }) => {
    const [quantity, setQuantity] = useState(0);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate(item.id, quantity);
        onClose();
    };
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm">
                <h3 className="text-lg font-bold mb-4 text-gray-900">Log Usage for {item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">Current Stock: {item.quantityInStock} {item.unit}s</p>
                <form onSubmit={handleSubmit}>
                    <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} min="0" max={item.quantityInStock} className="w-full bg-gray-50 border-gray-300 p-2 rounded" />
                    <div className="flex justify-end space-x-2 mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-amber-500 text-slate-900 font-bold rounded">Log Usage</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Modal for Reordering
const ReorderModal: React.FC<{ item: StockItem; onClose: () => void; }> = ({ item, onClose }) => {
    const [quantity, setQuantity] = useState(item.reorderPoint * 2);
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Create Purchase Order</h3>
                <p className="text-amber-600 font-semibold mb-4">{item.name}</p>
                <div className="text-sm space-y-2 mb-4">
                    <p><span className="font-semibold text-gray-500">Supplier:</span> {item.supplier} (⭐ {item.rating})</p>
                    <p><span className="font-semibold text-gray-500">Unit Cost:</span> ${item.price.toFixed(2)} per {item.unit}</p>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); alert(`Purchase order for ${quantity} ${item.unit}s of ${item.name} sent to ${item.supplier}! (Demo)`); onClose(); }}>
                    <label className="block text-sm font-medium mb-1">Quantity to Reorder:</label>
                    <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} min="1" className="w-full bg-gray-50 border-gray-300 p-2 rounded mb-4" />
                    <p className="font-bold text-lg text-gray-800">Total Cost: ${(quantity * item.price).toFixed(2)}</p>
                    <div className="flex justify-end space-x-2 mt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-amber-500 text-slate-900 font-bold rounded">Send Purchase Order</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const StockManagementPage: React.FC<StockManagementPageProps> = ({ inventory, setInventory }) => {
    const [activeModal, setActiveModal] = useState<{ type: 'log' | 'reorder'; item: StockItem } | null>(null);

    const handleLogUsage = (itemId: string, quantityUsed: number) => {
        setInventory(prev => prev.map(item =>
            item.id === itemId ? { ...item, quantityInStock: Math.max(0, item.quantityInStock - quantityUsed) } : item
        ));
    };

    const stats = useMemo(() => {
        const totalValue = inventory.reduce((acc, item) => acc + (item.quantityInStock * item.price), 0);
        const lowStockItems = inventory.filter(item => item.quantityInStock <= item.reorderPoint).length;
        return { totalValue, lowStockItems };
    }, [inventory]);

    const getStatus = (item: StockItem) => {
        const stockLevel = item.reorderPoint > 0 ? item.quantityInStock / item.reorderPoint : 2;
        if (item.quantityInStock === 0) return { text: 'Out of Stock', color: 'bg-red-100 text-red-800' };
        if (stockLevel <= 1) return { text: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' };
        if (stockLevel <= 1.2) return { text: 'Reorder Soon', color: 'bg-blue-100 text-blue-800' };
        return { text: 'Healthy', color: 'bg-green-100 text-green-800' };
    };

    return (
        <div className="container mx-auto">
            {activeModal?.type === 'log' && <LogUsageModal item={activeModal.item} onClose={() => setActiveModal(null)} onUpdate={handleLogUsage} />}
            {activeModal?.type === 'reorder' && <ReorderModal item={activeModal.item} onClose={() => setActiveModal(null)} />}
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Stock & Material Management</h1>
            <p className="text-gray-600 mb-8">Real-time inventory tracking, usage logging, and reordering.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Inventory Value" value={`$${stats.totalValue.toLocaleString('en-US', {maximumFractionDigits: 0})}`} icon={<StockIcon />} />
                <StatCard title="Items Low on Stock" value={`${stats.lowStockItems}`} icon={<AlertIcon />} trend="Action Required" trendDirection='down'/>
                <StatCard title="Suppliers" value="15" icon={<svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v.958m12 0c-3.181 0-5.935 2.566-6.697 5.692m0 0a5.902 5.902 0 01-3.692 0" /></svg>} />
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-x-auto border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">In Stock</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Days Left</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {inventory.map(item => {
                            const daysLeft = item.averageDailyUsage > 0 ? Math.floor(item.quantityInStock / item.averageDailyUsage) : Infinity;
                            const status = getStatus(item);
                            return (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                        <div className="text-xs text-gray-500">{item.supplier}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 font-semibold">{item.quantityInStock.toLocaleString()}</div>
                                        <div className="text-xs text-gray-500">{item.unit}s</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {daysLeft === Infinity ? 'N/A' : `${daysLeft} days`}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status.color}`}>{status.text}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                                        <button onClick={() => setActiveModal({type: 'log', item})} className="text-amber-600 hover:text-amber-800">Log Usage</button>
                                        <button onClick={() => setActiveModal({type: 'reorder', item})} className="text-blue-600 hover:text-blue-800">Reorder</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockManagementPage;