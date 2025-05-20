type Environment = 'local' | 'prod' | 'test' | 'build';


export type AppConfig = {
    /**
     * @param {string} server url for server api
     */
    server: string;
    /**
     * @param {string} url base for server
     */
    base_server: string;
    /**
     * @param {object} colors full colors for webapp
     */
    colors: {
        primary: string;
        secondary: string;
        ternary: string;
        optional?: string;
    };
    /**
     * @param {Environment} environment mode app 
     */
    environment: Environment;
    /**
     * @param {string} oAuthIdGoogle id client google use in app 
     */
    oAuthIdGoogle?: string;
    /**
     * @param {string} oAuthIdFacebook id client facebook use in app 
     */
    oAuthIdFacebook?: string;
    /**
     * @param {string} apiV version the api server
     */
    apiV: string;
     /**
     * @param {string} apiV version the api server
     */
    socialProviders: SocialProvidersValues;

    /**
     * @param {string} apiWhatsAppHost host for api whatsapp
     */
    apiWhatsAppHost: string;

    /**
     * @param {string} shareFacebookHost host for api facebook
     */
    shareFacebookHost: string;

    /**
     * @param {string} host host for me app public app
     */

    host: string;

    /**
     * @param {number} timeRefetchInterval time for interval refetch requests
     */
    timeRefetchInterval?: number;
    /**
     * @param {string} emailContact contact for app email
     */
    emailContact?: string;
};


export type ThemeOptions = "dark" | "light" | "system";

export type ThemeUI = {
    theme: ThemeOptions;
    update: (payload: ThemeOptions ) => void;
};


export type LanguageApp = 'es' | 'en';

export type ModulesApp = 'web' | 'core';

export type SocialProvidersValues = {
    google: 1;
    facebook: 2;
    whatsapp: 3;
};

export type LanguageAppHook = {
    language: LanguageApp;
    update: (payload: LanguageApp) => void;
}

