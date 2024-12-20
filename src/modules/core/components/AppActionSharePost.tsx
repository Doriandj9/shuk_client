import { IconButton } from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';


const AppActionSharePost = () => {

    return (
        <>
            <IconButton>
                <span className="text-xs">1</span>
                <ShareIcon color="success" />
            </IconButton>
        </>
    );
};


export default AppActionSharePost;