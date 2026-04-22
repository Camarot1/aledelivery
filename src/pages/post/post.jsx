import React, { useState } from 'react';
import './post.scss';
import Info from '../../components/info.jsx';

const PRICE_MAP = {
    'Конверт': 100,
    'Малая коробка': 300,
    'Средняя коробка': 500,
    'Большая коробка': 800
};

export default function Post() {
    const [formData, setFormData] = useState({
        senderPhone: '',
        deliveryAddress: '',
        parcelSize: 'Конверт'
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const price = PRICE_MAP[formData.parcelSize];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('http://localhost:3001/api/parcels', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price
                }),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Ошибка при создании');

            setMessage({
                type: 'success',
                text: `Успех! Ваш трек-номер: ${data.trackingNumber}`
            });

            setFormData({
                senderPhone: '',
                deliveryAddress: '',
                parcelSize: 'Конверт'
            });

        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="post-page">
            <main className="main">
                <div className="main__container container">
                    <h1 className="main__title">Отправить посылку</h1>

                    {message.text && (
                        <div className={`alert ${message.type}`}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="post-form">

                        <input
                            name="senderPhone"
                            type="tel"
                            placeholder="79001234567"
                            value={formData.senderPhone}
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="deliveryAddress"
                            type="text"
                            placeholder="Адрес доставки"
                            value={formData.deliveryAddress}
                            onChange={handleChange}
                            required
                        />

                        <select
                            name="parcelSize"
                            value={formData.parcelSize}
                            onChange={handleChange}
                        >
                            <option value="Конверт">Конверт</option>
                            <option value="Малая коробка">Малая коробка</option>
                            <option value="Средняя коробка">Средняя коробка</option>
                            <option value="Большая коробка">Большая коробка</option>
                        </select>

                        {/* 👇 Показываем цену */}
                        <div style={{ margin: '10px 0', fontWeight: 'bold' }}>
                            Стоимость: {price} ₽
                        </div>

                        <button type="submit" disabled={loading}>
                            {loading ? 'Отправка...' : 'Создать заказ'}
                        </button>

                    </form>

                    <Info />
                </div>
            </main>
        </div>
    );
}