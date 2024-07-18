import { Route, Routes, Outlet, Navigate } from 'react-router-dom';

import Home from './pages/home';

function ProtectedRoute() {
  const result = localStorage.getItem('authToken') !== null;

  return result ? <Outlet /> : <Navigate to="/" />;
}

export function Logout() {
  localStorage.removeItem('authToken');
  return <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/" element={<ProtectedRoute />}></Route>
    </Routes>
  );
}

export default AppRoutes;
