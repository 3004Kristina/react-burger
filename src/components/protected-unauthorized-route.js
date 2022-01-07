import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export default function ProtectedUnauthorizedRoute({ children, route, exact }) {
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

ProtectedUnauthorizedRoute.propTypes = {
  children: PropTypes.element,
  route: PropTypes.string,
  exact: PropTypes.bool,
};

ProtectedUnauthorizedRoute.defaultProps = {
  children: null,
  route: undefined,
  exact: false,
};
