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

export const DeleteEnv = async (id: number, envKey: string) => {
  try {
    const reponse = await Request('DELETE', '/project/environments', {
      project_id: id,
      env_key: envKey,
    });

    if (reponse.status === 200) {
      Toast('success', <p>Deleted the requested env key successfully</p>);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  } catch (error) {
    console.log(error);
    Toast('error', <p>Check console</p>);
  }
};

export const UpdateEnvKey = async (
  id: number,
  envKey: string,
  envValue: string,
) => {
  try {
    const responseBody = await Request('PUT', '/project/environments', {
      project_id: id,
      key: envKey,
      value: envValue,
    });

    if (responseBody.status == 200) {
      Toast('success', <p>Value has been updated successfully.</p>);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  } catch (error) {
    if (error && (error as AxiosError).response?.status == 404) {
      Toast(
        'warning',
        <p>Such Value doesn&apos;t exists, please create a new variable</p>,
      );
      return;
    }

    console.log(error);
    Toast('error', <p>Check console</p>);
  }
};

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
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  } catch (error) {
    console.log(error);
    Toast('error', <p>Check console</p>);
  }
};
