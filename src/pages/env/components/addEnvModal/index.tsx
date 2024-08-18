import Toast from '@/components/Toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useRef, useState } from 'react';
import { AddEnvToProject } from '../../controller';
import { useParams } from 'react-router-dom';

interface Env {
  key: string;
  value: string;
}

// this function has one of the most unreadable variable names i have ever written, TC.
export default function AddEnvModal() {
  const { id } = useParams();

  const [keys, setKeys] = useState<Env[]>([]);

  const [values, setValues] = useState({ key: '', value: '' });

  const keyInpRef = useRef<HTMLInputElement>(null);

  const addKeys = () => {
    keyInpRef.current?.focus();

    if (values.key.length === 0 || values.value.trim().length === 0) {
      Toast('warning', <p>Values can&apos;t be null</p>);
      return;
    }

    setKeys(keys.concat({ key: values.key, value: values.value }));
    setValues({ key: '', value: '' });
  };

  const removeKey = (id: number) => {
    setKeys(keys.filter((_, index) => index != id));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New</Button>
      </DialogTrigger>
      <DialogContent aria-describedby="add environments">
        <DialogHeader>
          <DialogTitle>New Environments</DialogTitle>
        </DialogHeader>
        <div className=" rounded-md border border-muted-foreground/20 p-4 ">
          {keys.length > 0 ? (
            <span>You have entered the following key values so far</span>
          ) : (
            <span>Start entering key, value pair to see them here</span>
          )}
          <br />
          {keys.length > 0 && <span>{'{'}</span>}
          {keys.map((key, index) => (
            <div key={index} onClick={() => removeKey(index)}>
              &emsp;
              <span className=" text-sm ">
                {key.key} {':'}
              </span>
              &nbsp;
              <span className=" text-sm ">{key.value}</span>
              &#44;
            </div>
          ))}
          {keys.length > 0 && (
            <>
              <span>{'}'}</span>
              <br />
              <br />
              <span className=" text-sm ">
                You can click on a key value pair to remove it.
              </span>
            </>
          )}
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className=" flex flex-col gap-4 "
        >
          <div className=" flex gap-4 ">
            <Input
              ref={keyInpRef}
              placeholder="Key"
              value={values.key}
              onChange={(e) => setValues({ ...values, key: e.target.value })}
            />
            <Input
              placeholder="Value"
              value={values.value}
              onChange={(e) => setValues({ ...values, value: e.target.value })}
            />
            <Button variant={'ghost'} onClick={addKeys}>
              <span className=" text-3xl ">+</span>
            </Button>
          </div>
          <div className=" flex justify-between ">
            <Button onClick={() => AddEnvToProject(Number(id), keys)}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
