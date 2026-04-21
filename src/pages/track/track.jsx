import React, { useState } from 'react';
import './track.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';


import Info from '../../components/info.jsx'; 

const API_URL = 'http://localhost:3001/api';

export default function Track() {
    const [trackInput, setTrackInput] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [orderData, setOrderData] = useState(null); // Здесь будет данные найденного заказа

    // Функция поиска заказа
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!trackInput.trim()) return;

        setIsSearching(true);
        setOrderData(null); // Очищаем старые данные перед поиском

        try {
            // Ищем по трекинговому номеру (например: PAR123456)
            const response = await axios.get(`${API_URL}/parcels/search`, {
                params: { tracking_number: trackInput }
            });

            if (response.data.length === 0) {
                alert('Заказ с таким номером не найден!');
            } else {
                setOrderData(response.data[0]); // Берем первый попавшийся заказ
            }
        } catch (error) {
            console.error("Ошибка поиска:", error.response?.data || error.message);
            if (error.response && error.response.status === 400) {
                alert(error.response.data.error || 'Неверный формат номера');
            } else {
                alert('Ошибка соединения с сервером');
            }
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="track-page">
            <main className="main">
                <div className="main__container container">
                    <div className="main__heading">
                        <div className="heading__title">Отслеживание отправки</div>
                        <div className="heading__text">
                            Вы можете посмотреть историю заказов в вашем{' '}
                            <span className="span"><Link to="/profile">личном кабинете</Link></span>,
                            но здесь мы можем проверить статус по номеру.
                        </div>
                    </div>

                    {/* Блок поиска */}
                    <div className="main__track">
                        <div className="track__title">Отследить заказ</div>
                        
                        <form onSubmit={handleSearch} className="search-form">
                            <div className="track__input-wrapper">
                                <input 
                                    type="text" 
                                    placeholder='Введите трек-номер (например: PAR123456)'
                                    className="track__input-search"
                                    value={trackInput}
                                    onChange={(e) => setTrackInput(e.target.value)}
                                    disabled={isSearching}
                                />
                                <img src="/img/search.svg" alt="Поиск" className={`search-icon ${isSearching ? 'spinning' : ''}`} />
                            </div>

                            {/* Результат поиска (показывается, если заказ найден) */}
                            {orderData && (
                                <div className="track__data-card">
                                    <div className="data__status-block">
                                        <div className="data__text status-title">Статус: <span style={{color: 'green'}}>{orderData.status.toUpperCase()}</span></div>
                                        <div className="data__text">Номер заказа: {orderData.tracking_number}</div>
                                        <div className="data__text">Дата создания: {new Date(orderData.created_at).toLocaleString()}</div>
                                    </div>

                                    {/* Дополнительные детали, если они есть */}
                                    <div className="data__details-block">
                                        <div className="data__text">Отправитель: {orderData.sender_phone || 'Не указано'}</div>
                                        <div className="data__text">Размер: {' '}
                                            {['Конверт', 'Малая коробка', 'Средняя коробка', 'Большая коробка'][orderData.size_id - 1] || orderData.size_id}
                                        </div>
                                    </div>

                                    <Link to={`/profile`} className="track__link">Перейти в профиль</Link>
                                </div>
                            )}

                            {/* Заглушка, если ничего не найдено */}
                            {!orderData && !isSearching && (
                                <div className="track__data-placeholder">
                                    <div className="data__text">Заказ номер: -</div>
                                    <div className="data__text">Состояние: Ждем ввод номера</div>
                                </div>
                            )}
                        </form>
                    </div>

                    <Info />
                </div>
            </main>
        </div>
    );
}
