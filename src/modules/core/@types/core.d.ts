
export type Children = {
    children?: React.ReactNode;
}

export type DocStatus = {
    COMPLETE          : string;
    DRAFT             : string;
    ACTIVE            : string;
    DELETE            : string;
    EDIT              : string;
    COLUMN_NAME?      : string;
};