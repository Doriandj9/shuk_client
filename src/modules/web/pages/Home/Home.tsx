import { useTranslation } from "react-i18next";
import AppLayout from "@core/layouts/AppLayout";
import imgPost from '@/assets/img/undraw_wall_post_re_y78d.svg';
import {motion} from 'framer-motion';

const Home = () => {
    const [t] = useTranslation('core');


    return (
        
            <AppLayout>
                <div className="app-container-fade text-sm p-2">
                    <p className="text-mode-primary  text-xs md:text-sm  text-center font-semibold">{t('post.introduction')}</p>
                    <div className="app-insert-post">
                        <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 1.1 }}
                            drag="x"
                            dragConstraints={{ left: -100, right: 100 }} className="flex flex-col justify-center">
                            <img 
                                src={imgPost}
                                className="w-12 h-12 ml-1" />
                            <span className="text-mode-secondary text-[0.50rem] md:text-[0.75rem] font-black">
                                {t('post.new')}
                            </span>
                        </motion.button>
                    </div>
                    
                </div>       
            </AppLayout>
    );
};


export default Home;


