import React from 'react';
import AppAvatar from './AppAvatar';
import { mergeUserProvider } from '../utilities/mergeUserProvider';
import { Link } from 'react-router-dom';
import { webRoutes } from '@/config/webRoutes';
import { User } from '@/modules/web/@types/web';
import { Avatar } from '@mui/material';

interface ShowListsPostProps {
  postId: number | string;
  picture?: string;
  title: string;
  timeAgo?: string;
  isPostText?: boolean;
  highlighted?: boolean;
  onClose: CallableFunction,
  user: User 
}

const ShowListsPost: React.FC<ShowListsPostProps> = ({
  postId,
  picture,
  title,
  timeAgo,
  onClose,
  user
}) => {

  const handleUpdate = () => {
    onClose();
  };

  return (
    <Link onClick={handleUpdate} to={webRoutes.view_posts.path.replace(':id', String(postId))}
      className={`flex items-center justify-between p-2 w-ful bg-white dark:bg-slate-500 rounded-lg shadow-md`}>
      <div className="flex items-center space-x-3">
        <div className="relative">
          {
            picture ? 
            <Avatar
                alt={'icon'}
                src={picture}
                sx={{ width: 32, height: 32, objectFit: 'cover' }}
            />
            :
            <AppAvatar user={mergeUserProvider(user)} size='middle' />
          }
          {/* {isMessageNotification && (
            <div className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path>
              </svg>
            </div>
          )} */}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            &nbsp;
            <span className='font-regular'>{title}</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-slate-300">{timeAgo}</p>
        </div>
      </div>
    </Link>
  );
};

export default ShowListsPost;
