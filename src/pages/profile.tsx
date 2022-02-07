import React from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from '../services/hooks';
import profileStyles from './profile.module.css';
import { logout } from '../api/apiClient';
import { LOGOUT_USER, updateUser } from '../services/actions/get-user-info';
import { deleteCookie } from '../utils/cookie';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, error } = useSelector((store) => ({
    user: store.getUserData.user,
    error: store.getUserData.error,
  }));
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState(user?.email || '');
  const [userName, setUserName] = React.useState(user?.name || '');
  const inputRef = React.useRef(null);

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(updateUser({
      name: userName,
      email,
    }));
  }

  function handleReset() {
    setEmail(user?.email || '');
    setUserName(user?.name || '');
    setPassword('');
  }

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
          activeClassName={profileStyles.activeLink}
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
          изменить свои персональные данные
        </div>
      </div>
      <form onSubmit={handleSave}>
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Имя"
            onChange={(e) => setUserName(e.target.value)}
            icon="EditIcon"
            value={userName}
            name="name"
            error={false}
            ref={inputRef}
            errorText="Ошибка"
            size="default"
          />
        </div>
        <div className="mb-6">
          <Input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            icon="EditIcon"
            value={email}
            name="name"
            error={false}
            ref={inputRef}
            errorText="Ошибка"
            size="default"
          />
        </div>
        <div className="mb-15">
          <Input
            type="password"
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
            icon="EditIcon"
            value={password}
            name="name"
            error={false}
            ref={inputRef}
            errorText="Ошибка"
            size="default"
          />
        </div>
        <div className={profileStyles.btn_wrapper}>
          <button
            type="button"
            onClick={handleReset}
            className={`${profileStyles.cancel} text text_type_main-default mr-6`}
          >
            Отмена
          </button>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Сохранить
          </Button>
        </div>
        <div>{error}</div>
      </form>
    </div>
  );
}
