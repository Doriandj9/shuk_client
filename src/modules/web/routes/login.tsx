import React, { Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { Login } from "./lazyRoutes";
import ErrorBoundary from '@core/classes/ErrorBoundary';

export const routeLogin:RouteObject= {
 path: '/auth/login',
 element: (
<ErrorBoundary fallback={<div>Error al cargar el componente</div>}>
    <Suspense fallback={<div>Cargando...</div>}>
        <Login />
    </Suspense>
</ErrorBoundary>
 )
};