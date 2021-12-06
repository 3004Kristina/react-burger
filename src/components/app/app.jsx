import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from '../app-header/app-header';
import MainTitle from '../main-title/main-title';
import BurgerConstructorWrapper from '../burger-constructor-wrapper/burger-constructor-wrapper';
import {GET_INGREDIENTS_FAILED, getIngredientsItems} from '../../services/actions';
import Modal from '../modal/modal';
import ErrorModal from '../error-modal/error-modal';

function App() {
    const dispatch = useDispatch();

    const {ingredientsFailed} = useSelector(store => ({
        ingredientsFailed: store.ingredientsData.ingredientsFailed,
    }))

    React.useEffect(() => {
        dispatch(getIngredientsItems());
    }, [dispatch]);

    return (
        <div>
            <AppHeader/>
            <MainTitle/>
            <BurgerConstructorWrapper/>
            {ingredientsFailed &&
            <Modal close={() => dispatch({type: GET_INGREDIENTS_FAILED})}>
                <ErrorModal/>
            </Modal>
            }
        </div>
    );
}

export default App;
