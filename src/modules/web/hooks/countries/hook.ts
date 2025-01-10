import { useQuery } from "@tanstack/react-query";
import { getCounties } from "./queries";

export const useGetCountries = () => {
    const hook = useQuery({
        queryKey: ['countries'],
        queryFn: getCounties,
        refetchOnWindowFocus: false,
    });

    return {...hook};
};