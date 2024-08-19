import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { UpdateEnvKey } from '../../controller';
import Toast from '@/components/Toast';

interface Params {
  envKey: string;
  PId: number;
}

export default function UpdateModal({ envKey, PId }: Params) {
  const [isOpen, setIsOpen] = useState(false);

  const [newValue, setNewValue] = useState('');

  const update = async () => {
    if (!(newValue.trim().length > 0)) {
      Toast('error', <p>Environment variable can&apos;t be null.</p>);
      return;
    }

    await UpdateEnvKey(PId, envKey, newValue);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Update</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set new Value for {envKey}</DialogTitle>
        </DialogHeader>
        <div className=" flex flex-col gap-4 ">
          <Input
            placeholder="New Value"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <Button
            onClick={() => {
              update();
              setIsOpen(false);
            }}
            variant={'default'}
            className=" w-fit "
          >
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
