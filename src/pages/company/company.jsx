import React, { useState } from 'react';
import './company.scss';

export default function Company() {
    const [formData, setFormData] = useState({
        companyName: '',
        contactName: '',
        phone: '',
        email: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const res = await fetch('http://localhost:3001/api/company-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Ошибка отправки');
            }

            setMessage('Заявка отправлена! Мы скоро свяжемся с вами.');

            setFormData({
                companyName: '',
                contactName: '',
                phone: '',
                email: ''
            });

        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <div className="company-page">
            <main className="main">
                <div className="main__container container">

                    <h1 className="main__title">Решения для бизнеса</h1>

                    <section className="company-section">
                        <h2 className="section__title">Подключите компанию к нашей системе</h2>
                        <p className="section__description">
                            Станьте нашим клиентом и получайте специальные тарифы, персонального менеджера и полный контроль над вашими отправлениями.
                        </p>
                        
                        <div className="benefits-grid">
                            <div className="benefit-card">
                                <div className="benefit-icon">📊</div>
                                <h3 className="benefit-title">Прозрачный учёт</h3>
                                <p className="benefit-text">Все отправления в одном личном кабинете с детальной статистикой и отчётностью.</p>
                            </div>
                            <div className="benefit-card">
                                <div className="benefit-icon">💼</div>
                                <h3 className="benefit-title">Персональный менеджер</h3>
                                <p className="benefit-text">Ваш персональный помощник для решения любых вопросов 24/7.</p>
                            </div>
                            <div className="benefit-card">
                                <div className="benefit-icon">💰</div>
                                <h3 className="benefit-title">Выгодные тарифы</h3>
                                <p className="benefit-text">Специальные условия и скидки для юридических лиц и постоянных клиентов.</p>
                            </div>
                            <div className="benefit-card">
                                <div className="benefit-icon">⚡</div>
                                <h3 className="benefit-title">Интеграция API</h3>
                                <p className="benefit-text">Полная автоматизация процессов через удобное API-подключение.</p>
                            </div>
                        </div>

                        <button className="primary-btn">Подключить компанию</button>
                    </section>
                    <section className="audience-section">
                        <h2 className="section__title">Для кого наши решения</h2>
                        <div className="audience-list">
                            <div className="audience-item">
                                <h3>Интернет-магазины</h3>
                                <p>Быстрая и надёжная доставка заказов по всей стране с возможностью интеграции в вашу систему.</p>
                            </div>
                            <div className="audience-item">
                                <h3>Производственные компании</h3>
                                <p>Доставка крупногабаритных грузов, партий товаров и комплектующих с фиксированными тарифами.</p>
                            </div>
                            <div className="audience-item">
                                <h3>Дистрибьюторы</h3>
                                <p>Логистическое сопровождение поставок в регионы с отслеживанием в реальном времени.</p>
                            </div>
                            <div className="audience-item">
                                <h3>Корпоративные клиенты</h3>
                                <p>Доставка корреспонденции, документов и внутренних отправлений между офисами.</p>
                            </div>
                        </div>
                    </section>

                    <section className="how-to-section">
                        <h2 className="section__title">Как подключиться</h2>
                        <div className="steps-container">
                            <div className="step-item">
                                <div className="step-number">1</div>
                                <div>
                                    <h3>Оставьте заявку</h3>
                                    <p>Заполните форму или позвоните нам</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-number">2</div>
                                <div>
                                    <h3>Обсудите условия</h3>
                                    <p>Наш менеджер свяжется с вами и предложит оптимальные решения</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-number">3</div>
                                <div>
                                    <h3>Подключитесь</h3>
                                    <p>Подпишите договор и получите доступ к личному кабинету</p>
                                </div>
                            </div>
                            <div className="step-item">
                                <div className="step-number">4</div>
                                <div>
                                    <h3>Начните отправлять</h3>
                                    <p>Оформляйте заказы и управляйте доставкой онлайн</p>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="contact-section">
                        <h2 className="section__title">Готовы начать?</h2>
                        <p className="contact-text">
                            Оставьте заявку, и наш специалист свяжется с вами в течение 15 минут.
                        </p>

                        {message && (
                            <div style={{ marginBottom: '10px', color: 'green' }}>
                                {message}
                            </div>
                        )}

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <input
                                    name="companyName"
                                    type="text"
                                    placeholder="Название компании"
                                    className="form-input"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    name="contactName"
                                    type="text"
                                    placeholder="Ваше имя"
                                    className="form-input"
                                    value={formData.contactName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <input
                                    name="phone"
                                    type="tel"
                                    placeholder="Телефон"
                                    className="form-input"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="primary-btn">
                                Отправить заявку
                            </button>
                        </form>
                    </section>

                </div>
            </main>
        </div>
    );
}