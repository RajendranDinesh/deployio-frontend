import { Request } from '@/networking';
import Toast from '@/components/Toast';
import { Project } from '.';

export interface Repository {
  id: string;
  full_name: string;
  owner: {
    avatar_url: string;
  };
}

export async function GetUserRepository(): Promise<Repository[]> {
  try {
    const requestBody = await Request('GET', '/github/repos');

    if (requestBody.status != 200) {
      throw new Error('Error while fetching user repos');
    }

    const { data } = requestBody;

    return data;
  } catch (error) {
    return [];
  }
}

export async function CreateNewProject(project: Project) {
  try {
    const responseBody = await Request('POST', '/project/new', project);

    if (responseBody.status != 200) {
      throw new Error(
        'Error while creating your project:\n' + responseBody.data,
      );
    }

    const { data } = responseBody;

    Toast('success', <p>Project Created, redirecting...</p>);

    window.location.href = `/project/${data.project_id}`;
  } catch (error) {
    Toast('error', <p>Could Not create Project, Try again later</p>);
  }
}
