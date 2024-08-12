import Spinner from '@/components/ui/spinner';
import { Request, SetHeader } from '@/networking';

import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function GhRedirect() {
  const searchParams = new URLSearchParams(window.location.search);

  const code = searchParams.get('code');

  const handleLogin = async (code: string) => {
    try {
      const response = await toast.promise(
        Request('POST', '/auth/signin', { code }),
        {
          pending: 'Logging in...',
          success: 'Login Successfull!',
          error: 'Something went wrong',
        },
      );

      if (response.status !== 200) {
        throw new Error('Something went wrong');
      }

      const { token } = response.data;

      localStorage.setItem('tocopass', token);

      SetHeader('Authorization ', `Bearer ${token}`);

      window.location.href = '/';
    } catch (error: unknown) {
      console.log(`[Login] ${(error as Error).message}`);
      window.location.href = '/login';
    }
  };

  useEffect(() => {
    if (code) handleLogin(code);
  }, [code]);

  return (
    <div className=" flex h-dvh w-dvw items-center justify-center ">
      <Spinner isLoading />
    </div>
  );
}
