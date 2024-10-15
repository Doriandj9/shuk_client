import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Children } from '../@types/core';

const AppItem: React.FC<Children> = ({children}) => {
    
    const Component = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
          backgroundColor: '#1e293b',
        }),
      }));

    return (<>
    <Component>
        {children}
    </Component>
    </>);
};

export default AppItem;