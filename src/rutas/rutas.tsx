import React from "react";
import { Route, Routes } from 'react-router-dom'
import Home from "../componentes/Home";
import Bingo from "../componentes/Bingo";
import Ventas from "../componentes/Ventas";
import Reportes from "../componentes/Reportes";

const AppRoutes = () => (
    <Routes>
        <Route
            path="/"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Home />
                </React.Suspense>
            }
        />
        <Route
            path="/bingo"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Bingo />
                </React.Suspense>
            }
        />
        <Route
            path="/ventas"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Ventas />
                </React.Suspense>
            }
        />
        <Route
            path="/reportes"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Reportes />
                </React.Suspense>
            }
        />
    </Routes>
)

export default AppRoutes;