
export const webRoutes = {
    home: {
        path: '/'
    },
    interest: {
        path: '/interest/:name'
    },
    privacy:{
        path: '/privacy/terms-of-service'
    },
    delete_data: {
        path: 'track-deletion/:code'
    },
    login: {
        path: '/auth/login'
    },
    complete_register: {
        path: '/auth/email-verification/:token'
    },
    forward_password: {
        path: '/auth/forward-password'
    },
    recovery_password: {
        path: '/auth/recovery-password/:token'
    },
    view_posts: {
        path: '/view/posts/:id'
    },
    dashboard_user:{
        path: '/profile/:username'
    },
    config_user: {
        path: '/config/:username',
        children: {
            profile: {
                path: 'profile'
            },
            account: {
                path: 'account'
            },
            password: {
                path: 'password'
            },
            privacy_security:{
                path: 'privacy'
            } 
        }
    },
    dashboard_admin: {
        path: '/dashboard/admin',
        children: {
            statistics: {
                path: 'statistics',
                uri: function(){
                    return `/dashboard/admin/${this.path}`;
                }
            },
            categories: {
                path: 'categories',
                uri: function(){
                    return `/dashboard/admin/${this.path}`;
                }
            },
            users: {
                path: 'users',
                uri: function(){
                    return `/dashboard/admin/${this.path}`;
                }
            },
        }
    }
};