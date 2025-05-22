import AppLayout from "@/modules/core/layouts/AppLayout";
import { useTranslation } from "react-i18next";



export const Privacy = () => {
    const [t] = useTranslation('web');
    const [t_core] = useTranslation('core');

    return (
        <AppLayout>
            <div className="app-container-fade h-full w-full">
                <h2 className="text-xl text-center text-mode-white font-bold pt-2">
                    {t('privacy.privacy-polity.title')}
                </h2>
                <div className="p-2">
                    <ol className="list-decimal font-bold pl-6 pr-2 flex flex-col gap-4">
                        <li>
                            {t('privacy.privacy-polity.Proteccion de Datos Personales')}
                            <ol className="font-normal pl-6 flex flex-col gap-2" style={{ listStyleType: 'lower-alpha' }}>
                                <li dangerouslySetInnerHTML={{__html: t('privacy.privacy-polity.a proteccion')}} />
                            </ol>
                        </li>
                        <li>
                            {t('privacy.privacy-polity.Requisitos de Edad')}
                            <ol className="font-normal">
                               <li>
                                {t('privacy.privacy-polity.parrafo requisitos')}
                               </li>
                            </ol>
                        </li>
                        <li>
                            {t('privacy.privacy-polity.Seguridad Tecnica')}
                            <ol className="font-normal pl-6 flex flex-col gap-2" style={{ listStyleType: 'lower-alpha' }}>
                                <li dangerouslySetInnerHTML={{__html: t('privacy.privacy-polity.a seg tec')}} />
                                <li dangerouslySetInnerHTML={{__html: t('privacy.privacy-polity.b seg tec')}} />
                                <li dangerouslySetInnerHTML={{__html: t('privacy.privacy-polity.c seg tec')}} />
                                <li dangerouslySetInnerHTML={{__html: t('privacy.privacy-polity.d seg tec')}} />
                                <li dangerouslySetInnerHTML={{__html: t('privacy.privacy-polity.e seg tec')}} />
                            </ol>
                        </li>
                        <li>
                            {t('privacy.privacy-polity.Privacidad de Sesiones')}
                            <ol className="font-normal">
                               <li>
                                {t('privacy.privacy-polity.parrafo sesiones')}
                               </li>
                            </ol>
                        </li>
                        <li>
                            {t('privacy.privacy-polity.Transparencia y Control')}
                            <ol className="font-normal pl-6 flex flex-col gap-2" style={{ listStyleType: 'lower-alpha' }}>
                                <li dangerouslySetInnerHTML={{__html: t('privacy.privacy-polity.a transparencia')}} />
                                <li dangerouslySetInnerHTML={{__html: t('privacy.privacy-polity.b transparencia')}} />
                                <li dangerouslySetInnerHTML={{__html: t('privacy.privacy-polity.c transparencia')}} />
                            </ol>
                        </li>
                        <li>
                            {t('privacy.privacy-polity.Modificaciones y Terminación')}
                            <ol className="font-normal pl-6 flex flex-col gap-2" style={{ listStyleType: 'lower-alpha' }}>
                                <li dangerouslySetInnerHTML={{__html: t('privacy.privacy-polity.a modificadores')}} />
                                <li dangerouslySetInnerHTML={{__html: t('privacy.privacy-polity.b modificadores')}} />
                            </ol>
                        </li>
                    </ol>

                    <div className="mt-6">
                        <div className="flex flex-col items-center text-center  font-semibold">
                                <h4>Ing. Gonzalo Guanipatín</h4>
                                <h5>{t_core('titles.manager-digital-educas')}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};