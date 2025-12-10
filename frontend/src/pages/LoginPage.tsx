import { useState } from 'react';
import { authApi } from '../services/auth.api';
import { authStore } from '../store/auth.store';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submit = async () => {
        try {
            const data = await authApi.login({ email, password });
            authStore.setAuth(data.user, data.accessToken);
            navigate('/');
        } catch (e) {
            alert('Ошибка авторизации');
        }
    };

    return (
        <div>
            <h1>Вход в систему</h1>

            <input
                placeholder="Эл. почта"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <button onClick={submit}>Login</button>
        </div>
    );
};
