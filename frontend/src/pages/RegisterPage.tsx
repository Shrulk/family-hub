import { useState } from 'react';
import { authApi } from '../services/auth.api';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const navigate = useNavigate();

    const submit = async () => {
        try {
            await authApi.register({ email, password, firstname, lastname });
            alert('Пользователь успешно зарегистрирован');
            navigate('/login');
        } catch (e) {
            alert('Ошибка при регистрации');
        }
    };

    return (
        <div>
            <h1>Register</h1>

            <input placeholder="Имя" value={firstname} onChange={e => setFirstname(e.target.value)} />
            <input placeholder="Фамилия" value={lastname} onChange={e => setLastname(e.target.value)} />
            <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />

            <button onClick={submit}>Register</button>
        </div>
    );
};
