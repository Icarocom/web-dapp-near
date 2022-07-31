import React, { useState, useEffect } from 'react';

import { AddNewProject, MyProjects, ProjectDetails } from 'components/Projects';
import type { AppState } from 'lib/store';

import { createProjectAsync, NFTProp, projectsAsync } from '../components/Projects/projectSlice';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import type { Project } from '../components/Projects/projectSlice';
import { addProjectAction, addNewNFTAction } from '../components/Projects/projectSlice';
import Metatags from '../components/Metatags';

export default function Projects() {
  const dispatch = useAppDispatch();

  const allStatus = {
    explorer: 'explorer',
    add: 'add',
    details: 'details',
  };

  const projs = useAppSelector((state: AppState) => state.projects);

  const [status, setStatus] = useState(allStatus.explorer);
  const [projects, setProjects] = useState<Project[]>(projs.projects?.data == undefined ? [] : projs.projects?.data);
  const [selectedProject, setSelectedProject] = useState<Project>({
    name: 'cool pizza',
    description: '2$',
    image: '/user.png',
    nfts: [],
  });

  useEffect(() => {
    dispatch(projectsAsync());
  }, []);

  useEffect(() => {
    setProjects(projs.projects?.data == undefined ? [] : projs.projects?.data);
  }, [projs]);

  const addProject = (project: Project) => {
    dispatch(createProjectAsync(project));
    dispatch(addProjectAction([...projects, project]));
    setStatus(allStatus.explorer);
  };

  const onAddNewNFT = (nft: NFTProp, project: Project) => {
    const updatedProjects = projects.map((proj, index) => {
      if (proj === project) {
        return { ...proj, nfts: [...proj.nfts, nft] };
      } else return proj;
    });

    dispatch(addNewNFTAction(updatedProjects));
  };

  return (
    <main>
      <Metatags title="Projects" description="Explore my projects" />
      <div className="flex items-center justify-center min-h-full px-0 py-12 sm:px-6 lg:px-8 relative">
        {status == allStatus.explorer && (
          <MyProjects
            projects={projects}
            onAdd={() => setStatus(allStatus.add)}
            onSelect={(project: Project) => {
              setSelectedProject(project);
              setStatus(allStatus.details);
            }}
          />
        )}
        {status == allStatus.add && (
          <AddNewProject onAdded={(project) => addProject(project)} onBack={() => setStatus('explorer')} />
        )}
        {status == allStatus.details && (
          <ProjectDetails
            onBack={() => setStatus(allStatus.explorer)}
            project={selectedProject}
            onNewNFT={(nft: NFTProp, project: Project) => onAddNewNFT(nft, project)}
          />
        )}
      </div>
    </main>
  );
}
