import { NotificationModel, PNotifyNewPost } from '@/modules/web/hooks/notifications/notifications';
import React from 'react';
import AppAvatar from './AppAvatar';
import { mergeUserProvider } from '../utilities/mergeUserProvider';
import { userDefault } from '@/config/app';
import { Link } from 'react-router-dom';
import { useUpdateNotifyUser } from '@/modules/web/hooks/notifications/hook';
import { useAuthStore } from '@/store/auth';
import { useLanguageApp } from '@/store/language';

interface UserNotificationProps {
  notification: NotificationModel<PNotifyNewPost>
  timeAgo?: string;
  isMessageNotification?: boolean;
  highlighted?: boolean;
  onClose: CallableFunction
}

const UserNotification: React.FC<UserNotificationProps> = ({
  notification,
  timeAgo,
  isMessageNotification = false,
  onClose
}) => {
  const user = useAuthStore((state) => state.user);
  const lang = useLanguageApp((state) => state.language);
  const { put } = useUpdateNotifyUser(notification.receiver?.id);

  const handleUpdate = () => {
    onClose();
    const data: Partial<NotificationModel<PNotifyNewPost>> = { id: notification.id, doc_status: 'VN' };
    if (notification.receiver?.id === user?.id) {
      put.mutate(data);
    }
  };

  return (
    <Link onClick={handleUpdate} to={notification.payload?.relative_path ?? ''}
      className={`flex items-center justify-between p-2 w-full ${notification.doc_status === 'DR' || notification.doc_status === 'PN'
        ? 'bg-gray-100 dark:bg-slate-400 '
        : 'bg-white dark:bg-slate-500 '}
      rounded-lg shadow-md`}>
      <div className="flex items-center space-x-3">
        <div className="relative">
          <AppAvatar user={mergeUserProvider(notification.sender ?? userDefault)} size='middle' />
          {isMessageNotification && (
            <div className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path>
              </svg>
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            <span className="font-bold">{mergeUserProvider(notification.sender ?? userDefault)?.full_name}</span>
            &nbsp;
            <span className='font-regular' dangerouslySetInnerHTML={{__html: notification?.trans?.languages[lang]?.message ?? notification?.message ?? 's'}}></span>
          </p>
          <p className="text-xs text-gray-500 dark:text-slate-300">{timeAgo}</p>
        </div>
      </div>
      {(notification.doc_status === 'DR' || notification.doc_status === 'PN') && (
        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
      )}
    </Link>
  );
};

export default UserNotification;
