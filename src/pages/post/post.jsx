import React, { useState } from 'react';
import axios from 'axios';
import Info from '../../components/info.jsx';
import './post.scss';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:3001/api';

export default function Post() {
    const [isSizeOpen, setIsSizeOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    
    // Данные для калькулятора (из твоего старого компонента)
    const packageSizes = [
        { id: 1, name: 'Конверт', price: 50 }, // Упрощенные цены
        { id: 2, name: 'Малая коробка', price: 80 },
        { id: 3, name: 'Средняя коробка', price: 120 },
        { id: 4, name: 'Большая коробка', price: 150 },
    ];

    const [formData, setFormData] = useState({
        from: '',
        to: '',
        trackingNumber: ''
    });

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        setIsSizeOpen(false);
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        if (!selectedSize) return alert('Выберите размер!');

        // Расчет цены (в реальности сложнее, здесь упрощенно: цена тарифа + вес*10)
        const price = selectedSize.price; 

        try {
            // Попытаемся получить телефон из локал стора
            const phone = localStorage.getItem('user_phone');
            
            if (!phone) return alert("Вы не авторизованы. Пожалуйста, войдите в профиль.");

            await axios.post(`${API_URL}/parcels/create`, {
                phone, // Отправитель
                trackingNumber: formData.trackingNumber || null,
                receiverName: "Иван Иванов", // В реальности будет поле ввода
                receiverAddress: formData.to + ", ул. Пушкина 10",
                weight: 2.5, 
                sizeId: selectedSize.id,
                price: price
            });

            alert(`Заказ оформлен! Трек-номер: ${selectedSize.name}`);
            
            // Редирект в профиль (или главную)
            window.location.href = '/profile';
        } catch (error) {
            console.error(error);
            alert("Ошибка создания заказа");
        }
    };

    return (
        <div className="post-page">
            <main className="main">
                <div className="main__container container">
                    <div className="main__title">Отправить посылку</div>

                    <form onSubmit={handleSubmitOrder} className="calculator-form">
                        <div className="form-group">
                            <input type="text" placeholder="Телефон отправителя" className="form-input" required />
                        </div>
                        <div className="form-group">
                            <input type="text" placeholder="Куда (Адрес)" className="form-input" 
                                value={formData.to} onChange={(e) => setFormData({...formData, to: e.target.value})}
                            />
                        </div>
                        
                        {/* Калькулятор */}
                        <div className="calculator__size-selector">
                            <div
                                className={`size-selector__header ${isSizeOpen ? 'open' : ''}`}
                                onClick={() => setIsSizeOpen(!isSizeOpen)}
                            >
                                <span>Размер посылки</span>
                                {/* SVG стрелка */}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                            </div>

                            {isSizeOpen && (
                                <div className="size-selector__list">
                                    {packageSizes.map((size) => (
                                        <div
                                            key={size.id}
                                            className={`size-selector__item ${selectedSize?.id === size.id ? 'selected' : ''}`}
                                            onClick={() => handleSizeSelect(size)}
                                        >
                                            <div className="item__name">{size.name}</div>
                                            <div className="item__price">Цена: {size.price} ₽</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button type="submit" className="calculator__submit-btn">Оформить заказ</button>
                    </form>

                    <Info />
                </div>
            </main>
        </div>
    );
}
