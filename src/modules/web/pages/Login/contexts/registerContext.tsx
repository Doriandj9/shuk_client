import { createContext } from "react";



type RegisterContextType = {
    isSuccess: boolean;
    updateState: (state: boolean) => void;
    isLoading?: boolean;
    setLoading?: (state: boolean) => void;
    error?: string | null;
    setError?: (error: string | null) => void;
}


export const RegisterContext = createContext<RegisterContextType>({
    isSuccess: false,
    updateState: () => { },
    isLoading: false,
    setLoading: () => { },
    error: null,
    setError: () => { }
});