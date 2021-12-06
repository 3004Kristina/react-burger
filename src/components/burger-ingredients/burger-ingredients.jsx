import React from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {TYPE_LABELS} from '../../utils/consts';
import {useDispatch, useSelector} from 'react-redux';
import {RESET_INGREDIENTS_DETAILS} from '../../services/actions';
import BurgerIngredientItem from './burger-ingredient-item';


function BurgerIngredients() {
    const dispatch = useDispatch();

    const {data, activeIngredientDetailId} = useSelector(store => ({
        data: store.ingredientsData.ingredients,
        activeIngredientDetailId: store.ingredientsData.activeIngredientDetailId
    }));

    const catalog = [
        {
            type: 'bun',
            label: 'Булки',
            items: []
        },
        {
            type: 'sauce',
            label: 'Соусы',
            items: []
        },
        {
            type: 'main',
            label: 'Начинки',
            items: []
        }
    ];

    data.forEach(item => catalog.find(group => group.type === item.type)?.items.push(item));

    const [current, setCurrent] = React.useState('');
    const titleToScrollRef = React.useRef({});
    const tabWrapperRef = React.useRef(null);

    React.useEffect(() => {
        setCurrent(catalog[0].type);
    }, []);

    function handleCloseIngredientDetailsModal() {
        dispatch({
            type: RESET_INGREDIENTS_DETAILS
        });
    }

    function handleScrollWrapper() {
        catalog.forEach(group => {
            let topCurrent = titleToScrollRef.current[group.type].getBoundingClientRect().top,
                bottomTabWrapper = tabWrapperRef.current.getBoundingClientRect().bottom,
                tabWrapperMargin = tabWrapperRef.current.computedStyleMap().get('margin-bottom').value,
                max = bottomTabWrapper + tabWrapperMargin,
                min = bottomTabWrapper;

            if (topCurrent > min && topCurrent < max) {
                setCurrent(group.type);
            }
        });
    }

    function handleScrollToElem(type) {
        setTimeout(() => {
            setCurrent(type);
        }, 100)

        titleToScrollRef.current[type]?.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <div>
            <div ref={tabWrapperRef} style={{display: 'flex'}} className="mb-10 mr-15">
                {catalog.map((group) => group.items.length > 0 && (
                    <Tab key={group.type} value={group.type} active={current === group.type} onClick={() => handleScrollToElem(group.type)}>{group.label}</Tab>
                ))}
            </div>

            <div className={burgerIngredientsStyles.cards_inner_wrapper}>
                <div onScroll={handleScrollWrapper} className={`${burgerIngredientsStyles.cards_wrapper} custom-scroll`}>
                    {catalog.map(group => group.items.length > 0 && (
                        <div key={group.type} className="mb-10">
                            <h2 className="text text_type_main-medium mb-6"
                                ref={(el) => titleToScrollRef.current[group.type] = el}>
                                {TYPE_LABELS[group.type]}
                            </h2>
                            <ul className={burgerIngredientsStyles.cards_list}>
                                {group.items.map(item => (
                                    <BurgerIngredientItem key={item._id} item={item}/>
                                ))}
                            </ul>
                            {activeIngredientDetailId !== null &&
                                <Modal close={handleCloseIngredientDetailsModal} name="Детали ингредиента">
                                    <IngredientDetails/>
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