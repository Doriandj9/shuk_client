type Environment = 'local' | 'prod' | 'test' | 'build';


export type AppConfig = {
    /**
     * @param {string} server url for server api
     */
    server: string;
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
};

export type LanguageAppHook = {
    language: string;
    update: (payload: LanguageApp) => void;
}

