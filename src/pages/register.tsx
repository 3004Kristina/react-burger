import React from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from '../services/hooks';
import loginStyles from './login.module.css';
import { registerUser } from '../services/actions/create-user';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userName, setUserName] = React.useState('');

  function handleRegistration(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(registerUser({
      email,
      password,
      name: userName,
    }));
  }

  function handleChangeUserName(e: React.ChangeEvent<HTMLInputElement>) {
    setUserName(e.target.value);
  }

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  return (
    <form className={loginStyles.login_wrapper} onSubmit={handleRegistration}>
      <div className="text text_type_main-medium mb-6">Регистрация</div>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Имя"
          onChange={handleChangeUserName}
          value={userName}
          name="name"
          error={false}
          errorText="Ошибка"
          size="default"
        />
      </div>
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
          Зарегистрироваться
        </Button>
      </div>
      <div className={`${loginStyles.link_wrapper} mb-4`}>
        <span
          className="text text_type_main-default text_color_inactive mr-2"
        >
          Уже зарегистрированы?
        </span>
        <Link
          className={`text text_type_main-default ${loginStyles.link}`}
          to="/login"
        >
          Войти
        </Link>
      </div>
    </form>
  );
}
