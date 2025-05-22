import { CardContent } from "@mui/material";
import { motion } from "framer-motion";
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type AppDisplayTitlePostProps = {
    content: string | TrustedHTML
};


const AppDisplayTitlePost: React.FC<AppDisplayTitlePostProps> = ({ content }) => {
    const [more, setMore] = useState(false);
    const [isOverflow, setIsOverflow] = useState(false);
    const contentRef = useRef<HTMLParagraphElement>(document.createElement('p'));
    const [t] = useTranslation('core');

    const styleBase: CSSProperties = {
        maxHeight: '3.75rem',
        overflow: 'hidden',
    };
    const styleExpand: CSSProperties = {
        maxHeight: 500,
        overflow: 'auto'
    };

    useEffect(() => {
        if (contentRef.current) {
            setIsOverflow(contentRef.current.scrollHeight > contentRef.current.clientHeight || contentRef.current.scrollWidth > contentRef.current.clientWidth);
        }

    }, [contentRef]);

    return (
        <>
            <CardContent sx={{ marginTop: 0, paddingTop: 0 }}>
                <p
                    ref={contentRef}
                    className="text-title-post dark:text-white"
                    dangerouslySetInnerHTML={{ __html: content }}
                    style={!more ? styleBase : styleExpand}
                />
                {
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
                }
            </CardContent>
        </>
    );
};

export default AppDisplayTitlePost;