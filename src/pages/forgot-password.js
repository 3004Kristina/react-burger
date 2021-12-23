import React from 'react';
import loginStyles from './login.module.css';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from 'react-redux';
import {passwordResetEmailCheck} from '../services/actions/password-reset';
import {Redirect, Link} from 'react-router-dom';

export function ForgotPasswordPage() {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('');
    const inputRef = React.useRef(null);
    const {emailChecked} = useSelector(store => ({
        emailChecked: store.emailCheckData.emailChecked,
    }));
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0);
        alert('Icon Click Callback');
    };

    function handleRegistration () {
        dispatch(passwordResetEmailCheck({
            email
        }));
    }

    if (emailChecked) {
        return (
            <Redirect
                to={{
                    pathname: '/reset-password'
                }}
            />
        );
    }

    return (
        <div className={loginStyles.login_wrapper}>
            <div className="text text_type_main-medium mb-6">Восстановление пароля</div>
            <div className="mb-6">
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={e => setEmail(e.target.value)}
                    icon={'undefined'}
                    value={email}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                />
            </div>
            <div className="mb-20">
                <Button  type="primary" size="medium" onClick={handleRegistration}>
                    Восстановить
                </Button>
            </div>
            <div className={`${loginStyles.link_wrapper} mb-4`}>
                <span className="text text_type_main-default text_color_inactive mr-2">Вспомнили пароль?</span>
                <Link className={`text text_type_main-default ${loginStyles.link}`} to='/login'>Войти</Link>
            </div>
        </div>
    );
}