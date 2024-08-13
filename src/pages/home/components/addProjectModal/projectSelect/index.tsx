import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { GetUserRepository } from '../controller';

import { Repository } from '../controller';
import Spinner from '@/components/ui/spinner';

export const ProjectSelect = () => {
  const [projects, setProjects] = useState<Repository[]>([]);

  const [value, setValue] = useState<string>('');

  const GetSetRepos = async () => {
    const data = await GetUserRepository();
    setProjects(data);
  };

  useEffect(() => {
    GetSetRepos();
  }, []);

  return projects.length != 0 ? (
    <div className=" my-4 flex flex-col gap-2 ">
      <Label>Repository</Label>
      <Select
        defaultValue={value || ''}
        onValueChange={(val) => {
          setValue(val + '');
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a repository" />
        </SelectTrigger>
        <SelectContent position="popper" sideOffset={-100}>
          {projects.map((project) => (
            <SelectItem value={project.id + ''} key={project.id}>
              <div className=" flex items-center gap-5 ">
                <img
                  className=" h-7 w-7 rounded-full "
                  alt="user"
                  src={project.owner.avatar_url}
                />
                <Label>{project.full_name}</Label>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ) : (
    <div className=" flex flex-col justify-center gap-4 ">
      <Label>Repository</Label>
      <Spinner isLoading={projects.length === 0} />
    </div>
  );
};
