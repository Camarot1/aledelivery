import React, { useState } from 'react';
import './track.scss';
import Info from '../../components/info.jsx';

export default function Track() {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await fetch(`http://localhost:3001/api/parcels/search?tracking_number=${query}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Заказ не найден');
            }

            setResult(data); // Данные из БД: статус, адрес, цена и т.д.
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="track-page">
            <main className="main">
                <div className="main__container container">
                    <div className="main__heading">
                        <div className="heading__title">Отслеживание отправки</div>
                        <div className="heading__text">
                            Введите номер заказа, чтобы узнать его текущий статус.
                        </div>
                    </div>

                    <form onSubmit={handleSearch} className="main__track">
                        <div className="track__title">Отследить заказ</div>
                        <div className="track__input">
                            <input 
                                type="text" 
                                placeholder="Введите трек-номер (например: PARXXXXXX)" 
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                required
                            />
                            <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                <img src="/img/search.svg" alt="Поиск" />
                            </button>
                        </div>

                        {loading && <div className="data__text">Ищем...</div>}
                        {error && <div className="data__text" style={{ color: 'red' }}>{error}</div>}

                        {result && (
                            <div className="track__data">
                                <div className="data__text"><strong>Заказ №:</strong> {result.tracking_number}</div>
                                <div className="data__text"><strong>Статус:</strong> {result.status}</div>
                                <div className="data__text"><strong>Адрес доставки:</strong> {result.delivery_address}</div>
                                <div className="data__text"><strong>Цена:</strong> {result.price} ₽</div>
                                <div className="data__text"><strong>Дата создания:</strong> {new Date(result.created_at).toLocaleDateString()}</div>
                            </div>
                        )}
                    </form>
                    <Info />
                </div>
            </main>
        </div>
    );
}
