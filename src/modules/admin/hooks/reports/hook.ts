import { useQuery } from "@tanstack/react-query";
import { GetDataGlobalReportsParams } from "./reports";
import { getDataGlobalReports } from "./queries";


export const useGetDataGlobalReports = (params: GetDataGlobalReportsParams) => {
    const hook = useQuery({
        queryKey: ['data-reports-global',params],
        queryFn: () => getDataGlobalReports(params)
    });

    return {...hook};
};