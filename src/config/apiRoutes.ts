export const routesApi = {
    public: {
        view_post: {
            path: '/view-post/{id}'
        },
        auth: {
            path: 'security/login'
        },
        auth_provider: {
            path: 'security/login/provider'
        },
        infinity_post: {
            path: 'infinity-posts'
        },
        search_infinity_posts: {
            path: 'search/posts-full-infinity'
        },
        infinity_comment_post: {
            path: 'infinity-comment-posts/{post_id}'
        },
        shared_post: {
            path: 'shared/post/{id}'
        },
        initial_register: {
            path: 'security/initial-register'
        },
        complete_register: {
            path: 'security/complete-register'
        },
        forward_password: {
            path: 'security/forward-password'
        },
        recovery_password: {
            path: 'security/recovery-password/{token}'
        },
        reset_password: {
            path: 'security/reset-password'
        },
        app_platform: {
            path: 'settings/app-platform'
        },
        not_emails: {
            path: 'not-notifications-emails'
        }
    },
    user: {
        resource_post: {
            path: 'post'
        },
        resource_comment: {
            path: 'comment/post'
        },
        logout:{
            path: 'security/logout'
        },
        infinity_posts: {
            path: 'infinity-posts/user/{username}'
        },
        user_info: {
            path: 'user-info/{username}'
        },
        config: {
            path: 'user-config'
        },
        update_settings: {
            path: 'settings-update-user'
        },
        resource_notifies: {
            path: 'notifications/user'
        },
        put_all_notifies_draft: {
            path: 'notifications/user/all/draft/{user_id}'
        },
        action_app: {
            path: 'app-action/{type}'
        }
    },
    admin: {
        resource_categories: {
            path: 'admin/categories'
        },
        users: {
            path: 'admin/users'
        },
        reports: {
            data_global: {
                path: 'admin/reports/data/post'
            }
        }
    }
 };