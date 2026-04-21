import React, { useState, useEffect } from 'react';
import axios from 'axios';


const API_URL = 'http://localhost:3001/api';

export default function Admin() {
    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        loadAllOrders();
    }, []);

    const loadAllOrders = async () => {
        try {
            const response = await axios.get(`${API_URL}/admin/parcels`);
            setOrders(response.data);
        } catch (e) {
            console.error(e);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.patch(`${API_URL}/admin/parcels/${id}`, { status: newStatus });
            alert(`Статус заказа ${id} изменен на ${newStatus}`);
            loadAllOrders(); // Обновить список
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="admin-page">
            <main className="main">
                <div className="main__container container">
                    <h1 className="main__title">Админ-панель</h1>
                    
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Трек-номер</th>
                                <th>Отправитель</th>
                                <th>Получатель</th>
                                <th>Статус</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.tracking_number}</td>
                                    <td>{order.sender_phone}</td>
                                    <td>{order.receiver_name} ({order.receiver_address.substring(0, 20)}...)</td>
                                    <td>
                                        <select 
                                            value={order.status}
                                            onChange={(e) => updateStatus(order.id, e.target.value)}
                                        >
                                            <option value="created">Создан</option>
                                            <option value="processing">В работе</option>
                                            <option value="shipped">Отправлен</option>
                                            <option value="delivered">Доставлен</option>
                                        </select>
                                    </td>
                                    <td><button onClick={() => loadAllOrders()}>Обновить</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
