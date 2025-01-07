import { webRoutes } from '@/config/webRoutes';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavbarConfig = () => {

    return (
        <>
            <ul>
                <li>
                    <Link to={webRoutes.config_user.children.account.path}>
                        <Button startIcon={<ManageAccountsIcon fontSize='large' />}>
                            Account
                        </Button>
                    </Link>
                </li>
            </ul>
        </>
    );
};

export default NavbarConfig;