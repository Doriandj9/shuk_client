import React from "react";
import { ModifierType } from "../@types/post";
import { CardContent } from "@mui/material";
// import { motion } from "framer-motion";
// import { useTranslation } from "react-i18next";

type AppRenderTextPostProps = {
    text: string;
    modifier: ModifierType;
};

const AppRenderTextPost: React.FC<AppRenderTextPostProps> = ({ text,modifier }) => {
    // const [more, setMore] = useState(false);
    // const [isOverflow, setIsOverflow] = useState(false);
    // const contentRef = useRef<HTMLParagraphElement>(document.createElement('p'));
    // const [t] = useTranslation('core');

    // const styleBase: CSSProperties = {
    //     maxHeight: `${(32.25-6.75)}rem`,
    //     overflow: 'hidden',
    // };
    // const styleExpand: CSSProperties = {
    //     maxHeight: 600,
    //     overflow: 'auto'
    // };

    // useEffect(() => {
    //     if (contentRef.current) {
    //         setIsOverflow(contentRef.current.scrollHeight > contentRef.current.clientHeight || contentRef.current.scrollWidth > contentRef.current.clientWidth);
    //     }

    // }, [contentRef]);



    return (
        <>
            <CardContent style={{...modifier.style, ...modifier.styleParagraph}}>
                    <div className="text-container-post border border-mode-slate rounded-md relative overflow-auto scrollable-container flex flex-col justify-center items-center text-center">
                    <div  className="text-sm w-full h-full z-[2]" dangerouslySetInnerHTML={{ __html: text }} />
                </div>
                    {/* {
                    isOverflow &&
                    <span className="font-bold text-mode-primary">
                        {!more ? '...' : ''}
                        <motion.button
                            className="font-bold text-mode-primary"
                            whileHover={{
                                textDecoration: 'underline'
                            }}
                            onClick={() => setMore((state) => !state)}>
                            
                            { !more ? t('messages.labels.post.see-more') : t('messages.labels.post.see-less')}
                        </motion.button>
                    </span>
                } */}
            </CardContent>
        </>
    );
};

export default AppRenderTextPost;