import React from 'react'
import './mobilemenu.scss'
import { Link } from 'react-router-dom'

export default function Mobilemenu({ onClose }) {
    return (
        <div className="mobile-menu">
            <div className="mobile-menu__overlay" onClick={onClose} />

            <div className="mobile-menu__content">
                <div className="mobile-menu__header">
                    <Link to="/individuals" onClick={onClose}>
                        <img src="/img/logo.svg" alt="logo" />
                    </Link>
                    <button className="mobile-menu__close" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="mobile-menu__auth">
                    <Link className="auth-btn" to ="/login">Войти</Link>
                    <Link className="auth-btn" to ="/login">Регистрация</Link>
                </div>

                <div className="mobile-menu__section">
                    <Link className="section__title" to="/">Частным лицам</Link>
                    <Link className="section__item" to="/track">Отследить посылку</Link>
                    <Link className="section__item" to="/post">Отправить посылку</Link>
                </div>

                <div className="mobile-menu__section">
                    <Link className="section__title" to="/company">Юридическим лицам</Link>
                    <Link className="section__item" to="/track">Отследить отправление</Link>
                    <Link className="section__item" to="/pricecomm">Тарифы</Link>
                </div>
            </div>
        </div>
    )
}
