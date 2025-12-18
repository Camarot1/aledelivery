import React from 'react';
import './code.scss';
import { Link } from 'react-router-dom';

export default function Code() {
    return (
        <div className="code-page">
            <main className="main">
                <div className="main__container container">
                    <div className="main__logo">
                        <img src="/img/logo.svg" alt="Логотип" />
                    </div>
                    <h1 className="main__title">Войдите в аккаунт</h1>
                    <p className="main__text">Введите код из SMS в поле ниже</p>
                    <input className="main__input" type="text" placeholder="000000" />
                    <Link className="main__button" to="/profile">Подтвердить код</Link>
                </div>
            </main>
        </div>
    );
}