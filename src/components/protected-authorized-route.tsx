import React, { FC } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RouteComponentProps } from 'react-router';

export interface IProtectedAuthorizedRouteProps {
  route?: string;
  exact?: boolean;
  path?: string;
}

const ProtectedAuthorizedRoute: FC<IProtectedAuthorizedRouteProps> = (props) => {
  const { children, route, exact } = props;
  const { user } = useSelector((store) => ({
    // @ts-ignore
    user: store.getUserData.user,
  }));

  function render({ location }: RouteComponentProps) {
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
      path={route}
      exact={exact}
      render={render}
    />
  );
};

export default ProtectedAuthorizedRoute;
