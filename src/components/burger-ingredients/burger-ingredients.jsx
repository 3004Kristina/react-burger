import React from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { TYPE_LABELS } from '../../utils/consts';
import BurgerIngredientItem from './burger-ingredient-item';

function BurgerIngredients() {
  const { data } = useSelector((store) => ({
    data: store.ingredientsData.ingredients,
  }));

  const catalog = [
    {
      type: 'bun',
      label: 'Булки',
      items: [],
    },
    {
      type: 'sauce',
      label: 'Соусы',
      items: [],
    },
    {
      type: 'main',
      label: 'Начинки',
      items: [],
    },
  ];

  data.forEach((item) => catalog.find((group) => group.type === item.type)?.items.push(item));

  const [current, setCurrent] = React.useState('');
  const titleToScrollRef = React.useRef({});
  const tabWrapperRef = React.useRef(null);

  React.useEffect(() => {
    setCurrent(catalog[0].type);
  }, []);

  function handleScrollWrapper() {
    catalog.forEach((group) => {
      const topCurrent = titleToScrollRef.current[group.type].getBoundingClientRect().top;
      const bottomTabWrapper = tabWrapperRef.current.getBoundingClientRect().bottom;
      const tabWrapper = document.getElementById('tab_wrapper');
      const tabWrapperMargin = +window.getComputedStyle(tabWrapper).getPropertyValue('margin-bottom');
      const max = bottomTabWrapper + tabWrapperMargin;
      const min = bottomTabWrapper;

      if (topCurrent > min && topCurrent < max) {
        setCurrent(group.type);
      }
    });
  }

  function handleScrollToElem(type) {
    setTimeout(() => {
      setCurrent(type);
    }, 100);

    titleToScrollRef.current[type]?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div>
      <div id="tab_wrapper" ref={tabWrapperRef} style={{ display: 'flex' }} className="mb-10 mr-15">
        {catalog.map((group) => group.items.length > 0
          && (
            <Tab
              key={group.type}
              value={group.type}
              active={current === group.type}
              onClick={() => handleScrollToElem(group.type)}
            >
              {group.label}
            </Tab>
          ))}
      </div>

      <div className={burgerIngredientsStyles.cards_inner_wrapper}>
        <div onScroll={handleScrollWrapper} className={`${burgerIngredientsStyles.cards_wrapper} custom-scroll`}>
          {catalog.map((group) => group.items.length > 0
            && (
              <div key={group.type} className="mb-10">
                <h2
                  className="text text_type_main-medium mb-6"
                  ref={(el) => {
                    titleToScrollRef.current[group.type] = el;
                    return el;
                  }}
                >
                  {TYPE_LABELS[group.type]}
                </h2>
                <ul className={burgerIngredientsStyles.cards_list}>
                  {group.items.map((item) => {
                    const { _id: itemId } = item;
                    return (
                      <BurgerIngredientItem key={itemId} item={item} />
                    );
                  })}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default BurgerIngredients;
