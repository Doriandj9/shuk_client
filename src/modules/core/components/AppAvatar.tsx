import { Avatar } from "@mui/material";
import profileImg from "@/assets/img/profile.png";
import { useAuthStore } from "@/store/auth";
import { User } from "@/modules/web/@types/web";
import React from "react";

type AppAvatarProps = {
    size?: 'small' | 'middle' | 'large' | 'big' | 'profile';
    user?: null | User;
};


const sizeAvatar = {
    'small': {width: 28, height: 28, container: 'w-8 h-8'},
    'middle': {width: 32, height: 32, container: 'w-9 h-9'},
    'large': {width: 44, height: 44, container: 'w-12 h-12'},
    'big': {width: 48, height: 48, container: 'w-14 h-14'},
    'profile': {width: 78, height: 78, container: 'w-20 h-20'}
};

const AppAvatar: React.FC<AppAvatarProps> = ({size='middle', user=null}) => {
    const {user: userStore} = useAuthStore((state) => state);

    if(user){
        return (<DisplayAvatar size={size} user={user} />);
    }

    return (<DisplayAvatar size={size} user={userStore} />);
};


const DisplayAvatar: React.FC<AppAvatarProps> = ({size='middle',user}) => {

    const currentSize = sizeAvatar[size];
    return (<>
        <div className={`${currentSize.container} border-2 border-slate-200 rounded-full flex justify-center items-center`}>
            <Avatar
                alt={user?.full_name || 'Unknown'}
                src={user?.photo || profileImg}
                sx={{ width: currentSize.width, height: currentSize.height, objectFit: 'cover' }}
            />
        </div>
    </>);
};

export default AppAvatar;