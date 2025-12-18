import React, { useState } from 'react';
import './profile.scss';
import { Link } from 'react-router-dom';
import Info from '../../components/info.jsx';

export default function Profile() {
    const [active, setActive] = useState("actives");

    return (
        <div className="profile-page">
            <main className="main">
                <div className="main__container container">
                    <h1 className="main__title">Мои посылки</h1>

                    <section className="main__track">
                        <h2 className="track__title">Отследить заказ</h2>
                        <div className="track__input">
                            <input type="text" placeholder='Номер заказа' />
                            <img src="/img/search.svg" alt="Поиск" />
                        </div>
                        <div className="track__data">
                            <div className="data__text">Заказ номер: 121212</div>
                            <div className="data__text">Состояние: Отправлен</div>
                            <div className="data__text">Дата: 06.04.2025</div>
                        </div>
                    </section>

                    <section className="main__trackable">
                        <h2 className="trackable__title">Отслеживаемые</h2>
                        <div className="trackable__buttons">
                            <button
                                className={`button ${active === "actives" ? "button-active" : ""}`}
                                onClick={() => setActive("actives")}
                            >
                                Активные
                            </button>
                            <button
                                className={`button ${active === "complete" ? "button-active" : ""}`}
                                onClick={() => setActive("complete")}
                            >
                                Завершенные
                            </button>
                        </div>
                    </section>

                    <div className="main__data">
                        <div className="data__block">
                            <div className="data__text">Заказ номер: 121212</div>
                            <div className="data__text">Состояние: Отправлен</div>
                            <div className="data__text">Дата: 06.04.2025</div>
                        </div>
                        <div className="data__block">
                            <div className="data__text">Заказ номер: 121212</div>
                            <div className="data__text">Состояние: Отправлен</div>
                            <div className="data__text">Дата: 06.04.2025</div>
                        </div>
                    </div>

                    <Info />
                </div>
            </main>
        </div>
    );
}