import { Skeleton } from '@/components/ui/skeleton';
import { Project } from '../../controller';

interface Inputs {
  project: Project | null | undefined;
}

export default function Configuration({ project }: Inputs) {
  return (
    <div className=" flex flex-col gap-4 ">
      <h3 className=" text-2xl font-medium ">Configuration</h3>
      <div className=" flex flex-wrap gap-2 ">
        {project && project != null ? (
          <div className=" flex w-full flex-col items-center gap-4 rounded-lg bg-muted-foreground/10 p-8 md:w-fit md:flex-row ">
            <h4 className=" text-base ">Project Directory</h4>
            <h3 className=" text-xl ">
              {project?.directory === '' ? './' : project?.directory}
            </h3>
          </div>
        ) : (
          <Skeleton className=" h-[70px] min-w-72 " />
        )}
        {project ? (
          <div className=" flex w-full flex-col items-center gap-4 rounded-lg bg-muted-foreground/10 p-8 md:w-fit md:flex-row ">
            <h4 className=" text-base ">Node Version</h4>
            <h3 className=" text-xl ">{project?.node_version}</h3>
          </div>
        ) : (
          <Skeleton className=" h-[70px] min-w-72 " />
        )}
        {project ? (
          <div className=" flex w-full flex-col items-center gap-4 rounded-lg bg-muted-foreground/10 p-8 md:w-fit md:flex-row ">
            <h4 className=" text-base ">Install Command</h4>
            <h3 className=" text-xl ">{project?.install_command}</h3>
          </div>
        ) : (
          <Skeleton className=" h-[70px] min-w-72 " />
        )}
        {project ? (
          <div className=" flex w-full flex-col items-center gap-4 rounded-lg bg-muted-foreground/10 p-8 md:w-fit md:flex-row ">
            <h4 className=" text-base ">Build Command</h4>
            <h3 className=" text-xl ">{project?.build_command}</h3>
          </div>
        ) : (
          <Skeleton className=" h-[70px] min-w-72 " />
        )}
        {project ? (
          <div className=" flex w-full flex-col items-center gap-4 rounded-lg bg-muted-foreground/10 p-8 md:w-fit md:flex-row ">
            <h4 className=" text-base ">Output Folder</h4>
            <h3 className=" text-xl ">{project?.output_folder}</h3>
          </div>
        ) : (
          <Skeleton className=" w-[70px] min-w-72 " />
        )}
      </div>
    </div>
  );
}
