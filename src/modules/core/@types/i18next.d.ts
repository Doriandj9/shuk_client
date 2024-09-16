import Resources from './resources';
import ResourcesWeb from '@/modules/web/@types/resources';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNs: 'esCore',
        resources: Resources & ResourcesWeb;
    }
}
