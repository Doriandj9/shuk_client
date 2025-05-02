import AppLayout from "@/modules/core/layouts/AppLayout";
import { useParams } from "react-router-dom";



export const DeletedData = () => {
    const { code } = useParams();

    return (
        <AppLayout>
            <div className="w-full h-full">
                <div className="app-container-fade w-full h-full">
                    <div className="w-full h-full flex items-center justify-center flex-col text-mode-slate">
                        <h1>Request Confirmed</h1>
                        <p>Your request to delete your data has been received.</p>
                        <p><strong>Confirmation Code:</strong> {code}</p>
                        <p>Your data will be permanently deleted within 24 hours.</p>

                        <div className="mt-4 text-center">
                            <h1>Solicitud Confirmada</h1>
                            <p>Tu solicitud para eliminar tus datos ha sido recibida.</p>
                            <p><strong>Código de Confirmación:</strong> {code}</p>
                            <p>Tus datos serán eliminados permanentemente dentro de las próximas 24 horas.</p>
                        </div>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
};