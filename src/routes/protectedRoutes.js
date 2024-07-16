import { Navigate, Outlet } from "react-router-dom";
import store from '../redux/store';

const protectedRoutes = () => {
    const isLoggedIn = store.getState()?.auth?.user;

    return(
        isLoggedIn ?
            <Outlet />
        :
            <Navigate to="/" />
    )
}

export default protectedRoutes;