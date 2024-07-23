import { Route, Routes, Outlet, Navigate } from 'react-router-dom';

import GhRedirect from './pages/auth/ghRedirect';
import Home from './pages/home';
import Login from './pages/auth/login';

function ProtectedRoute() {
  const result = localStorage.getItem('authToken') !== null;

  return result ? <Outlet /> : <Navigate to="/login" />;
}

export function Logout() {
  localStorage.removeItem('authToken');
  return <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gh/cb" element={<GhRedirect />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<ProtectedRoute />}></Route>
    </Routes>
  );
}

export default AppRoutes;
