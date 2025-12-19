import React from 'react';
import './404.scss';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="not-found-page">
            <main className="main">
                <div className="main__container container">
                    <div className="main__content">
                        <div className="main__logo">
                            <img src="/img/logo.svg" alt="Логотип" />
                        </div>
                        <h1 className="main__title">404</h1>
                        <p className="main__subtitle">Страница не найдена</p>
                        <p className="main__text">
                            К сожалению, запрашиваемая вами страница не существует.
                        </p>
                        <Link to="/" className="main__button">
                            На главную
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}