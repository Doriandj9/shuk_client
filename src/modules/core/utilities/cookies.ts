import moment from "moment";

export const getCookie = (nameCookie: string): string | null => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === nameCookie) {
            return value;
        }
    }
    return null;
};


export const setCookie = (name: string, value: string, timeExpired: string, path: string='/') => {
    const time = moment(timeExpired).toDate().toUTCString();
    document.cookie = `${name}=${value}; Secure; SameSite=Strict; expires=${time}; path=${path}`;
};

export const deleteCookie = (nameCookie: string) => {
    document.cookie = nameCookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};