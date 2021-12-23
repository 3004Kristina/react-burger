import React from 'react';
import loginStyles from './login.module.css';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {registerUser} from '../services/actions/create-user';


export function RegisterPage() {
    const dispatch = useDispatch();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [userName, setUserName] = React.useState('');

    const inputRef = React.useRef(null);
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0);
        alert('Icon Click Callback');
    };

    function handleRegistration () {
        dispatch(registerUser({
            email: email,
            password: password,
            name: userName
        }));
    }

    return (
        <div className={loginStyles.login_wrapper}>
            <div className="text text_type_main-medium mb-6">Регистрация</div>
            <div className="mb-6">
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setUserName(e.target.value)}
                    icon={'undefined'}
                    value={userName}
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
            <div className="mb-20">
                <Button  type="primary" size="medium" onClick={handleRegistration}>
                    Зарегистрироваться
                </Button>
            </div>
            <div className={`${loginStyles.link_wrapper} mb-4`}>
                <span className="text text_type_main-default text_color_inactive mr-2">Уже зарегистрированы?</span>
                <Link className={`text text_type_main-default ${loginStyles.link}`} to='/login'>Войти</Link>
            </div>
        </div>
    );
}