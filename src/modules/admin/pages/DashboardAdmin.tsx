import AppLayout from "@/modules/core/layouts/AppLayout";
import { Outlet } from "react-router-dom";


export const DashboardAdmin = () => {
    
    return (
        <AppLayout isAdmin>
            <Outlet />
        </AppLayout>
    );
};