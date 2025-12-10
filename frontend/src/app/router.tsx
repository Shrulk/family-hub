import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ProfilePage } from '../pages/ProfilePage';
import { authStore } from '../store/auth.store';

export const router = createBrowserRouter([
    {
        path: '/',
        element: authStore.isAuthenticated() ? <ProfilePage /> : <Navigate to="/login" />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
]);
