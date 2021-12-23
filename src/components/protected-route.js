import { Redirect, Route } from 'react-router-dom';
import {useSelector} from 'react-redux';

export function ProtectedRoute({ children, ...rest }) {
    const {user} = useSelector(store => ({
        user: store.getUserData.user
    }));
    return <Route {...rest} render={({ location }) =>
        user ? (
            children
        ) : (
            <Redirect
                to={{
                    pathname: '/login',
                    state: { from: location }
                }}
            />
        )
    } />;
}