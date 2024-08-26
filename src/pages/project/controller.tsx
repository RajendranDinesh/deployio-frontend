import Toast from '@/components/Toast';
import { Request } from '@/networking';
import { AxiosError } from 'axios';

export interface Project {
  name: string;
  install_command: string;
  build_command: string;
  output_folder: string;
  node_version: string;
  directory: string;
  github_url: string;
}

export interface DeploymentStats {
  commit_hash: string;
  project_name: string;
  is_active: boolean;
  created_at: Date;
}

export async function GetDeploymentStat(id: number) {
  try {
    const responseBody = await Request('GET', `/deployment/${id}`);

    if (responseBody.status != 200) {
      console.log(responseBody.data);
      Toast(
        'error',
        <p>Error While Fetching Your Project&apos;s Deployment Status.</p>,
      );
    }

    const { data } = responseBody;

    const stats: DeploymentStats = data;

    stats.created_at = new Date(stats.created_at);

    return stats;
  } catch (error) {
    if (error && (error as AxiosError).response?.status === 404) {
      return {
        commit_hash: 'somefunnyhash',
        project_name: '',
        is_active: false,
        created_at: new Date(),
      };
    }

    console.log(error);
    Toast('error', <p>Check console</p>);
    return null;
  }
}

export async function GetProjectDetails(id: number) {
  try {
    const responseBody = await Request('GET', `/project/${id}`);

    if (responseBody.status != 200) {
      console.log(responseBody.data);
      Toast('error', <p>Error While Fetching Your Projects.</p>);
    }

    const { data } = responseBody;

    const projects: Project = data;

    return projects;
  } catch (error) {
    if ((error as AxiosError).response?.status === 404) {
      Toast(
        'error',
        <p>
          The Project you are looking for doesn&apos;t exists.
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
    Toast('error', <p>Check console</p>);
    return null;
  }
}

export const DeactivateDeployment = async (projectId: number) => {
  try {
    const reponse = await Request('DELETE', '/deployment/deactivate', {
      project_id: projectId,
    });

    if (reponse.status === 200) {
      Toast('success', <p>The deployment was deactivated successfully.</p>);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  } catch (error) {
    console.log(error);
    Toast('error', <p>Check console</p>);
  }
};

export const DeleteProject = async (projectId: number) => {
  try {
    const reponse = await Request('DELETE', `/project/${projectId}`);

    if (reponse.status === 200) {
      Toast('success', <p>The Project was deactivated successfully.</p>);

      setTimeout(() => {
        window.location.href = `/`;
      }, 500);
    }
  } catch (error) {
    console.log(error);
    Toast('error', <p>Check console</p>);
  }
};
