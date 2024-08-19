import Toast from '@/components/Toast';
import { Request } from '@/networking';
import { AxiosError } from 'axios';

interface RespEnv {
  key: string;
  updated_at: Date;
}

export interface Envs {
  keys: RespEnv[];
}

interface Env {
  key: string;
  value: string;
}

export const GetProjectEnvKeys = async (id: number) => {
  try {
    const responseBody = await Request('GET', `/project/environments/${id}`);

    const { data } = responseBody;

    const keys: Envs = data;

    return keys;
  } catch (error) {
    if (error && (error as AxiosError).response?.status === 404) {
      return {
        keys: [],
      };
    }

    console.log(error);
    Toast('error', <p>Check console</p>);
    return null;
  }
};

export const AddEnvToProject = async (id: number, values: Env[]) => {
  try {
    const responseBody = await Request('POST', '/project/environments', {
      project_id: id,
      environments: values,
    });

    if (responseBody.status == 200) {
      Toast('success', <p>Added Environment Variables</p>);
    }
  } catch (error) {
    console.log(error);
    Toast('error', <p>Check console</p>);
  }
};
