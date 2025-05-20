import Resources from "@/modules/core/@types/resources";

type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`;

type NestedKeys<T> = {
    [K in keyof T]: T[K] extends string
    ? K & string
    : `${K & string}${DotPrefix<NestedKeys<T[K]>>}`;
}[keyof T];

export type ResultsResources = NestedKeys<Resources['core']>;


export type StructureBasicRoutesWeb = {
    path: string;
    title: string;
    uri?: CallableFunction;
    children?: {
        [p: string]: StructureBasicRoutesWeb
    }
};

export type WebRoutesType = {
    [key: string]: StructureBasicRoutesWeb
};

export const webRoutes = {
    home: {
        path: '/',
        title: 'titles.home',
    },
    not_mails: {
        path: '/not/mails',
        title: 'titles.not_mails'
    },
    interest: {
        path: '/interest/:name',
        title: '',
    },
    privacy: {
        path: '/privacy/terms-of-service',
        title: 'titles.terms-service',

    },
    delete_data: {
        path: 'track-deletion/:code',
        title: '',

    },
    login: {
        path: '/auth/login',
        title: 'mobile.menu.login',

    },
    complete_register: {
        path: '/auth/email-verification/:token',
        title: '',

    },
    forward_password: {
        path: '/auth/forward-password',
        title: 'titles.forward-password',

    },
    recovery_password: {
        path: '/auth/recovery-password/:token',
        title: '',

    },
    view_posts: {
        path: '/view/posts/:id',
        title: '',

    },
    dashboard_user: {
        path: '/profile/:username',
        title: '',

    },
    config_user: {
        path: '/config/:username',
        title: '',

        children: {
            profile: {
                path: 'profile',
                title: '',
                uri() {
                    return `${this.path}`;
                }

            },
            account: {
                path: 'account',
                title: '',
                uri() {
                    return `${this.path}`;
                }

            },
            password: {
                path: 'password',
                title: '',
                uri() {
                    return `${this.path}`;
                }

            },
            privacy_security: {
                path: 'privacy',
                title: '',
                uri() {
                    return `${this.path}`;
                }

            }
        }
    },
    dashboard_admin: {
        path: '/dashboard/admin',
        title: 'titles.dashboard-admin',

        children: {
            statistics: {
                path: 'statistics',
                title: 'titles.dashboard-admin-statistics', 
                uri: function () {
                    return `/dashboard/admin/${this.path}`;
                }
            },
            categories: {
                path: 'categories',
                title: 'titles.dashboard-admin-categories', 
                uri: function () {
                    return `/dashboard/admin/${this.path}`;
                }
            },
            users: {
                path: 'users',
                title: 'titles.dashboard-admin-users',

                uri: function () {
                    return `/dashboard/admin/${this.path}`;
                }
            },
        }
    }
};