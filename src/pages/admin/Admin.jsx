import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './admin.scss'
const API_URL = 'http://localhost:3001/api';
export default function Admin() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        loadAllOrders();
        loadRequests();
    }, []);
    const loadAllOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/admin/orders`);
            setOrders(response.data);
        } catch (e) {
            console.error("Ошибка загрузки заказов:", e);
        } finally {
            setLoading(false);
        }
    };
    const loadRequests = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/company-requests`);
            setRequests(response.data);
        } catch (e) {
            console.error("Ошибка загрузки заявок:", e);
        }
    };
    const updateStatus = async (id, status) => {
        await axios.patch(`http://localhost:3001/api/admin/orders/${id}`, {
            status
        });
        loadAllOrders();
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
                                                {/* не менять значения, в бд возможны только 3 варианта */}
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
                    <h2 style={{ marginTop: '40px' }}>Заявки от компаний</h2>

                    {requests.length === 0 ? (
                        <p>Заявок пока нет.</p>
                    ) : (
                        <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>
                                    <th>ID</th>
                                    <th>Компания</th>
                                    <th>Имя</th>
                                    <th>Телефон</th>
                                    <th>Email</th>
                                    <th>Дата</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map(req => (
                                    <tr key={req.id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td>{req.id}</td>
                                        <td>{req.company_name}</td>
                                        <td>{req.contact_name}</td>
                                        <td>{req.phone}</td>
                                        <td>{req.email}</td>
                                        <td>{new Date(req.created_at).toLocaleDateString()}</td>
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