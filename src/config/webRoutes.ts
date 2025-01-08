
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
    }
};