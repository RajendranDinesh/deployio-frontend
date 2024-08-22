import { RefreshCw, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  DeactivateDeployment,
  DeploymentStats,
  GetDeploymentStat,
} from '../../controller';

export default function Deployment() {
  const [status, setStatus] = useState<DeploymentStats | null>();
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const refresh = async () => {
    setStatus(null);
    setIsLoading(true);
    const data = await GetDeploymentStat(Number(id));
    setStatus(data);
    setIsLoading(false);
  };

  useEffect(() => {
    const getDeploymentStat = async () => {
      const data = await GetDeploymentStat(Number(id));

      setStatus(data);
    };

    getDeploymentStat();
  }, [id]);

  return (
    <div className=" flex flex-col gap-4 ">
      <h3 className=" flex items-center gap-4 text-2xl font-medium ">
        <span>Deployment</span>
        <RefreshCw
          onClick={refresh}
          className={` ${
            isLoading && ` animate-spin-slow `
          } h-6 cursor-pointer `}
        />
      </h3>
      {status && status != null ? (
        status && !(status.commit_hash == 'somefunnyhash') ? (
          <div className=" flex justify-between rounded-md bg-muted-foreground/10 p-8 ">
            <div className=" flex flex-col gap-4 break-all ">
              <div className=" flex items-center gap-4 ">
                <span>Status</span>
                <h4 className=" text-3xl ">
                  {status?.is_active ? 'Active' : 'Nope'}
                </h4>
              </div>
              <div className=" flex items-center gap-4 ">
                <span>Created at</span>
                <h4 className=" text-3xl ">
                  {status?.created_at.toDateString()}
                </h4>
              </div>
              <div className=" flex items-center gap-4 ">
                <span>Commit Hash</span>
                <h4 className=" text-xl ">{status?.commit_hash}</h4>
              </div>
            </div>
            <div className=" flex flex-col justify-between ">
              <div className=" flex items-center gap-4 ">
                <span>URL</span>
                <h4>
                  <a
                    onClick={(event) => event.stopPropagation()}
                    className=" flex items-center text-muted-foreground hover:underline "
                    href={
                      import.meta.env.VITE_ENV === 'prod'
                        ? 'https://' +
                          status?.project_name +
                          '.' +
                          window.location.hostname
                        : 'http://' +
                          status?.project_name +
                          '.' +
                          'localhost:3000'
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {status?.project_name + '.' + window.location.hostname}
                    <ExternalLink className=" h-4 " />
                  </a>
                </h4>
              </div>
              <div className=" flex flex-col ">
                <DeactivateDialog projectId={Number(id)} />
              </div>
            </div>
          </div>
        ) : (
          <p>No active deployment found.</p>
        )
      ) : (
        <Skeleton className=" h-[175px] w-full " />
      )}
    </div>
  );
}

const DeactivateDialog = ({ projectId }: { projectId: number }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'secondary'}>Deactivate</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure ?</AlertDialogTitle>
          <AlertDialogDescription>
            Continuing to do so will,
            <br />
            delete all of you assets from our servers,
            <br />
            You&apos;d have to re-run the build process to create a new
            deployment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => DeactivateDeployment(projectId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
