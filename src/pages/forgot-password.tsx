import React from 'react';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from '../services/hooks';
import { passwordResetEmailCheck } from '../services/actions/password-reset';
import loginStyles from './login.module.css';

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const { resetPassword } = useSelector((store) => ({
    resetPassword: store.resetPasswordData.resetPassword,
  }));

  function handleRegistration(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(passwordResetEmailCheck({
      email,
    }));
  }

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  if (resetPassword) {
    return (
      <Redirect
        to={{
          pathname: '/reset-password',
        }}
      />
    );
  }

  return (
    <form className={loginStyles.login_wrapper} onSubmit={handleRegistration}>
      <div className="text text_type_main-medium mb-6">Восстановление пароля</div>
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
      <div className="mb-20">
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Восстановить
        </Button>
      </div>
      <div className={`${loginStyles.link_wrapper} mb-4`}>
        <span className="text text_type_main-default text_color_inactive mr-2">Вспомнили пароль?</span>
        <Link className={`text text_type_main-default ${loginStyles.link}`} to="/login">Войти</Link>
      </div>
    </form>
  );
}
