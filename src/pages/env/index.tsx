import { useEffect, useState } from 'react';
import { Envs, GetProjectEnvKeys } from './controller';
import { useParams } from 'react-router-dom';
import AddEnvModal from './components/addEnvModal';

export default function Env() {
  const [keys, setKeys] = useState<Envs | null>(null);

  const { id } = useParams();

  useEffect(() => {
    const getSetEnvs = async () => {
      const data = await GetProjectEnvKeys(Number(id));

      setKeys(data);
      console.log(data);
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
        <div></div>
      </div>
    </main>
  );
}