import { webRoutes } from '@/config/webRoutes';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Link } from 'react-router-dom';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SecurityIcon from '@mui/icons-material/Security';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useTranslation } from 'react-i18next';

const NavbarConfig = () => {
    const [t] = useTranslation('web');

    return (
        <>
            <ul className='app-container-fade'>
                <li>
                    <Link
                        className='app-link-menu rounded-tl-xl rounded-tr-xl'
                        to={webRoutes.config_user.children.account.path}>
                        <ManageAccountsIcon />
                        <span className=''>{t('descriptions.account')}</span>
                    </Link>
                </li>
                <li>
                    <Link  className='app-link-menu'
                    to={webRoutes.config_user.children.profile.path}>
                        <ModeEditIcon />
                        <span className=''>{t('descriptions.profile')}</span>
                    </Link>
                </li>
                <li>
                    <Link  className='app-link-menu'
                    to={webRoutes.config_user.children.password.path}>
                        <LockResetIcon />
                        <span className=''>{t('descriptions.password')}</span>
                    </Link>
                </li>
                <li>
                    <Link  className='app-link-menu rounded-bl-xl rounded-br-xl'
                    to={webRoutes.config_user.children.privacy_security.path}>
                        <SecurityIcon />
                        <span className=''>{t('descriptions.privacy-safety')}</span>
                    </Link>
                </li>
            </ul>
        </>
    );
};

export default NavbarConfig;