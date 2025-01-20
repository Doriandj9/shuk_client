import { toast } from "sonner";
import AppToast from "../components/AppToast";
import { AppToastT } from "../@types/core";
import moment from "moment";
import { useTranslation } from "react-i18next";

export type SuccessFnToast = (response: object | null) => unknown;

type ToastPromiseFn = {
    (
        promise: Promise<unknown>,
        successMs: string, errorMs?: string,
        successFn?: SuccessFnToast,
        errorFn?: CallableFunction
    ): void;
};

type ShowToastArgs = { message: string; status?: "error" | "info" | "success" | "warning"; id?: number } & AppToastT;

type ShowFn = {
    (args: ShowToastArgs): void;
}
type ShowToastFn = {
    (): { show: ShowFn, toastPromise: ToastPromiseFn };
};

export const useAppToast: ShowToastFn = () => {
    const [t] = useTranslation('core');

    const show: ShowFn = (args) => {
        const { message, status, ...toastProps } = args;
        if (!toastProps.duration) {
            toastProps.duration = 3000;
        }

        if (!toastProps.position) {
            toastProps.position = 'top-center';
        }

        toast.custom((id) => <AppToast id={id} message={message} status={status || 'info'} />, toastProps);
    };



    const toastPromise: ToastPromiseFn = (promise, successMs, errorMs, scFn, erFn) => {
        const idToast = moment().unix();

        toast.promise(promise, {
            id: idToast,
            loading: <AppToast id={idToast} message={t('messages.labels.app.loading')} fullWidth status="loading" />,
            success: (response) => {
                if (scFn) {
                    if( typeof response === 'object' || response === null ){
                        scFn(response);
                    }
                }
                return <AppToast id={idToast} message={successMs ?? t('messages.labels.app.update-success')} fullWidth status="success" />;
            },
            error(err) {

                if (erFn) {
                    erFn();
                }

                return <AppToast id={idToast} message={errorMs ?? err?.response?.data?.message ?? err?.message} fullWidth status="error" />;
            },

            style: {
                margin: 0,
                padding: 0,
                border: 'none',
                outline: 0
            },
            position: 'top-center'
        });
    };

    return { show, toastPromise };
};