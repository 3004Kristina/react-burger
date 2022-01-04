import React from 'react';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import appHeaderStyles from './app-header.module.css';

export default function AppHeader() {
  return (
    <header className={`${appHeaderStyles.header} p-5 mb-10`}>
      <div className="container">
        <div className={appHeaderStyles.header_wrapper}>
          <nav>
            <ul className={appHeaderStyles.nav}>
              <li>
                <NavLink to="/" className={`${appHeaderStyles.nav_link} mr-6`} activeClassName={appHeaderStyles.active}>
                  <BurgerIcon type="primary" />
                  <span className="ml-2">Конструктор</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/orders-list" className="text text_type_main-default text_color_inactive">
                  <ListIcon type="secondary" />
                  <span className="ml-2">Лента заказов</span>
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className={appHeaderStyles.logo}>
            <Logo />
          </div>
          <div>
            <NavLink to="/profile" className={appHeaderStyles.nav_link} activeClassName={appHeaderStyles.active}>
              <ProfileIcon type="secondary" />
              <span className="ml-2">Личный кабинет</span>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
