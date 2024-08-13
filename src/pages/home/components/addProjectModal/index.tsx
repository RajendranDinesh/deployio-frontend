import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogTrigger } from '@radix-ui/react-dialog';
// import { ProjectSelect } from './projectSelect';
import { useState } from 'react';
import Control from './control';

export interface Project {
  name: string;
  directory: string;
  output_folder: string;
  node_version: string;
  install_command: string;
  build_command: string;
  github_id: number;
}

export default function AddProjectModal() {
  const [isOpen, setOpen] = useState(false);

  const def = {
    name: '',
    directory: './',
    output_folder: 'dist',
    node_version: '20.16.0',
    install_command: 'npm install',
    build_command: 'npm run build',
    github_id: 0,
  };

  const [project, setProject] = useState<Project>(def);

  const setDefaults = () => {
    setProject(def);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
            setDefaults();
          }}
          variant={'outline'}
        >
          New
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="Contains form for to get details of project to be created">
        <DialogHeader>
          <DialogTitle>Project Details</DialogTitle>
        </DialogHeader>
        <div>
          <form>
            <div className=" my-4 flex flex-col gap-2 ">
              <Label>Project Name</Label>
              <Input />
            </div>
            {/* <ProjectSelect /> */}
            <Control
              value={project.node_version}
              defaultValue={def.node_version}
              inputName="Node Version"
              onChange={(value) =>
                setProject({ ...project, node_version: value })
              }
            />
            <Control
              value={project.directory}
              defaultValue={def.directory}
              inputName="Directory"
              onChange={(value) => setProject({ ...project, directory: value })}
            />
            <Control
              value={project.install_command}
              defaultValue={def.install_command}
              inputName="Install Command"
              onChange={(value) =>
                setProject({ ...project, install_command: value })
              }
            />
            <Control
              value={project.build_command}
              defaultValue={def.build_command}
              inputName="Build Command"
              onChange={(value) =>
                setProject({ ...project, build_command: value })
              }
            />
            <Control
              value={project.output_folder}
              defaultValue={def.output_folder}
              inputName="Output Folder"
              onChange={(value) =>
                setProject({ ...project, output_folder: value })
              }
            />
          </form>
        </div>
        <DialogFooter>
          <Button onClick={() => setDefaults()}>Clear</Button>
          <Button
            onClick={() => {
              setOpen(false);
              console.log(project);
            }}
            type={'submit'}
          >
            Next
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
