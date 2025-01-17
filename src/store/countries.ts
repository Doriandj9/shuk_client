import { create } from 'zustand';
import { Country } from '@/modules/web/hooks/countries/CountriesI';

const defCountries: Country[] = [];

type CountriesI = {
    countries: Country[];
    isError: boolean;
    updateCountries: (payload: Country[]) => unknown;
    setIsError: (payload: boolean) => unknown;
};

export const useDataCountries = create<CountriesI>()((set) => ({
        countries: defCountries,
        isError: false,
        updateCountries: (payload)  => set(() => ({
            countries: payload
        })),
        setIsError: (payload)  => set((state) => ({
            ...state,
            isError: payload
        })),    
    }
));