import { useState } from 'react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsList } from '@/components/ui/tabs';
import { TabsContent, TabsTrigger } from '@radix-ui/react-tabs';
import { CircleUser, Menu, Package2 } from 'lucide-react';
import { Button } from './components/ui/button';
import { Outlet } from 'react-router-dom';
import { Logout } from './routes';

export default function Layout() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') === 'dark');

  const ToggleTheme = () => {
    let theme = localStorage.getItem('theme');
    if (theme == null) theme = 'light';

    const newTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme === 'dark');

    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className=" flex min-h-screen w-full flex-col ">
      <Tabs defaultValue="dashboard">
        <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
          <TabsList className="hidden flex-col gap-6 bg-transparent text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <a
              href="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">deploy-io</span>
            </a>
            <TabsTrigger
              value="dashboard"
              className={`text${
                window.location.pathname === '/' ? '' : '-muted'
              }-foreground transition-colors hover:text-foreground`}
            >
              <a href="/">Dashboard</a>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className={`text${
                window.location.pathname.includes('/settings') ? '' : '-muted'
              }-foreground transition-colors hover:text-foreground`}
            >
              <a href="settings">Settings</a>
            </TabsTrigger>
          </TabsList>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <TabsList className="flex-col items-start gap-6 bg-transparent text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <a
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">deploy-io</span>
                </a>
                <TabsTrigger
                  value="dashboard"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <a href="/">Dashboard</a>
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="text-foreground transition-colors hover:text-foreground"
                >
                  <a href="settings">Settings</a>
                </TabsTrigger>
              </TabsList>
            </SheetContent>
          </Sheet>
          <div className="flex items-center justify-end gap-4 md:gap-2 lg:gap-4">
            <Popover>
              <PopoverTrigger>
                <div className="rounded-full">
                  <CircleUser className="h-7 w-7" />
                  <span className="sr-only">Toggle user menu</span>
                </div>
              </PopoverTrigger>
              <PopoverContent align="end">
                <div className=" divide-y ">
                  <div className=" w-full ">
                    <span className=" text-lg ">My Account</span>
                  </div>
                  <div className=" mt-4 text-base ">
                    <div className=" mx-2 my-2 flex w-full items-center justify-evenly gap-3 text-base font-normal ">
                      <span>Dark Mode</span>
                      <Switch onCheckedChange={ToggleTheme} checked={theme} />
                    </div>
                    <div className=" flex w-full flex-col items-start ">
                      <Button
                        variant={'ghost'}
                        className=" w-full justify-start "
                      >
                        <span className=" text-base font-normal ">
                          Settings
                        </span>
                      </Button>
                      <Button
                        variant={'ghost'}
                        className=" w-full justify-start "
                      >
                        <span className=" text-base font-normal ">Support</span>
                      </Button>
                      <Button
                        variant={'ghost'}
                        className=" w-full justify-start "
                        onClick={Logout}
                      >
                        <span className=" text-base font-normal ">Logout</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>
        <TabsContent value="dashboard">
          <Outlet />
        </TabsContent>
        <TabsContent value="settings">
          <Outlet />
        </TabsContent>
      </Tabs>
    </div>
  );
}
