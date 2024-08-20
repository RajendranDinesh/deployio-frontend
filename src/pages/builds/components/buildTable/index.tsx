import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Build, GetAllBuilds } from '../../controller';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function BuildTable() {
  const { id } = useParams();

  const [builds, setBuilds] = useState<Build[] | null>(null);

  useEffect(() => {
    const getSetTableContent = async () => {
      let builds: Build[] = await GetAllBuilds(Number(id));

      builds = builds.map((build) => ({
        ...build,
        created_at: new Date(build.created_at),
      }));

      setBuilds(builds);
    };

    getSetTableContent();
  }, [id]);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.no</TableHead>
            <TableHead>Commit Hash</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Trigger Mode</TableHead>
            <TableHead>Created at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {builds ? (
            builds.length > 0 &&
            builds.map((build, index) => (
              <TableRow
                key={index}
                className=" hover:cursor-pointer "
                onClick={() =>
                  (window.location.href = `/project/${id}/build/${build.build_id}`)
                }
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{build.commit_hash}</TableCell>
                <TableCell>{build.build_status}</TableCell>
                <TableCell>{build.triggered_by}</TableCell>
                <TableCell>{build.created_at.toUTCString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <>
              {[...Array(3)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className=" h-[30px] " />
                  </TableCell>
                  <TableCell>
                    <Skeleton className=" h-[30px] " />
                  </TableCell>
                  <TableCell>
                    <Skeleton className=" h-[30px] " />
                  </TableCell>
                  <TableCell>
                    <Skeleton className=" h-[30px] " />
                  </TableCell>
                  <TableCell>
                    <Skeleton className=" h-[30px] " />
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
      {builds && builds.length == 0 && (
        <div className=" mt-6 flex justify-center ">
          <span>Oops. seems like you haven&apos;t created a build yet.</span>
        </div>
      )}
    </div>
  );
}
