import { TableHelperHook } from "@/modules/core/@types/core";
import { useTranslation } from "react-i18next";
import { User } from "@/modules/web/@types/web";
import AppAvatar from "@/modules/core/components/AppAvatar";
import { mergeUserProvider } from "@/modules/core/utilities/mergeUserProvider";
import { userDefault } from "@/config/app";
import { useTimeFormatPost } from "@/modules/core/hooks/useTimesFormats";

export const useTableHelperCategories: TableHelperHook<User> = (actionFn) => {
    const [t] = useTranslation('web');
    const {format} = useTimeFormatPost('post');

    return {
        columns: [{
            header: 'N°. ',
            render(item, index) {
                return index;
            },
        },{
            header: 'Avatar',
            render(item) {
                return <AppAvatar user={mergeUserProvider(item ?? userDefault)} />;
            },
        }, {
            header: t('columns.users.name'),
            render(item) {
                return `${item?.full_name}`;
            },
        }, {
            header: t('columns.users.username'),
            render(item) {
                return item?.username;
            },
        },{
            header: t('columns.users.email'),
            render(item) {
                return item?.email;
            },
        },{
            header: t('columns.users.phone'),
            render(item) {
                return item?.phone;
            },
        }, {
            header: t('columns.created_at'),
            render(item) {
                return format(item?.created_at ?? null);
            },
        }],
        actions: {
            header: t('columns.actions'),
            // width: '0.5rem',
            list: {
                render: actionFn
            }
        }
    };
};