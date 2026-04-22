import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export default function Admin() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        loadAllOrders();
    }, []);

    const loadAllOrders = async () => {
        try {
            setLoading(true);
            // Проверь, чтобы путь совпадал с бэкендом!
            const response = await axios.get(`${API_URL}/admin/all-orders`);
            setOrders(response.data);
        } catch (e) {
            console.error("Ошибка загрузки заказов:", e);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            // Отправляем новый статус на бэкенд
            await axios.patch(`${API_URL}/admin/parcels/${id}, { status: newStatus }`);
            alert(`Статус заказа ${id} изменен на ${newStatus}`);
            loadAllOrders(); 
        } catch (e) {
            console.error("Ошибка обновления статуса:", e);
            alert("Не удалось обновить статус");
        }
    };

    if (loading) return <div className="container">Загрузка заказов...</div>;

    return (
        <div className="admin-page">
            <main className="main">
                <div className="main__container container">
                    <h1 className="main__title">Админ-панель</h1>
                    
                    {orders.length === 0 ? (
                        <p>Заказов пока нет.</p>
                    ) : (
                        <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>
                                    <th>ID</th>
                                    <th>Трек-номер</th>
                                    <th>Телефон</th>
                                    <th>Адрес доставки</th>
                                    <th>Статус</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td>{order.id}</td>
                                        <td><strong>{order.tracking_number}</strong></td>
                                        <td>{order.sender_phone}</td>
                                        <td>{order.delivery_address}</td>
                                        <td>
                                            <select 
                                                value={order.status}
                                                onChange={(e) => updateStatus(order.id, e.target.value)}
                                                style={{ padding: '5px', borderRadius: '4px' }}
                                            >
                                                {/* Важно: значения должны совпадать с ENUM в БД! */}
                                                <option value="ожидает">Ожидает</option>
                                                <option value="отправлено">Отправлено</option>
                                                <option value="доставлено">Доставлено</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button onClick={loadAllOrders} style={{ cursor: 'pointer' }}>Обновить</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    );
}