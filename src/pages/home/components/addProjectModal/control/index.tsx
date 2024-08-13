import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

interface Inputs {
  value: string;
  onChange: (arg0: string) => void;
  defaultValue: string;
  inputName: string;
}

export default function Control({
  value,
  onChange,
  defaultValue,
  inputName,
}: Inputs) {
  const [override, setOverride] = useState(false);

  return (
    <div className=" my-4 flex flex-col gap-2 ">
      <div className=" flex items-center justify-between ">
        <div className=" flex gap-3 ">
          <Label>{inputName}</Label>
          <Label className=" text-muted-foreground ">
            {!override && defaultValue.repeat(1)}
          </Label>
        </div>
        <div className=" flex items-center gap-2 ">
          <Label>Override</Label>
          <Switch
            onClick={() => {
              setOverride(!override);
            }}
          />
        </div>
      </div>
      {override && (
        <Input
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </div>
  );
}
