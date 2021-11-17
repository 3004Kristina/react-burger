import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

const TYPE_LABELS = {
    'bun': 'Булки',
    'sauce': 'Соусы',
    'main': 'Начинки'
};

BurgerIngredients.propTypes = {
    groupedData: PropTypes.array
};

function BurgerIngredients({groupedData}) {
    const [current, setCurrent] = React.useState(groupedData.find(group => group.items.length > 0)?.type),
        [activeItem, setActiveItem] = React.useState({}),
        titleToScrollRef = React.useRef({}),
        orderDetailsModal = React.useRef(null);

    React.useEffect(() => {
        setCurrent(groupedData.find(group => group.items.length > 0)?.type);
    },[groupedData])

    React.useEffect(() => {
        titleToScrollRef.current[current]?.scrollIntoView({behavior: 'smooth'});
    }, [current]);

    function openIngredientDetailsModal(item) {
        setActiveItem(item);
        orderDetailsModal.current.open();
    }

    return (
        <div>
            <div style={{display: 'flex'}} className="mb-10 mr-15">
                {groupedData.map((group) => group.items.length > 0 && (
                    <Tab key={group.type} value={group.type} active={current === group.type} onClick={setCurrent}>{group.label}</Tab>
                ))}
            </div>

            <div className={burgerIngredientsStyles.cards_inner_wrapper}>
                <div className={`${burgerIngredientsStyles.cards_wrapper} custom-scroll`}>
                    {groupedData.map(group => group.items.length > 0 && (
                        <div key={group.type} className="mb-10">
                            <h2 className="text text_type_main-medium mb-6"
                                ref={(el) => titleToScrollRef.current[group.type] = el}>
                                {TYPE_LABELS[group.type]}
                            </h2>
                            <ul className={burgerIngredientsStyles.cards_list}>
                                {group.items.map(item => (

                                    <li key={item._id} onClick={() => openIngredientDetailsModal(item)}>
                                        <button type="button" className={burgerIngredientsStyles.card}>
                                            <Counter count={1} size="default"/>
                                            <img src={item.image} alt=""/>
                                            <p className={`${burgerIngredientsStyles.price} text text_type_digits-default p-2`}>
                                                {item.price}
                                                <CurrencyIcon type="primary"/>
                                            </p>
                                            <p style={{textAlign: 'center'}} className="text text_type_main-small pb-5">
                                                {item.name}
                                            </p>
                                        </button>

                                    </li>
                                ))}
                            </ul>
                            <Modal ref={orderDetailsModal} name="Детали ингредиента">
                                <IngredientDetails data={activeItem}/>
                            </Modal>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default BurgerIngredients;