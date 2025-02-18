export const routesApi = {
    public: {
        auth: {
            path: 'security/login'
        },
        auth_provider: {
            path: 'security/login/provider'
        },
        infinity_post: {
            path: 'infinity-posts'
        },
        infinity_comment_post: {
            path: 'infinity-comment-posts/{post_id}'
        },
        shared_post: {
            path: 'shared/post/{id}'
        },
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
        }
    },
    admin: {
        resource_categories: {
            path: 'admin/categories'
        }
    }
 };