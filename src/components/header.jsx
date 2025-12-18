import React, { useState } from 'react'
import './header.scss'
import { Link } from 'react-router-dom'
import Mobilemenu from './mobilemenu'

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <>
            <header className="header">
                <div className="header__container container">
                    <div className="header__logo">
                        <Link to="/">
                            <img src="/img/logo.svg" alt="logo" />
                        </Link>
                    </div>
                    <div
                        className="header__menu"
                        onClick={() => setMenuOpen(true)}
                    >
                        <img src="/img/menu.svg" alt="menu" />
                    </div>
                </div>
            </header>

            {menuOpen && (
                <Mobilemenu onClose={() => setMenuOpen(false)} />
            )}
        </>
    )
}
