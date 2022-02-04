import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from '../services/hooks';
import profileStyles from './profile.module.css';
import { logout } from '../api/apiClient';
import { LOGOUT_USER } from '../services/actions/get-user-info';
import { deleteCookie } from '../utils/cookie';
import FeedList from '../components/feed/feed-list';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START_PROFILE,
} from '../services/actions/ws-orders';

export default function Orders() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_PROFILE });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED })
    }
  }, []);

  function handleLogout() {
    logout()
      .finally(() => {
        deleteCookie('refreshToken');
        deleteCookie('accessToken');
        dispatch({
          type: LOGOUT_USER,
        });
        history.replace({ pathname: '/login' });
      });
  }

  return (
    <div className={profileStyles.profile_wrapper}>
      <div className={profileStyles.profile_link_wrapper}>
        <NavLink
          to="/profile"
          className="text text_type_main-medium text_color_inactive pt-6 pb-6"
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          activeClassName={profileStyles.activeLink}
          className="text text_type_main-medium text_color_inactive pt-6 pb-6"
        >
          История заказов
        </NavLink>
        <button
          type="button"
          onClick={handleLogout}
          className={`${profileStyles.cancel_btn} text text_type_main-medium text_color_inactive pt-6 pb-6 mb-20`}
        >
          Выход
        </button>
        <div className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете
          {' '}
          <br />
          просмотреть свою историю заказов
        </div>
      </div>
      <FeedList
        profile
      />
    </div>
  );
}
