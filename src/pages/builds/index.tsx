import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import BuildInfo from './components/buildInfo';
import BuildTable from './components/buildTable';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { CreateNewBuild } from './controller';

export function ViewBuilds() {
  const { id } = useParams();

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <div className=" flex gap-8 ">
          <h1 className="text-3xl font-semibold">Builds</h1>
          <CreateDialog projectId={Number(id)} />
        </div>
        <BuildTable />
      </div>
    </main>
  );
}

export function Build() {
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Build</h1>
        <BuildInfo />
      </div>
    </main>
  );
}

const CreateDialog = ({ projectId }: { projectId: number }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'outline'}>New</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Do you want to create a new build?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will re run the build setup from start. <br /> If successful
            the newly created build will replace the current deployment
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => CreateNewBuild(projectId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
