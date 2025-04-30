import { api } from "@/config/app";
import { GetDataGlobalReports } from "./reports";
import { routesApi } from "@/config/apiRoutes";


export const getDataGlobalReports: GetDataGlobalReports = async (params) => {
    const response = await api.get(routesApi.admin.reports.data_global.path,{
        params
    });

    return response.data?.data;
}; 