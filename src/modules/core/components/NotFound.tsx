import { Button } from "@mui/material";
import AppLayout from "../layouts/AppLayout";
import not_found from '@/assets/img/No Connection.svg';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { webRoutes } from "@/config/webRoutes";

export const NotFound = () => {
    const [t] = useTranslation('core');
    const navigate = useNavigate();

    return (
        <AppLayout>
            <div className="flex h-full w-full app-container-fade justify-center items-center">
                <div className="flex flex-col items-center">
                    <div>
                        <img src={not_found} alt="404" className="w-60 h-60" />
                    </div>
                    <div>
                        <h2 className="text-mode-slate text-3xl text-center">404</h2>
                        <p>
                           {
                            t('messages.labels.app.not-resource')
                           }
                        </p>
                        <div className="flex justify-center w-60 mt-4">
                            <Button variant="contained" color="warning"
                            fullWidth
                                onClick={() => navigate(webRoutes.home.path)}
                            >
                                {t('messages.labels.app.return')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};