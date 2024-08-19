import { useEffect, useState } from 'react';
import { Envs, GetProjectEnvKeys } from './controller';
import { useParams } from 'react-router-dom';
import AddEnvModal from './components/addEnvModal';
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
import { Button } from '@/components/ui/button';

export default function Env() {
  const [keys, setKeys] = useState<Envs | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const getSetEnvs = async () => {
      const data = await GetProjectEnvKeys(Number(id));

      const respData = data?.keys.map((key) => ({
        ...key,
        updated_at: new Date(key.updated_at),
      }));

      console.log(respData);
      respData && setKeys({ keys: respData });
    };

    getSetEnvs();
  }, [id]);

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <div className=" flex gap-4 ">
          <h1 className="text-3xl font-semibold">Environment Variables</h1>
          <AddEnvModal />
        </div>
        <div>
          <div className=" w-fit ">
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
                {keys &&
                  keys.keys.map((key, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{key.key}</TableCell>
                      <TableCell>{key.updated_at.toUTCString()}</TableCell>
                      <TableCell>
                        <Popover>
                          <PopoverTrigger>
                            <Button variant={'secondary'}>:</Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className=" flex flex-col gap-4 ">
                              <Button variant={'secondary'}>Update</Button>
                              <Button variant={'destructive'}>Delete</Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </main>
  );
}
