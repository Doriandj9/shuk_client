import React, { Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { Login } from "./lazyRoutes";
import ErrorBoundary from '@core/classes/ErrorBoundary';
import {webRoutes} from '@/config/webRoutes';

export const routeLogin:RouteObject= {
 path: webRoutes.login.path,
 element: (
<ErrorBoundary fallback={<div>Error al cargar el componente</div>}>
    <Suspense fallback={<div></div>}>
        <Login />
    </Suspense>
</ErrorBoundary>
 )
};