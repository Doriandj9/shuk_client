import { useTranslation } from "react-i18next";
import AppLayout from "../layouts/AppLayout";
import imgPost from '@/assets/img/undraw_wall_post_re_y78d.svg';

const Home = () => {
    const [t] = useTranslation('core');


    return (
        
            <AppLayout>
                <div className="app-container-fade text-sm p-2">
                    <p className="text-mode-primary text-xs  text-center font-semibold">{t('post.introduction')}</p>
                    <div className="app-insert-post">
                        <button className="flex flex-col justify-center">
                            <img src={imgPost} className="w-12 h-12" />
                            <span className="text-mode-primary text-[0.65rem]">{t('post.new')}</span>
                        </button>
                    </div>
                    
                </div>       
            </AppLayout>
    );
};


export default Home;


