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
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export interface BuildResponse {
  builds: Build[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

interface Pagination {
  pageNumber: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export default function BuildTable() {
  const { id } = useParams();

  const [builds, setBuilds] = useState<Build[] | null>(null);

  const [pagination, setPagination] = useState<Pagination>({
    pageNumber: 1,
    limit: 5,
    totalItems: 0,
    totalPages: 0,
  });

  const loadPrevious = async () => {
    setPagination((prev) => ({
      ...prev,
      pageNumber: prev.pageNumber - 1,
    }));
  };

  const loadNext = async () => {
    setPagination((prev) => ({
      ...prev,
      pageNumber: prev.pageNumber + 1,
    }));
  };

  useEffect(() => {
    const getSetTableContent = async () => {
      setBuilds(null);

      const responseBody: BuildResponse = await GetAllBuilds(
        Number(id),
        pagination.limit,
        pagination.pageNumber,
      );

      const { totalPages, totalItems } = responseBody;

      setPagination((prev) => ({
        ...prev,
        totalItems: totalItems,
        totalPages: totalPages,
      }));

      let { builds } = responseBody;

      builds = builds.map((build) => ({
        ...build,
        created_at: new Date(build.created_at),
      }));

      setBuilds(builds);
    };

    const runOnLoad = async () => {
      await getSetTableContent();
    };

    runOnLoad();
  }, [id, pagination.pageNumber, pagination.limit]);

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
            builds.length > 0 && (
              <>
                {builds.map((build, index) => (
                  <TableRow
                    key={index}
                    className=" hover:cursor-pointer "
                    onClick={() =>
                      (window.location.href = `/project/${id}/build/${build.build_id}`)
                    }
                  >
                    <TableCell>
                      {index +
                        1 +
                        Math.abs(pagination.pageNumber - 1) * pagination.limit}
                    </TableCell>
                    <TableCell>{build.commit_hash}</TableCell>
                    <TableCell>{build.build_status}</TableCell>
                    <TableCell>{build.triggered_by}</TableCell>
                    <TableCell>{build.created_at.toUTCString()}</TableCell>
                  </TableRow>
                ))}
                <TableRow className=" disabled:pointer-events-none ">
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <span className=" flex items-center justify-end ">
                      {pagination.pageNumber} of {pagination.totalPages}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={pagination.limit + ''}
                      onValueChange={(value) => {
                        setPagination((prev) => ({
                          ...prev,
                          limit: Number(value),
                        }));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a repository" />
                      </SelectTrigger>
                      <SelectContent position="popper" sideOffset={-100}>
                        <SelectItem value={'5'} key={5}>
                          <div className=" flex items-center gap-5 ">
                            <Label>5</Label>
                          </div>
                        </SelectItem>
                        <SelectItem value={'10'} key={10}>
                          <div className=" flex items-center gap-5 ">
                            <Label>10</Label>
                          </div>
                        </SelectItem>
                        <SelectItem value={'20'} key={20}>
                          <div className=" flex items-center gap-5 ">
                            <Label>20</Label>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className=" flex w-full gap-2 ">
                    <Button
                      variant={'outline'}
                      disabled={pagination.pageNumber === 1}
                      onClick={loadPrevious}
                    >
                      Prev
                    </Button>
                    <Button
                      variant={'outline'}
                      disabled={pagination.pageNumber === pagination.totalPages}
                      onClick={loadNext}
                    >
                      Next
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            )
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
