import { IconButton } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';

const AppActionCommentsPost = () => {

    return (
        <>
            <IconButton>
                <span className="text-xs">1</span>
                <CommentIcon color="primary" />
            </IconButton>
        </>
    );
};


export default AppActionCommentsPost;