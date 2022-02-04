import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../../services/hooks';
import { DELETE_BASKET_ITEM_BY_INDEX } from '../../services/actions/constructor';
import burgerConstructorStyles from './burger-constructor.module.css';
import IIngredientItem from '../../types/IngredientsItem';

interface IBurgerConstructorItemProps {
  item: IIngredientItem;
  index: number;
  id: string;
  // eslint-disable-next-line no-unused-vars
  moveCard(dragIndex: number, hoverIndex: number): void;
}

function BurgerConstructorItem(
  {
    item,
    index,
    id,
    moveCard,
  }: IBurgerConstructorItemProps,
) {
  const dispatch = useDispatch();

  function handleDeleteItem() {
    dispatch({
      type: DELETE_BASKET_ITEM_BY_INDEX,
      index,
    });
  }

  const ref = useRef<HTMLInputElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'basket-item',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(obj: Pick<IBurgerConstructorItemProps, 'index'>, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = obj.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset?.y || 0) - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      // плагин требует изменения свойства объекта, переданного в аргументах
      // eslint-disable-next-line no-param-reassign
      obj.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: 'basket-item',
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <div
      className={burgerConstructorStyles.card}
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        handleClose={handleDeleteItem}
        text={item.name}
        price={item.price}
        thumbnail={item.image}
      />
    </div>
  );
}

export default BurgerConstructorItem;
