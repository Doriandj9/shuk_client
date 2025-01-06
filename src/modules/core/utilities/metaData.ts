import { app } from "@/config/app";
import { webRoutes } from "@/config/webRoutes";
import { PostData } from "@/modules/web/hooks/post/PostI";
import { serializeText } from "./lettersAndComponents";
import { appLoadImage } from "./img/convert";


export const setMetaData = (post: PostData) => {
    const header = document.head;
    const meta = `
    <meta property="og:url"                content="${app.host}${webRoutes.view_posts.path.replace(':id', String(post.id))}" />
    <meta property="og:type"               content="article" />
    <meta property="og:title"              content="Post for Shunk" />
    <meta property="og:description"        content="${serializeText(post.description || post.title || '')}" />
    <meta property="og:image"              content="${appLoadImage(post.img?.path || '')}" />
    `;

    header.insertAdjacentHTML('afterbegin',meta);
};
