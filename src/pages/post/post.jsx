import React, { useState } from 'react';
import './post.scss';
import Info from '../../components/info.jsx';
export default function Post() {
    const [isSizeOpen, setIsSizeOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);

    const packageSizes = [
        { id: 1, name: 'Конверт', dimensions: '32x27x2 см, до 0.5кг' },
        { id: 2, name: 'Малая коробка', dimensions: '40x30x20 см, до 5кг' },
        { id: 3, name: 'Средняя коробка', dimensions: '60x40x30 см, до 10кг' },
        { id: 4, name: 'Большая коробка', dimensions: '80x50x40 см, до 20кг' },
    ];

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        setIsSizeOpen(false);
    };

    return (
        <div className="post-page">
            <main className="main">
                <div className="main__container container">
                    <div className="main__title">Отправить посылку</div>

                    <div className="main__calculator">
                        <div className="calculator__title">Рассчитать доставку</div>

                        <div className="calculator__input-group">
                            <input
                                type="text"
                                placeholder="Откуда"
                                className="input-field"
                            />
                            <input
                                type="text"
                                placeholder="Куда"
                                className="input-field"
                            />
                        </div>

                        <div className="calculator__size-selector">
                            <div
                                className={`size-selector__header ${isSizeOpen ? 'open' : ''}`}
                                onClick={() => setIsSizeOpen(!isSizeOpen)}
                            >
                                <span>Размер посылки</span>
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </div>

                            {isSizeOpen && (
                                <div className="size-selector__list">
                                    {packageSizes.map((size) => (
                                        <div
                                            key={size.id}
                                            className={`size-selector__item ${
                                                selectedSize?.id === size.id ? 'selected' : ''
                                            }`}
                                            onClick={() => handleSizeSelect(size)}
                                        >
                                            <div className="item__name">{size.name}</div>
                                            <div className="item__dimensions">{size.dimensions}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button className="calculator__submit-btn">Рассчитать</button>
                    </div>
                    <Info />
                </div>
            </main>
        </div>
    );
}