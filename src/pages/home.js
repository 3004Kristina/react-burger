import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import MainTitle from '../components/main-title/main-title';
import BurgerConstructorWrapper from '../components/burger-constructor-wrapper/burger-constructor-wrapper';
import {getIngredientsItems, RESET_INGREDIENTS_FAILED} from '../services/actions/ingredients';
import Modal from '../components/modal/modal';
import ErrorModal from '../components/error-modal/error-modal';

export function HomePage() {
    const dispatch = useDispatch();

    const {ingredientsFailed} = useSelector(store => ({
        ingredientsFailed: store.ingredientsData.ingredientsFailed
    }));

    React.useEffect(() => {
        dispatch(getIngredientsItems());
    }, [dispatch]);

    return (
        <div>
            <MainTitle/>
            <BurgerConstructorWrapper/>
            {ingredientsFailed &&
                <Modal close={() => dispatch({type: RESET_INGREDIENTS_FAILED})}>
                    <ErrorModal/>
                </Modal>
            }
        </div>
    );
}

