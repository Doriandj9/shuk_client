import { toast } from "sonner";
import AppToast from "../components/AppToast";


export const showError = (error: Error, time?: number) => {
    const er = Reflect.has(Reflect.get(error, 'response') ?? {}, 'data') ? Reflect.get(Reflect.get(error, 'response'), 'data') : undefined;
    toast.custom((id) => <AppToast id={id} message={er?.message || error.message} status={'error'}  />, {
        position: 'top-center',
        duration: time ?? 3000
    });
};