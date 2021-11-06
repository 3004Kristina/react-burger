import React, {Component} from 'react';
import appHeaderStyles from './app-header.module.css';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';


export default class AppHeader extends Component {
    render(){
        return(
            <header className={`${appHeaderStyles.header} p-5 mb-10`}>
                <div className="container">
                    <div className={appHeaderStyles.header_wrapper}>
                        <nav className={appHeaderStyles.nav_wrapper}>
                            <ul className={appHeaderStyles.nav}>
                                <li>
                                    <a href="#" className="text text_type_main-default mr-10">
                                        <BurgerIcon type="primary" />
                                        <span className="ml-2">Конструктор</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text text_type_main-default text_color_inactive">
                                        <ListIcon type="secondary" />
                                        <span className="ml-2">Лента заказов</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <Logo/>
                        <div>
                            <a href="#" className="text text_type_main-default text_color_inactive">
                                <ProfileIcon type="secondary" />
                                <span className="ml-2">Личный кабинет</span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}