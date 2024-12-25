import { User } from "../../@types/web";
import { DocStatusData, PostData } from "../post/PostI";


export interface CommentData {
    id?: number | string;
    post_id?: number | string | null;
    user_id?: number;
    reply_comment_id?: number | string | null;
    description: string;
    status?: DocStatusData;
    is_active?: boolean;
    likes: number;
    replies: number;
    payload_user?: string | null;
    post?: PostData;
    user?: User;
    replyComment?: CommentData;
}