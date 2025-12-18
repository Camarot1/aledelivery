import React from 'react'
import './info.scss'
import { useState } from "react";

export default function Info() {
    const [active, setActive] = useState("legal");

    return (
        <div className="info__block">
            <div className="block__title">
                Документы для получения заказа
            </div>

            <div className="block__buttons">
                <button
                    className={`buttons__elem ${active === "legal" ? "button-active" : ""}`}
                    onClick={() => setActive("legal")}
                >
                    Юридическим лицам
                </button>

                <button
                    className={`buttons__elem ${active === "physical" ? "button-active" : ""}`}
                    onClick={() => setActive("physical")}
                >
                    Физическим лицам
                </button>
            </div>

            <div className="block__text">
                {active === "legal" && (
                    <div className="text text-active">
                        Доверенность от организации (оригинал-для одноразовой доверенности,
                        копия/оригинал для многоразовой доверенности) и документ,
                        удостоверяющий личность Представителя организации
                    </div>
                )}

                {active === "physical" && (
                    <div className="text text-active">
                        Документы, удостоверяющие личность на территории РФ для граждан •
                        Паспорт гражданина РФ • Удостоверение личности военнослужащего РФ •
                        Военный билет солдата, матроса, сержанта, старшины, прапорщика,
                        мичмана и офицера запаса • Временное удостоверение личности
                        гражданина РФ (форма N 2П)
                    </div>
                )}
            </div>
        </div>
    );
}