import { authStore } from '../store/auth.store';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
    const user = authStore.getUser();
    const navigate = useNavigate();

    const logout = () => {
        authStore.clear();
        navigate('/login');
    };

    return (
        <div>
            <h1>Profile</h1>

            <p>ID: {user?.id}</p>
            <p>Эл. почта: {user?.email}</p>
            <p>Имя: {user?.firstname}</p>
            <p>Фамилия: {user?.lastname}</p>

            <button onClick={logout}>Выйти</button>
        </div>
    );
};
