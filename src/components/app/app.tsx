import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { Location } from 'history';
import { useDispatch, useSelector } from '../../services/hooks';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientsPage,
  OrderIngredientsDetailPage,
  Orders,
  Feed,
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
import OrderIngredientsDetails from '../order-ingredients-details/order-ingredients-details';
import {
  RESET_ORDER_INGREDIENTS_DETAILS,
} from '../../services/actions/order-ingredients-detail-modal';

type TLocationState = {
  background: Location;
}

function ModalSwitch() {
  const dispatch = useDispatch();
  const location = useLocation<TLocationState>();
  const history = useHistory();
  const { userIsChecked } = useSelector((store) => ({
    userIsChecked: store.getUserData.userIsChecked,
  }));
  const background = location.state && location.state.background;

  React.useEffect(() => {
    dispatch(getIngredientsItems());
  }, [dispatch]);

  function handleIngredientsDetailModalClose() {
    dispatch({
      type: RESET_INGREDIENTS_DETAILS,
    });
    history.goBack();
  }

  function handleOrderIngredientsDetailModalClose() {
    dispatch({
      type: RESET_ORDER_INGREDIENTS_DETAILS,
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
        <Route path="/feed" exact>
          <Feed />
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
        <ProtectedUnauthorizedRoute path="/profile/orders" exact>
          <Orders />
        </ProtectedUnauthorizedRoute>
        <Route path="/ingredients/:ingredientId" exact>
          <IngredientsPage />
        </Route>
        <Route path="/feed/:orderId" exact>
          <OrderIngredientsDetailPage />
        </Route>
        <Route path="/profile/orders/:orderId" exact>
          <OrderIngredientsDetailPage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>

      {background && (
        <>
          <Route path="/ingredients/:ingredientId">
            <Modal onClose={handleIngredientsDetailModalClose}>
              <IngredientDetails />
            </Modal>
          </Route>
          <Route path="/profile/orders/:orderId">
            <Modal onClose={handleOrderIngredientsDetailModalClose}>
              <OrderIngredientsDetails />
            </Modal>
          </Route>
          <Route path="/feed/:orderId">
            <Modal onClose={handleOrderIngredientsDetailModalClose}>
              <OrderIngredientsDetails />
            </Modal>
          </Route>
        </>
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
