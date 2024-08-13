import { Skeleton } from '@/components/ui/skeleton';
import AddProjectModal from './components/addProjectModal';

export default function Home() {
  return (
    <main className=" min-h-[calc(100vh_-_theme(spacing.16))] bg-muted/40 md:p-10 ">
      <div className=" flex flex-col gap-8 ">
        <div className=" flex gap-4 ">
          <h1 className=" text-3xl font-semibold ">Your Projects</h1>
          <AddProjectModal />
        </div>
        <div>
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[175px] w-[350px] rounded-xl" />
          </div>
        </div>
      </div>
    </main>
  );
}
