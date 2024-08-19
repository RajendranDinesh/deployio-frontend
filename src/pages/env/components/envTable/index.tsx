import { useEffect, useState } from 'react';
import { DeleteEnv, Envs, GetProjectEnvKeys } from '../../controller';
import { useParams } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import UpdateModal from '../updateEnvModal';
import { Skeleton } from '@/components/ui/skeleton';
import { EllipsisVertical } from 'lucide-react';
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
import { Button } from '@/components/ui/button';

export default function EnvTable() {
  const [keys, setKeys] = useState<Envs | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const getSetEnvs = async () => {
      const data = await GetProjectEnvKeys(Number(id));

      if (data?.keys == null) {
        setKeys({ keys: [] });
        return;
      }

      const respData = data?.keys.map((key) => ({
        ...key,
        updated_at: new Date(key.updated_at),
      }));

      respData && setKeys({ keys: respData });
    };

    getSetEnvs();
  }, [id]);

  return (
    <div className=" mt-8 w-fit ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className=" min-w-[100px] ">S.no</TableHead>
            <TableHead className=" min-w-[200px] ">Key</TableHead>
            <TableHead className=" min-w-[300px] ">Updated at</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {keys ? (
            keys != null &&
            keys.keys.length > 0 &&
            keys.keys.map((key, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{key.key}</TableCell>
                <TableCell>{key.updated_at.toUTCString()}</TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <EllipsisVertical />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className=" flex flex-col gap-4 ">
                        <UpdateModal PId={Number(id)} envKey={key.key} />
                        <DeleteDialog id={Number(id)} keyStr={key.key} />
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <>
              <TableRow>
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
              <TableRow>
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
              <TableRow>
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
            </>
          )}
        </TableBody>
      </Table>
      {keys && keys != null && keys.keys.length === 0 && (
        <div className=" mt-8 flex justify-center ">
          <span>
            Oops.. Seems like you do not have any environment variables set up.
          </span>
        </div>
      )}
    </div>
  );
}

const DeleteDialog = ({ id, keyStr }: { id: number; keyStr: string }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'destructive'}>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            specified environment variable.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteEnv(id, keyStr)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const deleteEnv = (id: number, keyName: string) => {
  DeleteEnv(id, keyName);
};
