import { Request } from '@/networking';

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
