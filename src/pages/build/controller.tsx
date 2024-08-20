import Toast from '@/components/Toast';
import { Request } from '@/networking';

export interface Build {
  build_id: number;
  build_status: string;
  triggered_by: string;
  commit_hash: string;
  created_at: Date;
}

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
