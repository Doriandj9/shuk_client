import { create } from 'zustand';
import { CategoriesModelType } from '@/modules/admin/hooks/categories/categories';

const defCountries: CategoriesModelType[] = [];

type CategoriesI = {
    categories: CategoriesModelType[];
    isError: boolean;
    updateCategories: (payload: CategoriesModelType[]) => unknown;
    setIsError: (payload: boolean) => unknown;
};

export const useCategories = create<CategoriesI>()((set) => ({
        categories: defCountries,
        isError: false,
        updateCategories: (payload)  => set(() => ({
            categories: payload
        })),
        setIsError: (payload)  => set((state) => ({
            ...state,
            isError: payload
        })),    
    }
));