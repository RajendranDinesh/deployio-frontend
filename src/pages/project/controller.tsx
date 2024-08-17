import Toast from '@/components/Toast';
import { Request } from '@/networking';

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
    console.log(error);
    Toast('error', <p>Check console</p>);
    return null;
  }
}
