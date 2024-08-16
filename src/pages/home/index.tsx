import AddProjectModal from './components/addProjectModal';
import ProjectDisplay from './components/projectDisplay';

export default function Home() {
  return (
    <main className=" min-h-[calc(100vh_-_theme(spacing.16))] bg-muted/40 md:p-10 ">
      <div className=" flex flex-col gap-8 p-8 md:p-0 ">
        <div className=" flex gap-4 ">
          <h1 className=" text-3xl font-semibold ">Your Projects</h1>
          <AddProjectModal />
        </div>
        <div>
          <ProjectDisplay />
        </div>
      </div>
    </main>
  );
}
