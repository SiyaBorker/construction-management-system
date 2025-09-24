import React, { useState, useCallback } from 'react';
import { getCostEstimate } from '../services/geminiService';
import { CostEstimate } from '../types';
import Loader from '../components/Loader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const AICostEstimatorPage: React.FC = () => {
    const [formData, setFormData] = useState({
        projectType: 'Residential House',
        area: 2000,
        floors: 2,
        quality: 'Standard',
        materials: 'Concrete, Wood, and Steel',
        features: 'Modern kitchen, 2-car garage'
    });
    const [estimate, setEstimate] = useState<CostEstimate | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'area' || name === 'floors' ? Number(value) : value }));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setEstimate(null);
        try {
            const result = await getCostEstimate(formData);
            setEstimate(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };
    
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
    };

    return (
        <div className="container mx-auto">
            <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">AI-Powered Cost Estimator</h1>
                <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2 py-1 rounded-full">Powered by Gemini AI</span>
            </div>
            <p className="text-gray-600 mb-8">Get a real-time, dynamic project cost estimate based on your specifications.</p>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">Project Type</label>
                                <select id="projectType" name="projectType" value={formData.projectType} onChange={handleInputChange} className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500">
                                    <option>Residential House</option>
                                    <option>Commercial Office</option>
                                    <option>Industrial Warehouse</option>
                                    <option>Bridge</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area (sq ft)</label>
                                    <input type="number" name="area" id="area" value={formData.area} onChange={handleInputChange} className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500" />
                                </div>
                                <div>
                                    <label htmlFor="floors" className="block text-sm font-medium text-gray-700">Floors</label>
                                    <input type="number" name="floors" id="floors" value={formData.floors} onChange={handleInputChange} className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="quality" className="block text-sm font-medium text-gray-700">Quality Level</label>
                                <select id="quality" name="quality" value={formData.quality} onChange={handleInputChange} className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500">
                                    <option>Basic</option>
                                    <option>Standard</option>
                                    <option>Premium</option>
                                    <option>Luxury</option>
                                </select>
                            </div>
                             <div>
                                <label htmlFor="materials" className="block text-sm font-medium text-gray-700">Primary Materials</label>
                                <input type="text" name="materials" id="materials" value={formData.materials} onChange={handleInputChange} className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500" placeholder="e.g., Brick, Glass, Steel" />
                            </div>
                            <div>
                                <label htmlFor="features" className="block text-sm font-medium text-gray-700">Additional Features</label>
                                <textarea name="features" id="features" rows={3} value={formData.features} onChange={handleInputChange} className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"></textarea>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-slate-900 bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                                {loading ? 'Estimating...' : 'Generate Estimate'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-3">
                    {loading && <div className="w-full h-96 flex items-center justify-center bg-white rounded-lg border border-gray-200"><Loader /></div>}
                    {error && <div className="bg-red-100 text-red-800 p-4 rounded-lg border border-red-200">{error}</div>}
                    {estimate && (
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 animate-fade-in">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cost Estimate Results</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 text-center">
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <p className="text-sm text-gray-500">Estimated Range</p>
                                    <p className="text-xl font-bold text-amber-600">{formatCurrency(estimate.estimatedTotalCost.min)} - {formatCurrency(estimate.estimatedTotalCost.max)}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <p className="text-sm text-gray-500">Contingency ({estimate.contingency.percentage}%)</p>
                                    <p className="text-xl font-bold text-gray-800">{formatCurrency(estimate.contingency.amount)}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <p className="text-sm text-gray-500">Timeline</p>
                                    <p className="text-xl font-bold text-gray-800">{estimate.timelineEstimate}</p>
                                </div>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Summary</h3>
                                <p className="text-gray-600 text-sm">{estimate.summary}</p>
                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
                            <div className="h-80 w-full mb-6">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={estimate.costBreakdown} margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="category" tick={{ fill: '#4b5563' }} fontSize={12} />
                                        <YAxis tickFormatter={(value) => `$${Number(value) / 1000}k`} tick={{ fill: '#4b5563' }} />
                                        <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', color: '#1f2937' }} cursor={{fill: '#f3f4f6'}}/>
                                        <Legend wrapperStyle={{ color: '#4b5563' }} />
                                        <Bar dataKey="cost" fill="#f59e0b" name="Cost (USD)" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimated Cost</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {estimate.costBreakdown.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(item.cost)} ({item.percentage}%)</td>
                                                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">{item.details}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AICostEstimatorPage;