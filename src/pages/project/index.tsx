import { useEffect, useState } from 'react';
import { GetProjectDetails, type Project } from './controller';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

import ghLogoWhite from '@/assets/svg/ghLogoWhite.svg';
import ghLogoBlack from '@/assets/svg/ghLogoBlack.svg';
import Configuration from './components/config';
import Deployment from './components/deployment';

export default function Project() {
  const [project, setProject] = useState<Project | null>();

  const { id } = useParams();

  useEffect(() => {
    const getProjects = async () => {
      const data = await GetProjectDetails(Number(id));

      setProject(data);
    };

    getProjects();
  }, [id]);

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <div>
          {project ? (
            <div className=" flex flex-col gap-8 rounded-lg bg-muted-foreground/10 p-8 md:flex-row md:items-center md:justify-between md:gap-0 ">
              <div className=" flex w-full md:flex-row ">
                <div className=" flex items-center gap-4 ">
                  <h1 className=" text-5xl font-extrabold italic ">
                    {project?.name}
                  </h1>
                </div>
              </div>
              <div className=" flex min-w-fit items-center gap-4 ">
                <a
                  href={project?.github_url}
                  target="_blank"
                  rel="noreferrer"
                  className=" break-all text-muted-foreground hover:underline "
                >
                  <img
                    className=" h-8 "
                    src={
                      localStorage.getItem('theme') === 'dark'
                        ? ghLogoWhite
                        : ghLogoBlack
                    }
                    alt="github"
                  />
                </a>
                <Button variant={'destructive'}>Delete</Button>
              </div>
            </div>
          ) : (
            <Skeleton className="h-[100px]" />
          )}
        </div>

        <Deployment />

        {/* Configuration Stuff starts from here */}
        <Configuration project={project} />
      </div>
    </main>
  );
}
