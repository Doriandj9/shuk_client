import { styled } from '@mui/material/styles';
import Paper, { PaperProps } from '@mui/material/Paper';
import { Children } from '../@types/core';

type AppItemProps = Children & {
  props?: PaperProps
};
const AppItem: React.FC<AppItemProps> = ({children,props}) => {
    
    const Component = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        height: '100%',
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
          backgroundColor: '#1e293b',
          border: '1px solid rgba(255,255,255,0.15)'
        }),
      }));

    return (<>
    <Component {...props} >
        {children}
    </Component>
    </>);
};

export default AppItem;