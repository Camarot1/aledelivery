import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Импортируй Info из твоего старого компонента
import Info from '../../components/info.jsx'; 
import './profile.scss'; // Не забудь подключить стили

const API_URL = 'http://localhost:3001/api'; 

export default function Profile() {
    const [user, setUser] = useState(null);
    const [phoneInput, setPhoneInput] = useState('');
    const [parcels, setParcels] = useState([]);
    const [activeTab, setActiveTab] = useState("actives"); // 'actives' | 'complete'

    // 1. Проверка входа (проверяет в БД пользователя)
    useEffect(() => {
        const storedPhone = localStorage.getItem('user_phone');
        if (storedPhone) {
            setUser({ phone: storedPhone });
            fetchOrders();
        }
    }, []);

    // Загрузка заказов при входе
    const fetchOrders = async () => {
        if (!user) return;
        try {
            const response = await axios.get(`${API_URL}/parcels/${user.phone}`);
            setParcels(response.data);
        } catch (error) {
            console.error("Ошибка загрузки заказов", error);
        }
    };

    // 2. Ввод телефона для входа (если не залогинен)
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { phone: phoneInput, code: '1234' });
            const userData = response.data;
            localStorage.setItem('user_phone', userData.phone);
            setUser(userData);
            fetchOrders(); // Загрузить заказы сразу после входа
        } catch (error) {
            console.error(error.response?.data?.error || "Ошибка входа");
        }
    };

    return (
        <div className="profile-page">
            <main className="main">
                <div className="main__container container">
                    {/* Если не залогинен - экран входа */}
                    {!user && (
                        <section className="login-block">
                            <h1 className="main__title">Войдите в аккаунт</h1>
                            <form onSubmit={handleLogin}>
                                <input 
                                    type="text" 
                                    placeholder="Номер телефона (+7...)" 
                                    value={phoneInput}
                                    onChange={(e) => setPhoneInput(e.target.value)}
                                    required 
                                />
                                <div className="main__capcha">
                                    <div className="capcha__row">
                                        {/* Заглушка для капчи, в реальности будет fetch к бэку */}
                                        <img src="/img/button.svg" alt="" />
                                    </div>
                                </div>
                                <button type="submit" className="main__button">Войти</button>
                            </form>
                        </section>
                    )}

                    {/* Если залогинен - список заказов */}
                    {user && (
                        <>
                            <div className="profile-header">
                                <h1 className="main__title">Мои посылки</h1>
                                <button onClick={() => localStorage.removeItem('user_phone')} style={{marginRight:'20px'}}>Выйти</button>
                            </div>

                            <section className="main__track">
                                <h2 className="track__title">Отследить заказ</h2>
                                <div className="track__data-list">
                                    {parcels.length === 0 ? (
                                        <p>Пока нет заказов</p>
                                    ) : parcels.map(parcel => (
                                        <div key={parcel.id} className="track__data-block">
                                            <div className="data__text">Номер: {parcel.tracking_number}</div>
                                            <div className="data__text" style={{color:'green'}}>Статус: {parcel.status.toUpperCase()}</div>
                                            <div className="data__text">{new Date(parcel.created_at).toLocaleDateString()}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Табы (Активные/Завершенные) */}
                            <section className="main__trackable">
                                <h2 className="trackable__title">Фильтр</h2>
                                <div className="trackable__buttons">
                                    <button
                                        className={`button ${activeTab === "actives" ? "button-active" : ""}`}
                                        onClick={() => setActiveTab("actives")}
                                    >
                                        Активные
                                    </button>
                                    <button
                                        className={`button ${activeTab === "complete" ? "button-active" : ""}`}
                                        onClick={() => setActiveTab("complete")}
                                    >
                                        Завершенные
                                    </button>
                                </div>
                            </section>

                            <Info />
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
