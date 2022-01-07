import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export default function GuestRoute({ children, route, exact }) {
  const { user } = useSelector((store) => ({
    user: store.getUserData.user,
  }));

  function render({ location }) {
    return (!user ? (children) : (
      <Redirect
        to={{
          pathname: '/',
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

GuestRoute.propTypes = {
  children: PropTypes.element,
  route: PropTypes.string,
  exact: PropTypes.bool,
};

GuestRoute.defaultProps = {
  children: null,
  route: undefined,
  exact: false,
};
