import React from 'react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import burgerConstructorStyles from './burger-constructor.module.css';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch} from 'react-redux';
import {DELETE_BASKET_ITEM_BY_INDEX} from '../../services/actions/constructor';
import PropTypes from 'prop-types';

BurgerConstructorItem.propTypes = {
    item: PropTypes.shape({
        calories: PropTypes.number,
        carbohydrates: PropTypes.number,
        fat: PropTypes.number,
        price: PropTypes.number,
        proteins: PropTypes.number,
        type: PropTypes.string,
        image: PropTypes.string,
        image_large: PropTypes.string,
        image_mobile: PropTypes.string,
        _id: PropTypes.string
    }).isRequired,
    index: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired
}

function BurgerConstructorItem({item, index, id, moveCard}) {
    const dispatch = useDispatch();

    function handleDeleteItem(index) {
        dispatch({
            type: DELETE_BASKET_ITEM_BY_INDEX,
            index
        });
    }

    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'basket-item',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveCard(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: 'basket-item',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));

    return (
        <div className={burgerConstructorStyles.card} ref={ref} data-handler-id={handlerId} style={{opacity}}>
            <DragIcon type="primary"/>
            <ConstructorElement
                handleClose={() => handleDeleteItem(index)}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
            />
        </div>
    );

}

export default BurgerConstructorItem;