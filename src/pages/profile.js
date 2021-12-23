import React from 'react';
import profileStyles from './profile.module.css';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {NavLink} from 'react-router-dom';
import {logout} from '../api/apiClient';
import {useDispatch, useSelector} from 'react-redux';
import {LOGOUT_USER, updateUser} from '../services/actions/get-user-info';
import {deleteCookie} from '../utils/cookie';
import {useHistory} from 'react-router-dom';

export function ProfilePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {user} = useSelector(store => ({
        user: store.getUserData.user
        }));
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState(user.email);
    const [userName, setUserName] = React.useState(user.name);
    const inputRef = React.useRef(null);
    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0);
        alert('Icon Click Callback');
    };

    function handleSave() {
        dispatch(updateUser({
            name: userName,
            email
        }));
    }

    function handleReset() {
        setEmail(user.email);
        setUserName(user.name);
        setPassword('');
    }

    function handleLogout () {
        logout()
            .finally(() => {
                deleteCookie('refreshToken');
                deleteCookie( 'accessToken');
                dispatch({
                    type: LOGOUT_USER
                });
                history.replace({ pathname: '/login' });
            })
    }

    return (
        <div className={profileStyles.profile_wrapper}>
            <div className={profileStyles.profile_link_wrapper}>
                <NavLink to="/profile" activeClassName={profileStyles.activeLink} className="text text_type_main-medium text_color_inactive pt-6 pb-6">Профиль</NavLink>
                <NavLink to="/profile/orders" className="text text_type_main-medium text_color_inactive pt-6 pb-6">История заказов</NavLink>
                <button type="button" onClick={handleLogout} className={`${profileStyles.cancel_btn} text text_type_main-medium text_color_inactive pt-6 pb-6 mb-20`}>Выход</button>
                <div className="text text_type_main-default text_color_inactive">
                    В этом разделе вы можете <br/>
                    изменить свои персональные данные
                </div>
            </div>
            <div>
                <div className="mb-6">
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setUserName(e.target.value)}
                        icon={'EditIcon'}
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
                        icon={'EditIcon'}
                        value={email}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <div className="mb-15">
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        onChange={e => setPassword(e.target.value)}
                        icon={'EditIcon'}
                        value={password}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <div className={profileStyles.btn_wrapper}>
                    <button type="button" onClick={handleReset} className={`${profileStyles.cancel} text text_type_main-default mr-6`}>Отмена</button>
                    <Button type="primary" size="medium" onClick={handleSave}>
                        Сохранить
                    </Button>
                </div>
            </div>

        </div>
    );
}