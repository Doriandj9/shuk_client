import { CommentData } from "@/modules/web/hooks/comment/CommentI";
import AppAvatar from "./AppAvatar";
import React from "react";
import { mergeUserProvider } from "../utilities/mergeUserProvider";
import { useTimeFormatPost } from "../hooks/useTimesFormats";
import moment from "moment";

type AppDisplayCommentProps = {
    comment: CommentData
};

const AppDisplayComment:React.FC<AppDisplayCommentProps> = ({ comment }) => {
    const {format} = useTimeFormatPost();
    return (
    <>
    <div className="app-container-fade text-sm p-2 mt-2 w-full">
         <div className="h-auto flex flex-col justify-between">
           <div className="flex gap-2">
             <AppAvatar user={mergeUserProvider(comment.user || JSON.parse(comment.payload_user || ''))} />
             <div className="w-full">
               <p className="bg-mode-comment max-h-26 text-sm p-2 overflow-auto rounded-lg mb-2">{comment.description}</p>
               <span className="text-xs text-mode-slate">{format(comment.created_at || moment().format('YYYY-MM-DD HH:mm'))}</span>
             </div>
           </div>
         </div>
       </div>
    </>
    );
};

export default AppDisplayComment;