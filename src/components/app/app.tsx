import React from 'react';
import AppHeader from '../app-header/app-header';
import MainTitle from '../main-title/main-title';
import BurgerConstructorWrapper from '../burger-constructor-wrapper/burger-constructor-wrapper';
import {INGREDIENTS_URL} from '../../utils/consts';

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

    return (
        <div>
            <AppHeader/>
            <MainTitle/>
            <BurgerConstructorWrapper data={data}/>
        </div>
    );
}

export default App;
