import { useQuery } from "@tanstack/react-query";
import { getUserInfoForUsername } from "./quieries";

export const useGetInfoForUsername = (username: string) => {
    const hook = useQuery({
        queryKey: ['user', username],
        queryFn: () => getUserInfoForUsername(username),
        enabled: username !== ''
    });

    return {...hook};
};