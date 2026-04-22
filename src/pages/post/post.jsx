import React, { useState } from 'react';
import './post.scss';
import Info from '../../components/info.jsx';

export default function Post() {
    const [formData, setFormData] = useState({
        senderPhone: '',
        deliveryAddress: '',
        price: '',
        parcelSize: 'Конверт' // Значение по умолчанию
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('http://localhost:3001/api/parcels', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Ошибка при создании');

            setMessage({ type: 'success', text: `Успех! Ваш трек-номер: ${data.trackingNumber}` });
            setFormData({ senderPhone: '', deliveryAddress: '', price: '', parcelSize: 'Конверт' });
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
                        <div className={`alert ${message.type}`} style={{ 
                            padding: '15px', 
                            borderRadius: '8px', 
                            backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
                            color: message.type === 'success' ? '#155724' : '#721c24',
                            marginBottom: '20px',
                            textAlign: 'center'
                        }}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="post-form">
                        <div className="form-group">
                            <label>Ваш телефон</label>
                            <input
                                name="senderPhone"
                                type="tel"
                                placeholder="79001234567"
                                value={formData.senderPhone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Адрес доставки</label>
                            <input
                                name="deliveryAddress"
                                type="text"
                                placeholder="г. Москва, ул. Ленина, д. 1"
                                value={formData.deliveryAddress}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Стоимость доставки (₽)</label>
                            <input
                                name="price"
                                type="number"
                                placeholder="500"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Размер посылки</label>
                            <select name="parcelSize" value={formData.parcel_size} onChange={handleChange}>
                                <option value="Конверт">Конверт</option>
                                <option value="Малая коробка">Маленно коробочка</option>
                                <option value="Средняя коробка">Средняя коробка</option>
                                <option value="Большая коробка">Большая коробка</option>
                            </select>
                        </div>

                        <button type="submit" className="main__button" disabled={loading}>
                            {loading ? 'Отправка...' : 'Рассчитать и создать заказ'}
                        </button>
                    </form>
                    <Info />
                </div>
            </main>
        </div>
    );
}
