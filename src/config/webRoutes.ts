export type ResultsResources =
    | 'header.search-placeholder'
    | 'header.search-posts'
    | 'header.login'
    | 'header.thanks-like'
    | 'header.not like'
    | 'menu.menu'
    | 'menu.profile'
    | 'menu.home'
    | 'menu.posts'
    | 'menu.statistics'
    | 'menu.messages'
    | 'menu.notifications'
    | 'menu.users'
    | 'post.introduction'
    | 'post.new'
    | 'messages.errors.requests.off-server'
    | 'messages.errors.requests.unknown'
    | 'messages.errors.post.not-type'
    | 'messages.errors.post.not-payload'
    | 'messages.errors.post.not-file'
    | 'messages.errors.post.server'
    | 'messages.errors.comment.not-payload'
    | 'messages.errors.comment.server'
    | 'messages.errors.comment.min-length'
    | 'messages.errors.shared.copy-link'
    | 'messages.labels.post.click-here'
    | 'messages.labels.post.end-posts'
    | 'messages.labels.post.see-more'
    | 'messages.labels.post.see-less'
    | 'messages.labels.post.view-post'
    | 'messages.labels.post.shared'
    | 'messages.labels.post.hidden'
    | 'messages.labels.post.delete'
    | 'messages.labels.post.edit'
    | 'messages.labels.post.download-image'
    | 'messages.labels.comment.write'
    | 'messages.labels.comment.send'
    | 'messages.labels.comment.comments'
    | 'messages.labels.comment.end-comments'
    | 'messages.labels.notifications.end-notifications'
    | 'messages.labels.app.dark'
    | 'messages.labels.app.light'
    | 'messages.labels.app.system'
    | 'messages.labels.app.update-success'
    | 'messages.labels.app.loading'
    | 'messages.labels.app.close'
    | 'messages.labels.app.return'
    | 'messages.labels.app.sure-continue'
    | 'messages.labels.app.not-resource'
    | 'messages.labels.app.privacy'
    | 'messages.labels.app.conditions'
    | 'messages.success.post.created'
    | 'messages.success.post.updated'
    | 'messages.success.post.deleted'
    | 'messages.success.comment.created'
    | 'messages.success.comment.updated'
    | 'messages.success.comment.deleted'
    | 'messages.success.shared.share'
    | 'messages.success.shared.copy-link'
    | 'messages.success.shared.link-copied'
    | 'messages.success.category.created'
    | 'messages.success.category.updated'
    | 'messages.success.category.deleted'
    | 'mobile.menu.configuration'
    | 'mobile.menu.login'
    | 'mobile.menu.logout'
    | 'mobile.menu.account-settings'
    | 'mobile.menu.administration'
    | 'mobile.menu.notifications'
    | 'titles.home'
    | 'titles.terms-service'
    | 'titles.forward-password'
    | 'titles.dashboard-admin'
    | 'titles.dashboard-admin-statistics'
    | 'titles.dashboard-admin-categories'
    | 'titles.dashboard-admin-users'
    | 'titles.not_mails'
    | 'titles.privacy-policy'
    | 'titles.terms-service';



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
        path: '/privacy/privacy-policy',
        title: 'titles.privacy-policy',

    },
    terms_of_service: {
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