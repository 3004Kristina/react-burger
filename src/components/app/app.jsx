import React from 'react';
import AppHeader from '../app-header/app-header';
import MainTitle from '../main-title/main-title';
import BurgerConstructorWrapper from '../burger-constructor-wrapper/burger-constructor-wrapper';
import {INGREDIENTS_URL} from '../../utils/consts';
import {AppContext} from '../../services/app-context/app-context';

function App() {
    const [data, setData] = React.useState([]);
    const [hasError, setHasError] = React.useState(false);

    React.useEffect (() => {
        const getData = () => {
            fetch(INGREDIENTS_URL)
                .then(res => res.json())
                .then(res => setData(res.data))
                .catch(e => {
                    setHasError( true)
                });
        }

        getData();
    }, [])

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

    const ingredients = catalog.filter(group => group.type !== 'bun').map(group => group.items).flat();
    const bun = catalog.find(group => group.type === 'bun').items[0];

    const basket = {
        ingredients,
        bun
    }

    return (
        <div>
            <AppHeader/>
            <MainTitle/>
            <AppContext.Provider value={{catalog, basket}} >
            <BurgerConstructorWrapper/>
            </AppContext.Provider>
        </div>
    );
}

export default App;
