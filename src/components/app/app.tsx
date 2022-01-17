import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { Location } from 'history';
import { useDispatch, useSelector } from 'react-redux';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientsPage,
  NotFound404,
} from '../../pages/index';
import AppHeader from '../app-header/app-header';
import ProtectedUnauthorizedRoute from '../protected-unauthorized-route';
import ProtectedAuthorizedRoute from '../protected-authorized-route';
import { getUser } from '../../services/actions/get-user-info';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { RESET_INGREDIENTS_DETAILS } from '../../services/actions/ingredients-detail-modal';
import { getIngredientsItems } from '../../services/actions/ingredients';

type TLocationState = {
  background: Location;
}

function ModalSwitch() {
  const dispatch = useDispatch();
  const location = useLocation<TLocationState>();
  const history = useHistory();
  const { userIsChecked } = useSelector((store) => ({
    // @ts-ignore
    userIsChecked: store.getUserData.userIsChecked,
  }));
  const background = location.state && location.state.background;

  React.useEffect(() => {
    dispatch(getIngredientsItems());
  }, [dispatch]);

  function handleModalClose() {
    dispatch({
      type: RESET_INGREDIENTS_DETAILS,
    });
    history.goBack();
  }

  if (!userIsChecked) {
    return null;
  }

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <ProtectedAuthorizedRoute path="/login" exact>
          <LoginPage />
        </ProtectedAuthorizedRoute>
        <ProtectedAuthorizedRoute path="/register" exact>
          <RegisterPage />
        </ProtectedAuthorizedRoute>
        <ProtectedAuthorizedRoute path="/forgot-password" exact>
          <ForgotPasswordPage />
        </ProtectedAuthorizedRoute>
        <ProtectedAuthorizedRoute path="/reset-password" exact>
          <ResetPasswordPage />
        </ProtectedAuthorizedRoute>
        <ProtectedUnauthorizedRoute path="/profile" exact>
          <ProfilePage />
        </ProtectedUnauthorizedRoute>
        <Route path="/ingredients/:ingredientId" exact>
          <IngredientsPage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>

      {background && (
        <Route path="/ingredients/:ingredientId">
          <Modal onClose={handleModalClose}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </>
  );
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}

export default App;
