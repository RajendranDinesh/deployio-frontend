import Toast from '@/components/Toast';
import { Request } from '@/networking';
import { AxiosError } from 'axios';

export interface Build {
  build_id: number;
  build_status: string;
  triggered_by: string;
  commit_hash: string;
  created_at: Date;
}

export interface BuildInfo {
  build_id: number;
  build_status: string;
  triggered_by: string;
  commit_hash: string;
  build_logs: string;
  start_time: Date;
  end_time: Date;
  created_at: Date;
  updated_at: Date;
}

export const CreateNewBuild = async (id: number) => {
  try {
    const responseBody = await Request('POST', `/build/new`, {
      project_id: id,
    });

    if (responseBody.status == 200) {
      Toast(
        'success',
        <p>
          Create a build, <br />
          redirecting to build page...
        </p>,
      );

      const { build_id } = responseBody.data;

      setTimeout(() => {
        window.location.href = `/project/${id}/build/${build_id}`;
      }, 1000);
    }
  } catch (error) {
    console.log(error);
    Toast('error', <p>Couldn&apos;t create a build</p>);
  }
};

export const GetBuild = async (id: number) => {
  try {
    const responseBody = await Request('GET', `/build/${id}`);

    if (responseBody.status == 200) {
      const build = responseBody.data;

      if (build == null) return null;

      return build;
    }

    return null;
  } catch (error) {
    if ((error as AxiosError).response?.status === 404) {
      Toast(
        'error',
        <p>
          The build you are looking for doesn&apos;t exists.
          <br />
          Redirecting to home...
        </p>,
      );

      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

      return null;
    }
    console.log(error);
    Toast('error', <p>Check Console</p>);
  }
};

export const GetAllBuilds = async (id: number) => {
  try {
    const responseBody = await Request('GET', `/build/all/${id}`);

    if (responseBody.status == 200) {
      const { builds } = responseBody.data;

      if (builds == null) return [];
      return builds;
    }

    return [];
  } catch (error) {
    console.log(error);
    Toast('error', <p>Check console</p>);
  }
};
