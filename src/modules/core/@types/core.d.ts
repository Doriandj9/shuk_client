import React from "react";

export type Children = {
    children?: React.ReactNode;
}

export type DocStatus = {
    COMPLETE: 'CO';
    DRAFT: 'DR';
    ACTIVE: 'AC';
    DELETE: 'DL';
    EDIT: 'ED';
    VIEW_NOTIFY: 'VN';
    PENDING_NOTIFY: 'PN';
    NOT_SHOW_NOTIFY: 'NS'
    COLUMN_NAME?: 'doc_status';
};

type ToastTypes = 'normal' | 'action' | 'success' | 'info' | 'warning' | 'error' | 'loading' | 'default';
type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';

interface Action {
    label: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    actionButtonStyle?: React.CSSProperties;
}
type PromiseT<Data = unknown> = Promise<Data> | (() => Promise<Data>);

interface ToastClassnames {
    toast?: string;
    title?: string;
    description?: string;
    loader?: string;
    closeButton?: string;
    cancelButton?: string;
    actionButton?: string;
    success?: string;
    error?: string;
    info?: string;
    warning?: string;
    loading?: string;
    default?: string;
    content?: string;
    icon?: string;
}

interface AppToastT {
    id?: number | string;
    title?: string | React.ReactNode;
    type?: ToastTypes;
    icon?: React.ReactNode;
    jsx?: React.ReactNode;
    richColors?: boolean;
    invert?: boolean;
    closeButton?: boolean;
    dismissible?: boolean;
    description?: React.ReactNode;
    duration?: number;
    delete?: boolean;
    important?: boolean;
    action?: Action | React.ReactNode;
    cancel?: Action | React.ReactNode;
    onDismiss?: (toast: ToastT) => void;
    onAutoClose?: (toast: ToastT) => void;
    promise?: PromiseT;
    cancelButtonStyle?: React.CSSProperties;
    actionButtonStyle?: React.CSSProperties;
    style?: React.CSSProperties;
    unstyled?: boolean;
    className?: string;
    classNames?: ToastClassnames;
    descriptionClassName?: string;
    position?: Position;
}


export type ResponseSuccessApi<T> = {
    code: number;
    status: boolean;
    message: 'OK',
    data: T
};

export type ResponseCreateApi<T> = {
    code: number;
    status: true;
    message: 'Resource created successfully.' | string,
    data: T
};

export type ResponseUpdateApi<T> = {
    code: number;
    status: true;
    message: 'Resource updated successfully.' | string,
    data: T
};

export type ResponseDeleteApi<T> = {
    code: number;
    status: true;
    message: 'Resource deleted successfully.' | string,
    data: T
};

export type ResponseErrorApi = {
    code: number;
    status: false;
    message: 'An error occurred on the server, please try again later.' | string,
    _error: string
};

type ColumnsTableHelper<TData> = {
    header: string;
    render: {
        (item?: TData, index?: number): React.ReactNode
    };
};

export type ActionListTableHelper<TItem> = {
    render?: (item: TItem, index?:number) => React.ReactNode;
};

export type ResultTableHelperHook<TData> = {
    columns: ColumnsTableHelper<TData>[];
    actions: {
        header: string;
        list: ActionListTableHelper<TData> | undefined;
        width?: string;
    }
};
export type TableHelperHook<T> = {
    (action?: ActionListTableHelper<T>['render']): ResultTableHelperHook<T>;
};