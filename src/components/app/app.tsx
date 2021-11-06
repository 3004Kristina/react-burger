import React from 'react';
import AppHeader from '../app-header/app-header';
import MainTitle from '../main-title/main-title';
import BurgerConstructorWrapper from '../burger-constructor-wrapper/burger-constructor-wrapper';

function App() {
    return (
        <div>
            <AppHeader/>
            <MainTitle/>
            <BurgerConstructorWrapper/>
        </div>
    );
}

export default App;
