import React, { useState, useMemo } from 'react';
import { MOCK_APPLICANTS } from '../constants';
import { Job, Applicant, Role } from '../types';

// Modal for Viewing Job Details and Applying
const JobDetailsModal: React.FC<{ job: Job; onClose: () => void; }> = ({ job, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in-fast" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl border border-gray-200" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
                        <p className="text-gray-600">{job.location}</p>
                    </div>
                    <button onClick={onClose} className="text-2xl font-light text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <div className="my-6 border-t border-gray-200"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-2">Job Description</h3>
                        <p className="text-sm text-gray-600 mb-4">{job.description}</p>
                        <h3 className="font-semibold text-gray-800 mb-2">Key Responsibilities</h3>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {job.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-4">Apply for this Position</h3>
                        <form className="space-y-4" onSubmit={e => { e.preventDefault(); alert('Application submitted! (Demo)'); onClose(); }}>
                            <input type="text" placeholder="Full Name" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
                            <input type="email" placeholder="Email Address" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
                            <div>
                                <label className="text-sm text-gray-600">Upload Resume (Optional)</label>
                                <input type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"/>
                            </div>
                            <button type="submit" className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-md font-bold transition">Submit Application</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Modal for Viewing Applicants (Admin)
const ApplicantsModal: React.FC<{ job: Job; applicants: Applicant[]; onClose: () => void; }> = ({ job, applicants, onClose }) => {
    const getStatusColor = (status: Applicant['status']) => {
      switch (status) {
        case 'New': return 'bg-blue-100 text-blue-800';
        case 'Interviewing': return 'bg-yellow-100 text-yellow-800';
        case 'Offer': return 'bg-green-100 text-green-800';
        case 'Rejected': return 'bg-red-100 text-red-800';
      }
    };
    return (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in-fast" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl border border-gray-200" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Applicants for {job.title}</h2>
                <p className="text-gray-600 mb-6">Review and manage candidates for this role.</p>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {applicants.map(app => (
                                <tr key={app.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>{app.status}</span></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button className="text-amber-600 hover:text-amber-800">View</button>
                                        <button className="text-blue-600 hover:text-blue-800">Interview</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 <div className="flex justify-end mt-6">
                    <button onClick={onClose} className="py-2 px-6 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-semibold">Close</button>
                </div>
            </div>
        </div>
    )
};


const JobCard: React.FC<{ job: Job; onDetails: (job: Job) => void; onViewApplicants: (job: Job) => void; isAdmin: boolean; }> = ({ job, onDetails, onViewApplicants, isAdmin }) => (
    <div className="bg-white p-5 rounded-lg shadow-md flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:shadow-lg transition-shadow duration-300 border border-gray-200">
        <div>
            <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{job.location}</p>
            <div className="flex items-center space-x-2 mt-2">
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{job.type}</span>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{job.experience} Required</span>
            </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {isAdmin && <button onClick={() => onViewApplicants(job)} className="text-sm bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">View Applicants</button>}
            <button onClick={() => onDetails(job)} className="text-sm bg-amber-500 text-slate-900 font-bold py-2 px-4 rounded-md hover:bg-amber-600 transition-colors">Apply Now</button>
        </div>
    </div>
);

interface HiringPageProps {
    jobs: Job[];
    setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
    userRole: Role;
}

const HiringPage: React.FC<HiringPageProps> = ({ jobs, setJobs, userRole }) => {
    const [activeModal, setActiveModal] = useState<{ type: 'details' | 'applicants'; job: Job } | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ type: 'All', experience: 'All' });

    const isAdmin = userRole === Role.Admin || userRole === Role.Supervisor;

    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filters.type === 'All' || job.type === filters.type;
            const matchesExp = filters.experience === 'All' || job.experience.startsWith(filters.experience[0]);
            return matchesSearch && matchesType && matchesExp;
        });
    }, [jobs, searchTerm, filters]);

    return (
        <div className="container mx-auto">
            {activeModal?.type === 'details' && <JobDetailsModal job={activeModal.job} onClose={() => setActiveModal(null)} />}
            {activeModal?.type === 'applicants' && <ApplicantsModal job={activeModal.job} applicants={MOCK_APPLICANTS} onClose={() => setActiveModal(null)} />}

            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Hiring & Workforce</h1>
                    <p className="text-gray-600 mt-1">Find and manage the best talent for your projects.</p>
                </div>
            </div>
            
             <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" placeholder="Search job titles..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
                    <select value={filters.type} onChange={e => setFilters(f => ({...f, type: e.target.value}))} className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500">
                        <option>All</option>
                        <option>Full-time</option>
                        <option>Contract</option>
                    </select>
                     <select value={filters.experience} onChange={e => setFilters(f => ({...f, experience: e.target.value}))} className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500">
                        <option>All</option>
                        <option>3+ years</option>
                        <option>5+ years</option>
                        <option>8+ years</option>
                    </select>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Open Positions ({filteredJobs.length})</h2>
                <div className="space-y-4">
                    {filteredJobs.map(job => <JobCard key={job.id} job={job} onDetails={j => setActiveModal({type: 'details', job: j})} onViewApplicants={j => setActiveModal({type: 'applicants', job: j})} isAdmin={isAdmin}/>)}
                </div>
            </div>
        </div>
    );
};

export default HiringPage;