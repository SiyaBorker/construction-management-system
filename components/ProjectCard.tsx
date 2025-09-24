import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const getStatusColor = (status: Project['status']) => {
  switch (status) {
    case 'In Progress': return 'bg-blue-100 text-blue-800';
    case 'Completed': return 'bg-green-100 text-green-800';
    case 'On Hold': return 'bg-yellow-100 text-yellow-800';
    case 'Planning': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-200">
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-900 truncate">{project.name}</h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">Client: {project.client}</p>
        <p className="text-xs text-gray-500 mt-2">Deadline: {project.deadline}</p>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center text-sm text-gray-700 mb-1">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-sm">
        <div>
            <p className="text-gray-500">Budget</p>
            <p className="text-gray-800 font-semibold">${project.budget.toLocaleString()}</p>
        </div>
        <div>
            <p className="text-gray-500">Spent</p>
            <p className="text-gray-800 font-semibold">${project.spent.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;