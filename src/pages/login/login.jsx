import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';

export default function Login() {
    const navigate = useNavigate();
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({ code: '+7' });

    const countries = [
        { code: '+7' },
        { code: '+375' },
        { code: '+374' },
        { code: '+77' },
    ];

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setIsCountryOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/code');
    };

    return (
        <div className="login-page">
            <main className="main">
                <div className="main__container container">
                    <div className="main__logo">
                        <img src="/img/logo.svg" alt="Логотип" />
                    </div>
                    <h1 className="main__title">Войдите в аккаунт</h1>

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="main__number">
                            <div className="custom-select-wrapper">
                                <div
                                    className="custom-select-trigger"
                                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                                >
                                    <span>{selectedCountry.code}</span>
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3 5L6 8L9 5"
                                            stroke="#9A9A9A"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>

                                {isCountryOpen && (
                                    <ul className="custom-options-list">
                                        {countries.map((country) => (
                                            <li
                                                key={country.code}
                                                onClick={() => handleCountrySelect(country)}
                                                className={
                                                    selectedCountry.code === country.code ? 'option active' : 'option'
                                                }
                                            >
                                                <span>{country.code}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <input
                                className="number__text"
                                type="text"
                                placeholder="000 000 00 00"
                                required
                            />
                        </div>

                        <label className="main__checkbox">
                            <input
                                type="checkbox"
                                className="checkbox"
                            />
                            <span className="checkbox__text">Запомнить меня</span>
                        </label>

                        <div className="main__capcha">
                            <div className="capcha__row">
                                <div className="capcha__img">
                                    <img src="/img/capcha/capcha.svg" alt="CAPTCHA" />
                                </div>
                                <div className="capcha__button">
                                    <img src="/img/button.svg" alt="Обновить" />
                                </div>
                            </div>
                            <input
                                className="capcha__input"
                                type="text"
                                placeholder="Введите текст с картинки"
                                required
                            />
                        </div>

                        <label className="main__terms-agreement">
                            <input
                                type="checkbox"
                                className="checkbox checkbox--agreement"
                                required
                            />
                            <span className="terms-text">
                                Я согласен на обработку персональных данных
                            </span>
                        </label>

                        <button type="submit" className="main__button">
                            Отправить код
                        </button>
                    </form>

                    <div className="main__social">
                        <div className="social__title">Войти через социальные сети</div>
                        <div className="social__img">
                            <img src="/img/vk.svg" alt="ВКонтакте" />
                            <img src="/img/ok.svg" alt="Одноклассники" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}