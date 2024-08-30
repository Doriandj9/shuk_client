import React, { Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { Home } from "./lazyRoutes";
import ErrorBoundary from '@core/classes/ErrorBoundary';
import {webRoutes} from '@/config/webRoutes';

export const routeHome:RouteObject= {
 path: webRoutes.home.path,
 element: (
<ErrorBoundary fallback={<div>Error al cargar el componente</div>}>
    <Suspense fallback={<div>Cargando...</div>}>
        <Home />
    </Suspense>
</ErrorBoundary>
 )
};