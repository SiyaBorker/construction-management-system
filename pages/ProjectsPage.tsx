import React, { useState, useMemo } from 'react';
import ProjectCard from '../components/ProjectCard';
import { Project } from '../types';

type ProjectStatus = Project['status'] | 'All';

interface ProjectsPageProps {
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const AddProjectModal: React.FC<{ onClose: () => void; onAddProject: (project: Project) => void; }> = ({ onClose, onAddProject }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newProject: Project = {
            id: `p${Date.now()}`,
            name: formData.get('name') as string,
            client: formData.get('client') as string,
            progress: 0,
            status: 'Planning',
            deadline: formData.get('deadline') as string,
            budget: Number(formData.get('budget')),
            spent: 0,
        };
        onAddProject(newProject);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Project</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="name" type="text" placeholder="Project Name" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
                    <input name="client" type="text" placeholder="Client Name" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
                    <input name="budget" type="number" placeholder="Total Budget" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
                    <div>
                        <label htmlFor="deadline" className="text-sm text-gray-500">Deadline</label>
                        <input id="deadline" name="deadline" type="date" required className="w-full bg-gray-50 border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"/>
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-semibold transition">Cancel</button>
                        <button type="submit" className="py-2 px-4 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-md font-bold transition">Create Project</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects, setProjects }) => {
    const [filter, setFilter] = useState<ProjectStatus>('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const filterOptions: ProjectStatus[] = ['All', 'In Progress', 'Completed', 'On Hold', 'Planning'];

    const filteredProjects = useMemo(() => {
        if (filter === 'All') return projects;
        return projects.filter(p => p.status === filter);
    }, [projects, filter]);

    const handleAddProject = (project: Project) => {
        setProjects(prevProjects => [project, ...prevProjects]);
    };

  return (
    <div className="container mx-auto">
        {isModalOpen && <AddProjectModal onClose={() => setIsModalOpen(false)} onAddProject={handleAddProject} />}

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects ({filteredProjects.length})</h1>
        <p className="text-gray-600 mb-8">Oversee all your construction projects from a single view.</p>

      {/* Filter and Actions */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
                {filterOptions.map(option => (
                    <button 
                        key={option}
                        onClick={() => setFilter(option)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                            filter === option
                                ? 'text-amber-700 bg-white shadow'
                                : 'text-gray-600 hover:bg-white/50'
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <button onClick={() => setIsModalOpen(true)} className="bg-amber-500 text-slate-900 font-bold py-2 px-4 rounded-md hover:bg-amber-600 transition-colors flex items-center shadow-sm">
                <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
                New Project
            </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;