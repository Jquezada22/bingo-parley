import React from "react";
import { Route, Routes } from 'react-router-dom'
import Home from "../componentes/auth/Home";
import Bingo from "../componentes/auth/Bingo";
import Ventas from "../componentes/Ventas";
import Participantes from "../componentes/auth/Participantes";

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
            path="/participantes"
            element={
                <React.Suspense fallback={<div>Loading...</div>}>
                    <Participantes />
                </React.Suspense>
            }
        />
    </Routes>
)

export default AppRoutes;