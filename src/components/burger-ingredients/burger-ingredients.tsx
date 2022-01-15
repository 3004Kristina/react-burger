import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { INGREDIENT_GROUPS } from '../../utils/consts';
import BurgerIngredientItem from './burger-ingredient-item';
import IIngredientItem from '../../types/IngredientsItem';
import { TIngredientGroup } from '../../types/IngredientGroup';

type TGroup = TIngredientGroup & { items: Array<IIngredientItem> };

function getIngredientGroupLabel(type: string): string | null {
  return INGREDIENT_GROUPS.find((group) => group.type === type)?.label || null;
}

function BurgerIngredients() {
  const { ingredients }: any = useSelector((store) => ({
    // @ts-ignore
    ingredients: store.ingredientsData.ingredients,
  }));

  const catalog = useMemo(() => {
    const calculatedCatalog: Array<TGroup> = INGREDIENT_GROUPS.map((group) => ({
      ...group,
      items: [],
    }));

    ingredients.forEach(
      (item: IIngredientItem) => calculatedCatalog.find(
        (group) => group.type === item.type,
      )?.items?.push(item),
    );

    return calculatedCatalog;
  }, [ingredients]);

  const [current, setCurrent] = React.useState('');
  const titleToScrollRef = React.useRef(new Map<String, HTMLElement>());
  const tabWrapperRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setCurrent(catalog[0].type);
  }, []);

  function handleScrollWrapper() {
    catalog.forEach((group) => {
      const topCurrent = titleToScrollRef.current.get(group.type)?.getBoundingClientRect().top || 0;
      const bottomTabWrapper = tabWrapperRef?.current?.getBoundingClientRect().bottom || 0;
      const tabWrapper = document.getElementById('tab_wrapper') as HTMLElement;
      const tabWrapperMargin = parseInt(window.getComputedStyle(tabWrapper).getPropertyValue('margin-bottom'));
      const scrollGap = 10;
      const max = bottomTabWrapper + tabWrapperMargin + scrollGap;
      const min = bottomTabWrapper - scrollGap;

      if (topCurrent >= min && topCurrent <= max) {
        setCurrent(group.type);
      }
    });
  }

  function handleScrollToElem(type: string) {
    titleToScrollRef.current.get(type)?.scrollIntoView({ behavior: 'smooth' });
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
        <div
          onScroll={handleScrollWrapper}
          className={`${burgerIngredientsStyles.cards_wrapper} custom-scroll`}
        >
          {catalog.map((group) => group.items.length > 0
            && (
              <div key={group.type} className="mb-10">
                <h2
                  className="text text_type_main-medium mb-6"
                  ref={(el: HTMLHeadingElement) => {
                    titleToScrollRef.current.set(group.type, el);
                  }}
                >
                  {getIngredientGroupLabel(group.type)}
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
