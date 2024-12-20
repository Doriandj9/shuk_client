import {IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';


const AppActionLikePost = () => {

    return (
        <>
            <IconButton>
              <span className="text-xs">1.4K</span>
              <FavoriteIcon />
            </IconButton>
        </>
    );
};


export default AppActionLikePost;