import Toast from '@/components/Toast';
import { Request } from '@/networking';

export interface Project {
  id: number;
  name: string;
  install_command: string;
  build_command: string;
  output_folder: string;
  node_version: string;
  directory: string;
  is_active: boolean;
  created_at: Date;
}

export async function GetUserProjects() {
  try {
    const responseBody = await Request('GET', '/project/all');

    if (responseBody.status != 200) {
      Toast('error', <p>Error While Fetching Your Projects.</p>);
    }

    const { data } = responseBody;

    const projects: Project[] = data.projects;

    if (projects == null) return [];

    return projects;
  } catch (error) {
    console.log(error);
    Toast('error', <p>Check console</p>);
    return [];
  }
}
