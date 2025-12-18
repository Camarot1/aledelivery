import React from 'react';
import './footer.scss'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container container">
                <div className="footer__block">
                    <div className="block__text">
                        <div className="text__title">Дополнительно</div>
                        <ul className="text__ul">
                            <a href=""><li class="element">
                                Контакты
                            </li></a>
                            <a href=""><li class="element">
                                Горячая линяя
                            </li></a>
                        </ul>
                    </div>
                    <div className="block__text">
                        <div className="text__title">Соглашения</div>
                        <ul className="text__ul">
                            <a href=""><li class="element">
                                Правила приёма и отправки
                            </li></a>
                            <a href=""><li class="element">
                                Оферта
                            </li></a>
                            <a href=""><li class="element">
                                Пользовательское соглашение
                            </li></a>
                        </ul>
                    </div>
                    <div className="block__text">
                        <div className="text__title">Поддержка</div>
                        <ul className="text__ul">
                            <a href=""><li class="element">
                                Частые вопросы
                            </li></a>
                        </ul>
                    </div>
                </div>
                <div className="footer__info">
                    © 2006 - 2025 Все права защищены.
                </div>
            </div>
        </footer>
    )
}