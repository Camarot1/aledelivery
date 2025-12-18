import React from 'react'
import './track.scss'
import {Link} from 'react-router-dom'
import Info from '../../components/info.jsx';

export default function Track(){
    return(
        <div className="track-page">
            <main className="main">
                <div className="main__container container">
                    <div className="main__heading">
                        <div className="heading__title">
                            Отслеживание отправки
                        </div>
                        <div className="heading__text">
                            Вы можете посмотреть историю заказов в вашем <span className="span">личном кабинете</span>
                        </div>
                    </div>
                    <div className="main__track">
                        <div className="track__title">Отследить заказ</div>
                        <div className="track__input">
                            <input type="text"  placeholder='Номер заказа'/>
                            <img src="/img/search.svg" alt="" />
                        </div>
                        <div className="track__data">
                            <div className="data__text">Заказ номер: 121212</div>
                            <div className="data__text">Состояние: Отправлен</div>
                            <div className="data__text">Дата: 06.04.2025</div>
                        </div>
                    </div>
                    <Info />
                </div>
            </main>
        </div>
    )
}