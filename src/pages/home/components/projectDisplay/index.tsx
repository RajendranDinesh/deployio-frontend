import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { GetUserProjects, Project } from './controller';

export default function ProjectDisplay() {
  const [projects, setProjects] = useState<Project[]>([]);

  const getProjects = async () => {
    const data = await GetUserProjects();

    setProjects(data);
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="flex flex-col flex-wrap gap-8 md:flex-row ">
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <a
            href={`/project/${project.id}`}
            key={index}
            className=" min-w-96 rounded bg-muted "
          >
            <div className=" m-4 ">
              <h1 className=" text-xl ">{project.name}</h1>
              <a
                className=" text-muted-foreground hover:underline "
                href={
                  import.meta.env.VITE_ENV === 'prod'
                    ? 'https://' + project.name + '.' + window.location.hostname
                    : 'http://' + project.name + '.' + 'localhost:3000'
                }
                target="_blank"
                rel="noreferrer"
              >
                {project.name + '.' + window.location.hostname}
              </a>
            </div>
            <div className=" mb-2 ml-4 ">
              <span className=" text-base ">
                Created at {project.created_at.toString().split('T')[0]}
              </span>
            </div>
          </a>
        ))
      ) : (
        <Skeleton className="h-[175px] w-[350px] rounded-xl" />
      )}
    </div>
  );
}
