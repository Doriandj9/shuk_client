import { routeLogin } from '@/modules/web/routes/login';
import { routeHome } from '@web/routes/home';
import { RouteObject } from 'react-router-dom';


export const routesApp: RouteObject[] = [
    routeHome,routeLogin
];