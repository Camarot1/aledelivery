import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.scss'
export default function Register() {
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
        full_name: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:3001/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Ошибка регистрации');
            }

            setSuccess('Регистрация успешна! Теперь войдите.');
            setFormData({ phone: '', password: '', full_name: '' });
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

                    <h1 className="main__title">Регистрация</h1>

                    {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                    {success && <div className="success-message" style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form__block">
                            <input
                                className="form-input"
                                name="full_name"
                                type="text"
                                placeholder="Ваше Имя"
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="form-input"
                                name="phone"
                                type="tel"
                                placeholder="Номер телефона"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="form-input"
                                name="password"
                                type="password"
                                placeholder="Придумайте пароль"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="main__button">Зарегистрироваться</button>
                    </form>

                    <div className="main__social">
                        <div className="social__title">Уже есть аккаунт?</div>
                        <Link to="/login" className="action-link">Войти</Link>
                    </div>
                </div>
            </main>
        </div>
    );
}