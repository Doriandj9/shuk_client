import Resources from './resources';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNs: 'esCore',
        resources: Resources;
    }
}
