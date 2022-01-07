import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export default function ProtectedRoute({ children, route, exact }) {
  const { user } = useSelector((store) => ({
    user: store.getUserData.user,
  }));

  function render({ location }) {
    return (user ? (children) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: location },
        }}
      />
    ));
  }

  return (
    <Route
      route={route}
      exact={exact}
      render={render}
    />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.element,
  route: PropTypes.string,
  exact: PropTypes.bool,
};

ProtectedRoute.defaultProps = {
  children: null,
  route: undefined,
  exact: false,
};
