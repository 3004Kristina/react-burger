import React from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import loginStyles from './login.module.css';
import { registerUser } from '../services/actions/create-user';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userName, setUserName] = React.useState('');

  const inputRef = React.useRef(null);

  function handleRegistration() {
    dispatch(registerUser({
      email,
      password,
      name: userName,
    }));
  }

  return (
    <div className={loginStyles.login_wrapper}>
      <div className="text text_type_main-medium mb-6">Регистрация</div>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Имя"
          onChange={(e) => setUserName(e.target.value)}
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
        <Button
          type="primary"
          size="medium"
          onClick={() => handleRegistration()}
        >
          Зарегистрироваться
        </Button>
      </div>
      <div className={`${loginStyles.link_wrapper} mb-4`}>
        <span className="text text_type_main-default text_color_inactive mr-2">Уже зарегистрированы?</span>
        <Link className={`text text_type_main-default ${loginStyles.link}`} to="/login">Войти</Link>
      </div>
    </div>
  );
}
