import { useCallback, useEffect, useState } from 'react';
import { GetBuild, BuildInfo as ResponseType } from '../../controller';
import { useParams } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function BuildInfo() {
  const { buildId } = useParams();

  const [buildInfo, setBuildInfo] = useState<ResponseType | null>(null);

  const getSetBuild = useCallback(async () => {
    if (!buildId) return;

    const data: ResponseType | null = await GetBuild(Number(buildId));

    if (data) {
      data.start_time = new Date(data.start_time);
      data.end_time = new Date(data.end_time);
      data.created_at = new Date(data.created_at);
      data.updated_at = new Date(data.updated_at);
    }

    setBuildInfo(data);
  }, [buildId]);

  const refresh = () => {
    setBuildInfo(null);
    getSetBuild();
  };

  useEffect(() => {
    getSetBuild();
  }, [getSetBuild]);

  return (
    <div>
      <div className=" flex flex-col gap-8 p-8 ">
        <div className=" flex items-center justify-between ">
          <div className=" flex items-center gap-4 ">
            <h3>Status</h3>
            {buildInfo != null ? (
              <h2 className=" text-2xl capitalize ">
                {buildInfo.build_status}
              </h2>
            ) : (
              <Skeleton className=" min-h-8 min-w-36 " />
            )}
          </div>
          <div className=" flex items-center gap-4 ">
            <h3>Commit Hash</h3>
            {buildInfo != null ? (
              <h4 className=" font-light ">{buildInfo.commit_hash}</h4>
            ) : (
              <Skeleton className=" min-h-8 min-w-96 " />
            )}
          </div>
        </div>

        <div className=" flex justify-between ">
          <div className=" flex w-5/12 flex-col gap-2 ">
            <div className=" flex items-center justify-between gap-4 ">
              <h3 className=" text-xl ">Trigger Mode</h3>
              {buildInfo != null ? (
                <h2 className=" font-light capitalize ">
                  {buildInfo.triggered_by}
                </h2>
              ) : (
                <Skeleton className=" min-h-8 min-w-36 " />
              )}
            </div>
            <div className=" flex items-center justify-between gap-4 ">
              <h3 className=" text-xl ">Queued at</h3>
              {buildInfo != null ? (
                <h2 className=" font-light ">
                  {new Date(buildInfo.created_at).toUTCString()}
                </h2>
              ) : (
                <Skeleton className=" min-h-8 min-w-36 " />
              )}
            </div>
            <div className=" flex items-center justify-between gap-4 ">
              <h3 className=" text-xl ">Start Time</h3>
              {buildInfo != null ? (
                <h2 className=" font-light ">
                  {new Date(buildInfo.start_time).toUTCString()}
                </h2>
              ) : (
                <Skeleton className=" min-h-8 min-w-36 " />
              )}
            </div>
            <div className=" flex items-center justify-between gap-4 ">
              <h3 className=" text-xl ">End Time</h3>
              {buildInfo != null ? (
                <h2 className=" font-light ">
                  {new Date(buildInfo.end_time).toUTCString()}
                </h2>
              ) : (
                <Skeleton className=" min-h-8 min-w-36 " />
              )}
            </div>
          </div>
          <div className=" flex w-5/12 flex-col gap-2 ">
            <div className=" flex items-center justify-between gap-4 ">
              <h3 className=" text-xl ">Waited in queue for</h3>
              {buildInfo != null ? (
                <h2 className=" text-lg font-light ">
                  {Number(
                    (buildInfo.start_time.getTime() -
                      buildInfo.created_at.getTime()) /
                      1000,
                  )}{' '}
                  s
                </h2>
              ) : (
                <Skeleton className=" min-h-8 min-w-36 " />
              )}
            </div>
            <div className=" flex items-center justify-between gap-4 ">
              <h3 className=" text-xl ">Build ran for</h3>
              {buildInfo != null ? (
                <h2 className=" text-lg font-light ">
                  {new Date(
                    buildInfo.end_time.getTime() -
                      buildInfo.start_time.getTime(),
                  ).getUTCMinutes() > 0 && (
                    <>
                      {new Date(
                        buildInfo.end_time.getTime() -
                          buildInfo.start_time.getTime(),
                      ).getUTCMinutes()}
                      {'m '}
                    </>
                  )}
                  {new Date(
                    buildInfo.end_time.getTime() -
                      buildInfo.start_time.getTime(),
                  ).getUTCSeconds()}
                  s
                </h2>
              ) : (
                <Skeleton className=" min-h-8 min-w-36 " />
              )}
            </div>
          </div>
        </div>

        <div className=" mt-4 flex flex-col gap-4 ">
          <div className=" flex items-center gap-4 ">
            <h2 className=" text-2xl font-medium ">Build Logs</h2>
            <RefreshCw
              onClick={refresh}
              className={` ${
                buildInfo === null && `animate-spin-slow`
              } h-6 cursor-pointer `}
            />
          </div>
          {buildInfo != null ? (
            <div className=" logs-scrollbar flex max-h-80 flex-col gap-4 overflow-y-scroll rounded-md border border-muted-foreground/20 p-4 font-light ">
              {buildInfo.build_logs &&
                buildInfo.build_logs
                  .split('\n')
                  .map((line, index) => <div key={index}>{line}</div>)}
            </div>
          ) : (
            <Skeleton className=" min-h-16 min-w-full " />
          )}
        </div>
      </div>
    </div>
  );
}
