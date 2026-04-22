import React, { useEffect, useState } from 'react';
import './profile.scss'
import Info from '../../components/info.jsx'

export default function Profile() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const userPhone = localStorage.getItem('userPhone'); 

    useEffect(() => {
    const fetchOrders = async () => {
        const phone = localStorage.getItem('userPhone');

        const res = await fetch(`http://localhost:3001/api/parcels/user/${phone}`);
        const data = await res.json();

        setOrders(data);
        setLoading(false);
    };

    fetchOrders();
}, []);


    return (
        <div className="profile-page">
            <main className="main">
                <div className="main__container container">
                    <h1 className="main__title">Мои посылки</h1>

                    {loading && <div className="data__text">Загрузка ваших заказов...</div>}
                    {error && <div className="data__text" style={{ color: 'red' }}>{error}</div>}

                    {!loading && orders.length === 0 && (
                        <div className="data__text">У вас пока нет оформленных заказов.</div>
                    )}

                    {orders.map((order) => (
                        <div key={order.id} className="main__track" style={{ marginBottom: '15px' }}>
                            <div className="track__title">Заказ {order.tracking_number}</div>
                            <div className="track__data">
                                <div className="data__text"><strong>Статус:</strong> {order.status}</div>
                                <div className="data__text"><strong>Адрес:</strong> {order.delivery_address}</div>
                                <div className="data__text"><strong>Цена:</strong> {order.price} ₽</div>
                                <div className="data__text"><strong>Дата:</strong> {new Date(order.created_at).toLocaleDateString()}</div>
                            </div>
                        </div>
                    ))}

                    <Info />
                </div>
            </main>
        </div>
    );
}
