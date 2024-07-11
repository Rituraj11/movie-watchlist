import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MyList from "../pages/MyList.js";

const FrontRoutes = () => {
    return(
        <Routes>
            <Route index path="/" element={<Home />} />
            <Route index path="/mylist" element={<MyList />} />
        </Routes>
    )
}

export default FrontRoutes;