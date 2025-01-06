import { app } from "@/config/app";

type ConvertImgFn = {
    (img: Blob, objResult?: object | null , key?: string | null ): void;
    (img: Blob, setValue?: (value: string | ArrayBuffer | null) => void): void;
};


export const convertImg: ConvertImgFn = (img, setValueOrObjResult, key=null) =>{
    const reader = new FileReader();

    reader.onload = () => {
        const urlImg = reader.result;
        if(setValueOrObjResult && typeof setValueOrObjResult === 'function'){
            setValueOrObjResult(urlImg);
            return;
        }

        if(setValueOrObjResult && typeof setValueOrObjResult === 'object' && typeof key === 'string'){
            Reflect.set(setValueOrObjResult,key,urlImg);
        }
        
    };

    reader.readAsDataURL(img);
};

export const appLoadImage = (pathImage: string): string => {
    const path = `${app.base_server}${pathImage}`;
    return path;
}; 