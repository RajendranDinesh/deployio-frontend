import { Route, Routes, Outlet, Navigate } from 'react-router-dom';

import GhRedirect from './pages/auth/ghRedirect';
import Home from './pages/home';
import Login from './pages/auth/login';
import Settings from './pages/settings';
import Layout from './layout';
import Project from './pages/project';
import ProjectLayout from './projectLayout';
import Env from './pages/env';
import { ViewBuilds, Build } from './pages/builds';
import NotFound from './pages/404';

function ProtectedRoute() {
  const result = localStorage.getItem('tocopass') !== null;

  return result ? <Outlet /> : <Navigate to="/login" />;
}

export function Logout() {
  localStorage.removeItem('tocopass');
  return <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/gh/cb" element={<GhRedirect />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="/project/:id" element={<ProjectLayout />}>
          <Route path="/project/:id" element={<Project />} />
          <Route path="/project/:id/build" element={<ViewBuilds />} />
          <Route path="/project/:id/build/:buildId" element={<Build />} />
          <Route path="/project/:id/env" element={<Env />} />
        </Route>
      </Route>

      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
