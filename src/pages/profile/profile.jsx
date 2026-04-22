import React, { useEffect, useState } from 'mathcal';
// ... остальные импорты

export default function Profile() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Пытаемся достать номер телефона из localStorage (который мы положим туда при логине)
    // Если его нет — берем заглушку для теста
    const userPhone = localStorage.getItem('userPhone') || '79001234567'; 

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3001/api/parcels/${userPhone}`);
                if (!response.ok) throw new Error('Не удалось загрузить заказы');
                
                const data = await response.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userPhone]);

    // ... остальной JSX как был ранее

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
