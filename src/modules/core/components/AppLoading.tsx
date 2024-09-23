import { app } from "@/config/app";
import { Backdrop, CircularProgress } from "@mui/material";

type AppLoadingProps = {
    isOpen: boolean;
};

const AppLoading: React.FC<AppLoadingProps> = ({isOpen}) => {

    return(
        <>
        <Backdrop
            sx={(theme) => ({ color: app.colors.secondary, zIndex: theme.zIndex.drawer + 1 })}
            open={isOpen}
            >
            <CircularProgress color="inherit" />
        </Backdrop>
        </>
    );
};


export default AppLoading;