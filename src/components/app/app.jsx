import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
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
} from '../../pages';
import AppHeader from '../app-header/app-header';
import ProtectedRoute from '../protected-route';
import GuestRoute from '../guest-route';
import { getUser } from '../../services/actions/get-user-info';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { RESET_INGREDIENTS_DETAILS } from '../../services/actions/ingredients-detail-modal';

function ModalSwitch() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { userIsChecked } = useSelector((store) => ({
    userIsChecked: store.getUserData.userIsChecked,
  }));
  const background = location.state && location.state.background;

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
        <GuestRoute path="/login" exact>
          <LoginPage />
        </GuestRoute>
        <GuestRoute path="/register" exact>
          <RegisterPage />
        </GuestRoute>
        <GuestRoute path="/forgot-password" exact>
          <ForgotPasswordPage />
        </GuestRoute>
        <GuestRoute path="/reset-password" exact>
          <ResetPasswordPage />
        </GuestRoute>
        <ProtectedRoute path="/profile" exact>
          <ProfilePage />
        </ProtectedRoute>
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
