import { useEffect, useState } from 'react';
import { GetBuild, BuildInfo as ResponseType } from '../../controller';
import { useParams } from 'react-router-dom';

export default function BuildInfo() {
  const { buildId } = useParams();

  const [buildInfo, setBuildInfo] = useState<ResponseType | null>(null);

  useEffect(() => {
    const getSetBuild = async () => {
      const data: ResponseType | null = await GetBuild(Number(buildId));

      if (data) {
        data.start_time = new Date(data.start_time);
        data.end_time = new Date(data.end_time);
        data.created_at = new Date(data.created_at);
        data.updated_at = new Date(data.updated_at);
      }

      setBuildInfo(data);
    };

    getSetBuild();
  }, [buildId]);

  return (
    <div>
      {buildInfo && (
        <div className=" flex flex-col gap-8 p-8 ">
          <div className=" flex items-center justify-between ">
            <div className=" flex items-center gap-4 ">
              <h3>Status</h3>
              <h2 className=" text-2xl capitalize ">
                {buildInfo.build_status}
              </h2>
            </div>
            <div className=" flex gap-4 ">
              <h3>Commit Hash</h3>
              <h4>{buildInfo.commit_hash}</h4>
            </div>
          </div>

          <div className=" flex flex-col md:w-1/2 ">
            <div className=" flex items-center justify-between gap-4 ">
              <h3 className=" text-xl ">Trigger Mode</h3>
              <h2 className=" capitalize ">
                {buildInfo.triggered_by.toWellFormed()}
              </h2>
            </div>
            <div className=" flex items-center justify-between gap-4 ">
              <h3 className=" text-xl ">Queued at</h3>
              <h2>{new Date(buildInfo.created_at).toUTCString()}</h2>
            </div>

            <div className=" flex items-center justify-between gap-4 ">
              <h3 className=" text-xl ">Waited in queue for</h3>
              <h2>
                {Number(
                  (buildInfo.start_time.getTime() -
                    buildInfo.created_at.getTime()) /
                    1000,
                )}{' '}
                s
              </h2>
            </div>
            <div className=" flex items-center justify-between gap-4 ">
              <h3 className=" text-xl ">Start Time</h3>
              <h2>{new Date(buildInfo.start_time).toUTCString()}</h2>
            </div>
            <div className=" flex items-center justify-between gap-4 ">
              <h3 className=" text-xl ">End Time</h3>
              <h2>{new Date(buildInfo.end_time).toUTCString()}</h2>
            </div>
          </div>

          <div className=" overflow-hidden bg-black ">
            <div
              className=" overflow-hidden "
              dangerouslySetInnerHTML={{ __html: buildInfo.build_logs }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
