import React from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../services/actions/login';
import loginStyles from './login.module.css';

export default function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(loginUser({
      email,
      password,
    }));
  }

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  return (
    <form className={loginStyles.login_wrapper} onSubmit={handleLogin}>
      <div className="text text_type_main-medium mb-6">Вход</div>
      <div className="mb-6">
        <Input
          type="email"
          placeholder="E-mail"
          onChange={handleChangeEmail}
          value={email}
          name="name"
          error={false}
          errorText="Ошибка"
          size="default"
        />
      </div>
      <div className="mb-6">
        <Input
          type="password"
          placeholder="Пароль"
          onChange={handleChangePassword}
          icon="ShowIcon"
          value={password}
          name="name"
          error={false}
          errorText="Ошибка"
          size="default"
        />
      </div>
      <div className="mb-20">
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Вход
        </Button>
      </div>
      <div className={`${loginStyles.link_wrapper} mb-4`}>
        <span className="text text_type_main-default text_color_inactive mr-2">
          Вы — новый пользователь?
        </span>
        <Link
          className={`text text_type_main-default ${loginStyles.link}`}
          to="/register"
        >
          Зарегистрироваться
        </Link>
      </div>
      <div className={`${loginStyles.link_wrapper} mb-4`}>
        <span className="text text_type_main-default text_color_inactive mr-2">
          Забыли пароль?
        </span>
        <Link
          className={`text text_type_main-default ${loginStyles.link}`}
          to="/forgot-password"
        >
          Восстановить пароль
        </Link>
      </div>
    </form>
  );
}
