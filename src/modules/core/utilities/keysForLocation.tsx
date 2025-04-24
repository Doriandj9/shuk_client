import { KeysPostContext } from "@/modules/web/providers/KeysPosts";
import { useContext } from "react";
import { useParams } from "react-router-dom";



export const useKeysForLocation = () => {
    const {keys: keysPosts} = useContext(KeysPostContext);
    const {id} = useParams();
    const keys = {
        '/': ['posts'],
        '/view/posts/:id': ['posts',id],
        '/interest/:name': keysPosts
    };
    return (location: string, params?: {[key:string]: unknown}): unknown[] => {
        const pathname = new URL(location).pathname;
        const entriesArray = Object.entries(keys);
        const keysParamsArray = Object.keys(params || {});
        const entriesKey = entriesArray.map(([key,value]) => {
            let keyReplace = key;
            keysParamsArray.forEach((param) => {
                if (key.includes(`:${param}`) && params) {
                    keyReplace = keyReplace.replace(`:${param}`, params[param] as string);
                }
            });
            return [keyReplace,value];
        });
    
        const keysSelect = entriesKey.find(([key]) => key === pathname);
    
        if(!keysSelect){
            return keys["/"];
        }
    
        return keysSelect[1] as unknown[];
    };
};
