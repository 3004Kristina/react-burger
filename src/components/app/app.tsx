import React from 'react';
import AppHeader from '../app-header/app-header';
import MainTitle from '../main-title/main-title';
import BurgerConstructorWrapper from '../burger-constructor-wrapper/burger-constructor-wrapper';

function App() {
    const [state, setState] = React.useState({
        hasError: false,
        data: []
    }),
        url = 'https://norma.nomoreparties.space/api/ingredients';

    React.useEffect (() => {
        const getData = () => {
            fetch(url)
                .then(res => res.json())
                .then(res => setState({...state, data: res.data}))
                .catch(e => {
                    setState({...state, hasError: true})
                });
        }

        getData();
    }, [])

    return (
        <div>
            <AppHeader/>
            <MainTitle/>
            <BurgerConstructorWrapper data={state.data}/>
        </div>
    );
}

export default App;
