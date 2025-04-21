import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CakeIcon from '@mui/icons-material/Cake';
import { useTimeFormatPost } from '@/modules/core/hooks/useTimesFormats';
import { PostIconSvg } from '@/modules/core/components/SVGComponents';
import { useTranslation } from 'react-i18next';
import { User } from '../@types/web';
import { useDataCountries } from '@/store/countries';
import { useLanguageApp } from '@/store/language';
import { Link } from 'react-router-dom';
import { webRoutes } from '@/config/webRoutes';
import ConfigAddIcon from '@mui/icons-material/SettingsApplications';
import { useAuthStore } from '@/store/auth';

type ContentInfoProps = {
    countPosts: number;
    user: User | null;
};

const ContentInfo: React.FC<ContentInfoProps> = ({ countPosts, user }) => {

    const { format } = useTimeFormatPost('date');
    const appLanguage = useLanguageApp((state) => state.language);
    const [tWeb] = useTranslation('web');
    const countries = useDataCountries((state) => state.countries);
    const selectCountry = countries.find((country) => country.alpha2Code === user?.nationality);
    const nameCountry = appLanguage === 'en' ? selectCountry?.name : selectCountry?.translations[appLanguage];
    const settings = user?.config;
    const isLogin = useAuthStore((state) => state.isLogin);
    const userAuth = useAuthStore((state) => state.user);

    const redirectConfigComponent = <>
        <span className='flex gap-2 items-end'>
            ___ ___ ___
            {
            (isLogin && user?.id === userAuth?.id) &&
            <span className='flex'>
                <Link target='_blank'
                    className='hover:bg-slate-100 text-xs px-1 rounded-lg dark:hover:bg-slate-400'
                    to={webRoutes.config_user.path.replace(':username', user?.username ?? '') + '/' +
                        webRoutes.config_user.children.profile.path
                    }>
                    {tWeb('login.labels.add')}
                    <ConfigAddIcon fontSize='small' />
                </Link>
            </span>
            }

        </span>
    </>;

    return (
        <>
            <div className="w-full flex gap-2">
                <div className="w-1/2">
                    <section>
                        <h4 className="text-lg text-mode-slate text-center">{tWeb('descriptions.details')}</h4>
                        <List >
                            <ListItem>
                                <ListItemIcon>
                                    <PhoneIphoneIcon color='primary' />
                                </ListItemIcon>
                                <ListItemText primary={settings?.hidden_phone_number
                                    ? '___ ___ ___' : user?.phone ?? redirectConfigComponent} />

                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Diversity3Icon color='success' />
                                </ListItemIcon>
                                <ListItemText primary={nameCountry ?? redirectConfigComponent} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CakeIcon color='info' />
                                </ListItemIcon>
                                <ListItemText primary={user?.birthday ?
                                    format(typeof user.birthday !== 'string'
                                        ? user.birthday.toDateString() : user.birthday)
                                    : redirectConfigComponent}
                                />
                            </ListItem>
                        </List>
                    </section>
                </div>
                <div className="w-1/2">
                    <section>
                        <h4 className='text-lg text-mode-slate text-center'>{tWeb('descriptions.statistics')}</h4>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <PostIconSvg className='w-8 h-8' />
                                </ListItemIcon>
                                <ListItemText primary={tWeb('descriptions.posts')} secondary={countPosts} />
                            </ListItem>
                        </List>
                    </section>
                </div>
            </div>
        </>
    );
};


export default ContentInfo;