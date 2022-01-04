import React from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loginUser } from '../services/actions/login';
import loginStyles from './login.module.css';

export default function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { user } = useSelector((store) => ({
    user: store.getUserData.user,
  }));
  const inputRef = React.useRef(null);

  function handleLogin() {
    dispatch(loginUser({
      email,
      password,
    }));
  }

  if (user) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }

  return (
    <div className={loginStyles.login_wrapper}>
      <div className="text text_type_main-medium mb-6">Вход</div>
      <div className="mb-6">
        <Input
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="name"
          error={false}
          ref={inputRef}
          errorText="Ошибка"
          size="default"
        />
      </div>
      <div className="mb-6">
        <Input
          type="password"
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
          icon="ShowIcon"
          value={password}
          name="name"
          error={false}
          ref={inputRef}
          errorText="Ошибка"
          size="default"
        />
      </div>
      <div className="mb-20">
        <Button type="primary" size="medium" onClick={() => handleLogin()}>
          Вход
        </Button>
      </div>
      <div className={`${loginStyles.link_wrapper} mb-4`}>
        <span className="text text_type_main-default text_color_inactive mr-2">Вы — новый пользователь?</span>
        <Link className={`text text_type_main-default ${loginStyles.link}`} to="/register">Зарегистрироваться</Link>
      </div>
      <div className={`${loginStyles.link_wrapper} mb-4`}>
        <span className="text text_type_main-default text_color_inactive mr-2">Забыли пароль?</span>
        <Link className={`text text_type_main-default ${loginStyles.link}`} to="/forgot-password">Восстановить пароль</Link>
      </div>
    </div>
  );
}
