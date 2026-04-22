import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.scss';

export default function Login() {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState(''); // В твоем API это поле называется 'code'
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, code: password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Ошибка входа');
            }

            // Если успех — перенаправляем в профиль или на главную
            window.location.href = '/profile';
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-page">
            <main className="main">
                <div className="main__container container">
                    <div className="main__logo">
                        <img src="/img/logo.svg" alt="Логотип" />
                    </div>
                    <h1 className="main__title">Вход в аккаунт</h1>

                    {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

                    <form onSubmit={handleSubmit} className="login-form">
                        <input
                            className="form-input"
                            type="tel"
                            placeholder="Номер телефона"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        <input
                            className="form-input"
                            type="password"
                            placeholder="Пароль или код"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button type="submit" className="main__button">Войти</button>
                    </form>

                    <div className="main__social">
                        <div className="social__title">Нет аккаунта?</div>
                        <Link to="/register" className="action-link">Зарегистрироваться</Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
