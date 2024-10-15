import { Children } from "../@types/core";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const AppAdapterPicker: React.FC<Children> = ({children}) => {


    return (
        <>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      {children}
    </LocalizationProvider>
        </>
    );
};


export default AppAdapterPicker;