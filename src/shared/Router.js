import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import DetailPage from "../pages/DetailPage";

const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage />}/>
            <Route path="detail/:id" element={<DetailPage />}/>
        </Routes>
        </BrowserRouter>
    );
};

export default Router;