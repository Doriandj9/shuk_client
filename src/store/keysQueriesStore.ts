import { create } from 'zustand';

type QueriesKeyStoreType = {
    posts: unknown[];
    updatePostKeys: (payload: unknown[]) => unknown;
};

export const useQueriesKeyStore = create<QueriesKeyStoreType>()((set) => ({
        posts: ['posts', {per_page: '2',category_name: undefined, category_id: undefined}],
        updatePostKeys: (payload)  => set(() => ({
            posts: payload
        })),
    }
));