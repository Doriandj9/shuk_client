import { CommentData } from "@/modules/web/hooks/comment/CommentI";
import AppAvatar from "./AppAvatar";
import React from "react";
import { mergeUserProvider } from "../utilities/mergeUserProvider";
import { useTimeFormatPost } from "../hooks/useTimesFormats";
import moment from "moment";
import { Link } from "react-router-dom";
import { webRoutes } from "@/config/webRoutes";

type AppDisplayCommentProps = {
  comment: CommentData
  idPost: string;
};

const AppDisplayComment: React.FC<AppDisplayCommentProps> = ({ idPost, comment }) => {
  const { format } = useTimeFormatPost();
  const [isCurrent, setIsCurrent] = React.useState<null | string>(null);
  const uri = new URL(window.location.href);
  const idComment = uri.searchParams.get('cm');

  React.useEffect(() => {
    const id = atob(idComment || '');
    if (id) {
      const identElement = `post-${idPost}-comment-${id}`;
      const element = document.getElementById(identElement);
      setIsCurrent(identElement);
      setTimeout(() => {
        setIsCurrent(null);
      }, 3000);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

  }, [idComment]);

  return (
    <>
      <div id={`post-${idPost}-comment-${comment.id}`} className={`app-container-fade text-sm p-2 mt-2 w-full ${isCurrent === `post-${idPost}-comment-${comment.id}` ? 'animate-pulse border-2 border-mode-slate' : ''}`}>
        <div className="h-auto flex flex-col justify-between">
          <div className="flex gap-2">
            <Link to={webRoutes.dashboard_user.path.replace(':username',mergeUserProvider(comment.user || JSON.parse(comment.payload_user || ''))?.username ?? '___')}>
            <AppAvatar user={mergeUserProvider(comment.user || JSON.parse(comment.payload_user || ''))} />
            </Link>
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