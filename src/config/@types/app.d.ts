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
     * @param {string} oAuthId id client use in app 
     */
    oAuthId?: string;
};


export type ThemeOptions = "dark" | "light" | "system";

export type ThemeUI = {
    theme: ThemeOptions;
    update: (payload: ThemeOptions ) => void;
};


export type LanguageApp = 'es' | 'en';


export type LanguageAppHook = {
    language: string;
    update: (payload: LanguageApp) => void;
}

