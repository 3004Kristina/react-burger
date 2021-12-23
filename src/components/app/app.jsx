import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory, useLocation} from 'react-router-dom';
import {HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, IngredientsPage, NotFound404} from '../../pages';
import AppHeader from '../app-header/app-header';
import {ProtectedRoute} from '../protected-route';
import {getUser} from '../../services/actions/get-user-info';
import {useDispatch, useSelector} from 'react-redux';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import {RESET_INGREDIENTS_DETAILS} from '../../services/actions/ingredients-detail-modal';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
    }, []);

    const ModalSwitch = () => {
        const location = useLocation();
        const history = useHistory();
        const {userIsChecked} = useSelector(store => ({
            userIsChecked: store.getUserData.userIsChecked
        }));
        let background = location.state && location.state.background;

        const handleModalClose = () => {
            dispatch({
                type: RESET_INGREDIENTS_DETAILS
            });
            history.goBack();
        };

        if (!userIsChecked) {
            return null;
        }

        return (
            <>
                <AppHeader/>
                <Switch location={background || location}>
                    <ProtectedRoute path="/" exact={true}>
                        <HomePage/>
                    </ProtectedRoute>
                    <Route path="/login" exact={true}>
                        <LoginPage/>
                    </Route>
                    <Route path="/register" exact={true}>
                        <RegisterPage/>
                    </Route>
                    <Route path="/forgot-password" exact={true}>
                        <ForgotPasswordPage/>
                    </Route>
                    <Route path="/reset-password" exact={true}>
                        <ResetPasswordPage/>
                    </Route>
                    <ProtectedRoute path="/profile" exact={true}>
                        <ProfilePage/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/ingredients/:ingredientId" exact={true}>
                        <IngredientsPage/>
                    </ProtectedRoute>
                    <Route>
                        <NotFound404/>
                    </Route>
                </Switch>

                {background && (
                    <Route
                        path="/ingredients/:ingredientId"
                        children={
                            <Modal close={handleModalClose}>
                                <IngredientDetails/>
                            </Modal>
                        }
                    />
                )}
            </>
        );
    };

    return (
        <Router>
            <ModalSwitch/>
        </Router>
    );
}

export default App;
