import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from '../../layouts/Dashboard';
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
import NotFound from '../../page/404/Page404';
import { LoginPage } from '../../page/Auth/LoginPage';
import DashboardApp from '../../page/Dashboard/DashboardApp';
import Register from '../../page/Registration/Register';

export const Router = () =>
  useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [{ path: 'app', element: <DashboardApp /> }],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
