import React from 'react';
import AppHeader from '../app-header/app-header';
import MainTitle from '../main-title/main-title';
import BurgerConstructorWrapper from '../burger-constructor-wrapper/burger-constructor-wrapper';
import {AppContext} from '../../services/app-context/app-context';
import {getIngredients} from '../../api/apiClient';
import Modal from '../modal/modal';
import ErrorModal from '../error-modal/error-modal';

function App() {
    const [data, setData] = React.useState([]);
    const [hasError, setHasError] = React.useState(false);

    React.useEffect (() => {
        getIngredients()
            .then(res => setData(res.data))
            .catch(e => {
                setHasError( true)
            });
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
            {hasError &&
            <Modal close={() => setHasError(false)}>
                <ErrorModal/>
            </Modal>
            }
        </div>
    );
}

export default App;
