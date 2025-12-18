import React, { useState } from 'react'
import './pricecomm.scss'

export default function PriceComm() {
    const [activeFilter, setActiveFilter] = useState('all')

    return (
        <div className="price-page">
            <main className="main">
                <div className="main__container container">
                    <div className="main__title">
                        Тарифы для юр.лиц
                    </div>
                    <div className="main__buttons">
                        <div
                            className={`button ${activeFilter === 'all' ? 'button-active' : ''}`}
                            onClick={() => setActiveFilter('all')}
                        >
                            Все тарифы
                        </div>

                        <div
                            className={`button ${activeFilter === 'big' ? 'button-active' : ''}`}
                            onClick={() => setActiveFilter('big')}
                        >
                            Большой вес
                        </div>

                        <div
                            className={`button ${activeFilter === 'fast' ? 'button-active' : ''}`}
                            onClick={() => setActiveFilter('fast')}
                        >
                            Быстрая доставка
                        </div>
                    </div>
                    <div className={`main__info filter-${activeFilter}`}>
                        <div className="info__element fast">
                            <div className="element__column">
                                <div className="column__title">Экспресс</div>
                                <div className="column__text-big">
                                    Экспресс-доставка документов и грузов
                                </div>
                            </div>
                            <div className="element__column">
                                <div className="column__text">до 15 кг</div>
                                <div className="column__text">от 1 дня</div>
                            </div>
                        </div>

                        <div className="info__element big">
                            <div className="element__column">
                                <div className="column__title">Крупная доставка</div>
                                <div className="column__text-big">
                                    Доставка больших грузов, с доплатой за каждый кг свыше 40
                                </div>
                            </div>
                            <div className="element__column">
                                
                                <div className="column__text">от 1 дня</div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}