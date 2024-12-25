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
        }
    },
    user: {
        resource_post: {
            path: 'post'
        },
        resource_comment: {
            path: 'comment/post'
        }
    }
 };