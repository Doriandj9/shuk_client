import AppLayout from "@/modules/core/layouts/AppLayout";
import { useTranslation } from "react-i18next";



export const TermsOfService = () => {
    const [t] = useTranslation('web');
    const [t_core] = useTranslation('core');

    return (
        <AppLayout>
            <div className="app-container-fade h-full w-full">
                <h2 className="text-xl text-center text-mode-white font-bold pt-2">
                    {t('terms-of-service.privacy-polity.title')}
                </h2>
                <div className="p-2">
                    <p className="text-justify mb-4" dangerouslySetInnerHTML={{ __html: t('terms-of-service.privacy-polity.description') }} />
                    <ol className="list-decimal font-bold pl-6 pr-2 flex flex-col gap-4">
                        <li>
                            {t('terms-of-service.privacy-polity.Definiciones')}
                            <ol className="font-normal pl-6 flex flex-col gap-2" style={{ listStyleType: 'lower-alpha' }}>
                                <li dangerouslySetInnerHTML={{ __html: t('terms-of-service.privacy-polity.a Definiciones') }} />
                                <li dangerouslySetInnerHTML={{ __html: t('terms-of-service.privacy-polity.b Definiciones') }} />
                                <li dangerouslySetInnerHTML={{ __html: t('terms-of-service.privacy-polity.c Definiciones') }} />
                            </ol>
                        </li>
                        <li>
                            {t('terms-of-service.privacy-polity.Requisitos de Edad')}
                            <ol className="font-normal">
                                <li>
                                    {t('terms-of-service.privacy-polity.parrafo requisitos')}
                                </li>
                            </ol>
                        </li>
                        <li>
                            {t('terms-of-service.privacy-polity.Uso del Sitio')}
                            <ol className="font-normal pl-6 flex flex-col gap-2" style={{ listStyleType: 'lower-alpha' }}>
                                <li dangerouslySetInnerHTML={{ __html: t('terms-of-service.privacy-polity.a Uso del Sitio') }} />
                                <li dangerouslySetInnerHTML={{ __html: t('terms-of-service.privacy-polity.b Uso del Sitio') }} />
                                <li dangerouslySetInnerHTML={{ __html: t('terms-of-service.privacy-polity.c Uso del Sitio') }} />
                            </ol>
                        </li>
                        <li>
                            {t('terms-of-service.privacy-polity.Registro')}
                            <ol className="font-normal pl-6 flex flex-col gap-2" style={{ listStyleType: 'lower-alpha' }}>
                                <li dangerouslySetInnerHTML={{ __html: t('terms-of-service.privacy-polity.a Registro') }} />
                                <li dangerouslySetInnerHTML={{ __html: t('terms-of-service.privacy-polity.b Registro') }} />
                                <li dangerouslySetInnerHTML={{ __html: t('terms-of-service.privacy-polity.c Registro') }} />
                                <li dangerouslySetInnerHTML={{ __html: t('terms-of-service.privacy-polity.d Registro') }} />
                            </ol>
                        </li>
                        <li>
                            {t('terms-of-service.privacy-polity.Protección de Datos Personales')}
                            <ol className="font-normal pl-6 flex flex-col gap-2" style={{ listStyleType: 'lower-alpha' }}>
                                <li dangerouslySetInnerHTML={{ __html: t('terms-of-service.privacy-polity.a Protección de Datos Personales') }} />
                                <li dangerouslySetInnerHTML={{ __html: t('terms-of-service.privacy-polity.b Protección de Datos Personales') }} />
                            </ol>
                        </li>
                        <li>
                            {t('terms-of-service.privacy-polity.Propiedad Intelectual')}
                            <ol className="font-normal">
                                <li>
                                    <p dangerouslySetInnerHTML={{ __html: t('terms-of-service.privacy-polity.parrafo Propiedad Intelectual') }} />
                                </li>
                            </ol>
                        </li>

                        <li>
                            {t('terms-of-service.privacy-polity.Prohibiciones de usuarios')}
                            <ol className="font-normal pl-6 flex flex-col gap-2" style={{ listStyleType: 'lower-alpha' }}>
                                <li dangerouslySetInnerHTML={{ __html: t('terms-of-service.privacy-polity.a Prohibiciones de usuarios') }} />
                                <li dangerouslySetInnerHTML={{ __html: t('terms-of-service.privacy-polity.b Prohibiciones de usuarios') }} />
                                <li dangerouslySetInnerHTML={{ __html: t('terms-of-service.privacy-polity.c Prohibiciones de usuarios') }} />
                            </ol>
                        </li>

                        <li>
                            {t('terms-of-service.privacy-polity.Modificaciones y Terminación')}
                            <ol className="font-normal pl-6 flex flex-col gap-2" style={{ listStyleType: 'lower-alpha' }}>
                                <li dangerouslySetInnerHTML={{ __html: t('terms-of-service.privacy-polity.a Modificaciones y Terminación') }} />
                                <li dangerouslySetInnerHTML={{ __html: t('terms-of-service.privacy-polity.b Modificaciones y Terminación') }} />
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