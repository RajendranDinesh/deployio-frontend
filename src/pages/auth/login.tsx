import { Button } from '@/components/ui/button';

import ghLogoWhite from '@/assets/svg/ghLogoWhite.svg';
import ghLogoBlack from '@/assets/svg/ghLogoBlack.svg';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function Login() {
  return (
    <div className=" flex h-dvh items-center justify-center ">
      <Card className=" mx-2 w-full max-w-sm ">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter using your Github account to access deploy-io.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <div className=" flex justify-center ">
            <a
              href={`https://github.com/login/oauth/authorize?client_id=${
                import.meta.env.VITE_GH_CLIENT_ID
              }`}
            >
              <Button className=" flex w-full justify-evenly ">
                <img
                  className=" m-2 h-7 "
                  src={
                    localStorage.getItem('theme') === 'dark'
                      ? ghLogoBlack
                      : ghLogoWhite
                  }
                  alt="github"
                />{' '}
                GitHub
              </Button>
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
