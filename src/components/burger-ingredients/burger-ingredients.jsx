import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {TYPE_LABELS} from '../../utils/consts'
import {AppContext} from '../../services/app-context/app-context';


function BurgerIngredients() {
    const {catalog} = React.useContext(AppContext);
    const [current, setCurrent] = React.useState('');
    const [activeItem, setActiveItem] = React.useState({});
    const [modalOpened, setModalOpened] = React.useState(false);
    const titleToScrollRef = React.useRef({});


    React.useEffect(() => {
        setCurrent(catalog[0].type);
    }, [catalog]);

    React.useEffect(() => {
        titleToScrollRef.current[current]?.scrollIntoView({behavior: 'smooth'});
    }, [current]);

    function handleOpenIngredientDetailsModal(item) {
        setActiveItem(item);
        setModalOpened(true);
    }

    return (
        <div>
            <div style={{display: 'flex'}} className="mb-10 mr-15">
                {catalog.map((group) => group.items.length > 0 && (
                    <Tab key={group.type} value={group.type} active={current === group.type} onClick={setCurrent}>{group.label}</Tab>
                ))}
            </div>

            <div className={burgerIngredientsStyles.cards_inner_wrapper}>
                <div className={`${burgerIngredientsStyles.cards_wrapper} custom-scroll`}>
                    {catalog.map(group => group.items.length > 0 && (
                        <div key={group.type} className="mb-10">
                            <h2 className="text text_type_main-medium mb-6"
                                ref={(el) => titleToScrollRef.current[group.type] = el}>
                                {TYPE_LABELS[group.type]}
                            </h2>
                            <ul className={burgerIngredientsStyles.cards_list}>
                                {group.items.map(item => (

                                    <li key={item._id} onClick={() => handleOpenIngredientDetailsModal(item)}>
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
                            {modalOpened &&
                            <Modal close={() => setModalOpened(false)} name="Детали ингредиента">
                                <IngredientDetails data={activeItem}/>
                            </Modal>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BurgerIngredients;