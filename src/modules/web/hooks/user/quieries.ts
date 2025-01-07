import { routesApi } from "@/config/apiRoutes";
import { api } from "@/config/app";
import { User } from "../../@types/web";

type GetUserInfoForUsernameFn = {
    (username: string):  Promise<User | null>;
};

export const getUserInfoForUsername: GetUserInfoForUsernameFn = async (username: string) => {
    const response = await api.get(routesApi.user.user_info.path.replace('{username}', username));

    return response?.data?.data || null;
};