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
          <div key={index} className=" rounded bg-muted md:min-w-96 ">
            <div className=" m-4 flex justify-between ">
              <a href={`project/${project.id}`} className=" text-xl ">
                {project.name}
              </a>
              {project.is_active && (
                <a
                  onClick={(event) => event.stopPropagation()}
                  className=" text-muted-foreground hover:underline "
                  href={
                    import.meta.env.VITE_ENV === 'prod'
                      ? 'https://' +
                        project.name +
                        '.' +
                        window.location.hostname
                      : 'http://' + project.name + '.' + 'localhost:3000'
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.name + '.' + window.location.hostname}
                </a>
              )}
            </div>
            <div className=" mx-4 mb-2 flex items-center justify-between ">
              <span className=" text-base ">
                Created at {project.created_at.toString().split('T')[0]}
              </span>
              <div className=" flex items-center gap-2 ">
                <span className=" text-base ">Status</span>
                {project.is_active ? (
                  <span className=" text-lg font-medium text-green-600 ">
                    Active
                  </span>
                ) : (
                  <span className=" text-lg font-medium text-red-600 ">
                    Down
                  </span>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <Skeleton className="h-[175px] w-[350px] rounded-xl" />
      )}
    </div>
  );
}
