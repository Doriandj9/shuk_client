
export const webRoutes = {
    home: {
        path: '/'
    },
    login: {
        path: '/auth/login'
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
        }
    }
};