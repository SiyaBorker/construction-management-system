import React, { useState } from 'react';
import { APPLICANTS } from '../constants';
import { Applicant, ApplicantStatus } from '../types';

const getStatusColor = (status: ApplicantStatus) => {
    switch (status) {
        case 'Hired': return 'bg-green-100 text-green-800';
        case 'Offer': return 'bg-blue-100 text-blue-800';
        case 'Interview': return 'bg-purple-100 text-purple-800';
        case 'Screening': return 'bg-yellow-100 text-yellow-800';
        case 'Rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const HiringPage: React.FC = () => {
    const [applicants, setApplicants] = useState<Applicant[]>(APPLICANTS);
    
    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Hiring Pipeline</h1>
                    <p className="text-gray-600 mt-1">Manage job applicants and track their progress.</p>
                </div>
                 <button className="bg-amber-500 text-slate-900 font-bold py-2 px-4 rounded-md hover:bg-amber-600 transition-colors flex items-center shadow-sm">
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>
                    Add Candidate
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-x-auto border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Candidate</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applying For</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submission Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {applicants.map(applicant => (
                            <tr key={applicant.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img className="h-10 w-10 rounded-full" src={applicant.avatarUrl} alt={applicant.name} />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{applicant.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{applicant.role}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{applicant.submissionDate}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(applicant.stage)}`}>
                                        {applicant.stage}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                                    <button className="text-amber-600 hover:text-amber-800">View Profile</button>
                                    <button className="text-blue-600 hover:text-blue-800">Update Stage</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default HiringPage;
