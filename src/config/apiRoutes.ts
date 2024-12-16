//  type RoutesApiType = {
//     [key: string]: {
//         [key: string]: {
//             path: string;
//         } 
//     }
//  }
 
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
        }
    },
    user: {
        resource_post: {
            path: 'post'
        },
    }
 };