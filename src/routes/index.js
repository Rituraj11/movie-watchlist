import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MyList from "../pages/MyList.js";
import ViewDetails from "../pages/ViewDetails/index.js";

import ProtectedRoutes from "./protectedRoutes.js";

const FrontRoutes = () => {
    return(
        <Routes>
            <Route index path="/" element={<Home />} />

            <Route element={<ProtectedRoutes />}>
                <Route index path="/mylist" element={<MyList />} />
                <Route index path="/view/:id" element={<ViewDetails />} />
            </Route>
        </Routes>
    )
}

export default FrontRoutes;