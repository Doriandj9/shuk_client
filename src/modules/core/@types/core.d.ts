import React from "react";

export type Children = {
    children?: React.ReactNode;
}

export type DocStatus = {
    COMPLETE          : 'CO';
    DRAFT             : 'DR';
    ACTIVE            : 'AC';
    DELETE            : 'DL';
    EDIT              : 'ED';
    COLUMN_NAME?      : 'doc_status';
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