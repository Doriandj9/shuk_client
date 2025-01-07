import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CakeIcon from '@mui/icons-material/Cake';
import { useTimeFormatPost } from '@/modules/core/hooks/useTimesFormats';
import { PostIconSvg } from '@/modules/core/components/SVGComponents';
import { useTranslation } from 'react-i18next';
import { User } from '../@types/web';

type ContentInfoProps = {
    countPosts: number;
    user: User | null;
};

const ContentInfo: React.FC<ContentInfoProps> = ({countPosts, user}) => {

    const { format } = useTimeFormatPost('date');
    const [tWeb] = useTranslation('web');

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
                                <ListItemText  primary={user?.phone ?? '___ ___ ___'} />
                                
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <Diversity3Icon color='success'  />
                                </ListItemIcon>
                                <ListItemText primary={user?.nationality ?? '___ ___ ___'}/>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CakeIcon color='info'/>
                                </ListItemIcon>
                                <ListItemText primary={user?.birthday ?
                                    format(typeof user.birthday !== 'string'
                                        ? user.birthday.toDateString() : user.birthday)
                                    : '___ ___ ___'}
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