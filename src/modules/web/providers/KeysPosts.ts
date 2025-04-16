import { createContext, Dispatch, SetStateAction } from "react";
import { ParamsPostInfinityFn } from "../hooks/post/PostI";

type KeysPostContextType = {
    keys: unknown[];
    setKeys: Dispatch<SetStateAction<ParamsPostInfinityFn[]>>;
};

export const KeysPostContext =  createContext<KeysPostContextType>({keys: [], setKeys: () => {}});