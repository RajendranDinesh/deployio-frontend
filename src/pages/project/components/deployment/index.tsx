import { RefreshCw, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DeploymentStats, GetDeploymentStat } from '../../controller';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';

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
          } h-6 hover:cursor-pointer `}
        />
      </h3>
      {status && status != null ? (
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
          <div>
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
          </div>
        </div>
      ) : (
        <Skeleton className=" h-[175px] w-full " />
      )}
    </div>
  );
}
