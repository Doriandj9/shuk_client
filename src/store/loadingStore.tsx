import { create } from 'zustand';

type AppLoadingType = {
    loading: boolean;
    update: (payload: boolean) => unknown;
};

export const useAppLoading  = create<AppLoadingType>()((set) => ({
    loading: false,
    update(payload){
        return set(() => ({
            loading: payload
        }));
    },
}));

