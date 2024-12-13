import { toast } from "sonner";
import AppToast from "../components/AppToast";
import { AppToastT } from "../@types/core";


type ShowToastArgs = { message: string; status?: "error" | "info" | "success" | "warning"; id?: number} & AppToastT;

type ShowFn = {
    (args: ShowToastArgs): void;
}
type ShowToastFn = {
    (): {show: ShowFn};
};

export const useAppToast: ShowToastFn = () => {

    const show: ShowFn = (args) => {
        const {message, status,...toastProps} = args;
        if(!toastProps.duration){
            toastProps.duration = 3000;
        }

        if(!toastProps.position){
            toastProps.position = 'top-center';
        }
        
        toast.custom((id) => <AppToast id={id} message={message} status={status || 'info'} />, toastProps);
    };

    return { show };
};