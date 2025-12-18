
import React from 'react';
import { Link } from 'react-router-dom';
import './individuals.scss';

export default function IndividualsContent() {
    return (
        <div className="individuals-page">
            <main className="main">
                <div className="main__container container">
                    <h1 className="main__title">Доставка для частных лиц</h1>
                    <section className="calculator-section">
                        <h2 className="section__title">Рассчитать доставку</h2>
                        <p className="section__description">
                            Узнайте стоимость и сроки доставки вашего отправления всего за пару кликов.
                        </p>
                        <form className="calculator-form">
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Откуда"
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Куда"
                                    className="form-input"
                                />
                            </div>
                            <Link to="/post" className="calculate-btn">
                                РАССЧИТАТЬ
                            </Link>
                        </form>
                    </section>
                    <section className="actions-section">
                        <h2 className="section__title">Быстрые действия</h2>
                        <div className="actions-grid">
                            <div className="action-card">
                                <div className="action-icon">📍</div>
                                <h3>Отследить посылку</h3>
                                <p>Введите номер заказа и узнайте текущее местоположение вашей посылки.</p>
                                <Link to="/track" className="action-link">Отследить →</Link>
                            </div>
                            <div className="action-card">
                                <div className="action-icon">👤</div>
                                <h3>Войти в профиль</h3>
                                <p>Управляйте своими заказами, адресами и настройками в личном кабинете.</p>
                                <Link to="/login" className="action-link">Войти →</Link>
                            </div>
                        </div>
                    </section>
                    <section className="how-it-works-section">
                        <h2 className="section__title">Как это работает</h2>
                        <div className="steps-container">
                            <div className="step-item">
                                <div className="step-number">1</div>
                                <div>
                                    <h3>Рассчитайте стоимость</h3>
                                    <p>Укажите пункты отправки и назначения, чтобы получить точный расчет.</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-number">2</div>
                                <div>
                                    <h3>Оформите заказ</h3>
                                    <p>Перейдите в личный кабинет и создайте заявку на доставку.</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-number">3</div>
                                <div>
                                    <h3>Передайте посылку</h3>
                                    <p>Привезите посылку в ближайший пункт выдачи или вызовите курьера.</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-number">4</div>
                                <div>
                                    <h3>Отслеживайте и получайте</h3>
                                    <p>Следите за перемещением посылки и получите её в удобном месте.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="faq-section">
                        <h2 className="section__title">Часто задаваемые вопросы</h2>
                        <div className="faq-list">
                            <div className="faq-item">
                                <h3>Сколько времени занимает доставка?</h3>
                                <p>Сроки доставки зависят от расстояния и выбранного тарифа. В среднем — от 1 до 5 дней.</p>
                            </div>
                            <div className="faq-item">
                                <h3>Можно ли отправить хрупкий груз?</h3>
                                <p>Да, мы предлагаем специальную упаковку и страхование для хрупких предметов.</p>
                            </div>
                            <div className="faq-item">
                                <h3>Как оплатить доставку?</h3>
                                <p>Оплата возможна онлайн, при передаче посылки или по счету для юр. лиц.</p>
                            </div>
                            <div className="faq-item">
                                <h3>Что делать, если посылка не пришла?</h3>
                                <p>Обратитесь в службу поддержки через чат или по телефону — мы поможем найти вашу посылку.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}