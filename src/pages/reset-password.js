import React from 'react';
import loginStyles from './login.module.css';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {Redirect, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setNewPassword} from '../services/actions/set-new-password';

export function ResetPasswordPage() {
    const dispatch = useDispatch();
    const [password, setPassword] = React.useState('');
    const [code, setCode] = React.useState('');
    const {emailChecked, updatePassword} = useSelector(store => ({
        emailChecked: store.emailCheckData.emailChecked,
        updatePassword: store.updatePasswordData.updatePassword,
    }));
    const inputRef = React.useRef(null);
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0);
        alert('Icon Click Callback');
    };

    function handleRegistration () {
        dispatch(setNewPassword({
            password,
            token: code
        }));
    }

    if (!emailChecked) {
        return (
            <Redirect
                to={{
                    pathname: '/forgot-password'
                }}
            />
        );
    }

    if (updatePassword) {
        return (
            <Redirect
                to={{
                    pathname: '/login'
                }}
            />
        );
    }


    return (
        <div className={loginStyles.login_wrapper}>
            <div className="text text_type_main-medium mb-6">Восстановление пароля</div>
            <div className="mb-6">
                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={e => setPassword(e.target.value)}
                    icon={'ShowIcon'}
                    value={password}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                />
            </div>
            <div className="mb-6">
                <Input
                    type={'password'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setCode(e.target.value)}
                    icon={'undefined'}
                    value={code}
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
                    Сохранить
                </Button>
            </div>
            <div className={`${loginStyles.link_wrapper} mb-4`}>
                <span className="text text_type_main-default text_color_inactive mr-2">Вспомнили пароль?</span>
                <Link className={`text text_type_main-default ${loginStyles.link}`} to='/login'>Войти</Link>
            </div>
        </div>
    );
}