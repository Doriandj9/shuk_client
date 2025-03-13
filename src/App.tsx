// import { toast } from "sonner";
// import { api } from "./config/app";
import RootRoutes from "./routes/RootRoutes";
// import AppToast from "./modules/core/components/AppToast";
// import { useTranslation } from "react-i18next";
import { useGetCountries } from "./modules/web/hooks/countries/hook";
import { useDataCountries } from "./store/countries";
import { useEffect } from "react";
import { useCategories } from "./store/categories";
import { useGetCategories } from "./modules/admin/hooks/categories/hook";


function App() {
  // const [t] = useTranslation('core');
  const { data , isError } = useGetCountries();
  const { data: categories, isError: hasErrorCategory } = useGetCategories();

  const loadCountries = useDataCountries((state) => state.updateCountries);
  const setError = useDataCountries((state) => state.setIsError);

  const loadCategories = useCategories((state) => state.updateCategories);
  const setErrorCategory = useCategories((state) => state.setIsError);

  useEffect(() => {
      loadCountries(data ?? []);
      loadCategories(categories ?? []);
  }, [data,categories]);

  setError(isError);
  setErrorCategory(hasErrorCategory);

//  api.interceptors.response.use((response) => {
//     return response;
//  },
// (error) => {
//   if (error.request?.status !== 401 && error.response) {
//     // La solicitud fue hecha y el servidor respondió con un código de estado
//     toast.custom((id) => <AppToast id={id} message={error.response?.data?.message} status="error"  />,{
//       duration: 5000,
//       position: 'top-center',
//     });
//   } else if ( error.request?.status !== 401 && error.request) {
//     // La solicitud fue hecha pero no se recibió respuesta
//     if(!error.request.status){
//       toast.custom((id) => <AppToast id={id} message={t('messages.errors.requests.off-server')} status="error"  />,{
//         duration: 5000,
//         position: 'top-center',
//       });

//       return;
//     }

//     toast.custom((id) => <AppToast id={id} message={t('messages.errors.requests.unknown')} status="error"  />,{
//       duration: 5000,
//       position: 'top-center',
//     }); 

//   } else {
//     // Algo ocurrió al configurar la solicitud
//     if (error.request?.status !== 401 ) {
//       toast.custom((id) => <AppToast id={id} message={error.message} status="error"  />,{
//         duration: 5000,
//         position: 'top-center',
//       }); 
//     }
//   }
  
//   // Retornar una promesa rechazada para que el componente pueda manejar el error
//   // return Promise.reject(error);
// },{
//   runWhen(config) {
//     console.log('interceptors',config);
//     return false;
//   },
// }
//);

  return (
    <>
        <RootRoutes />
    </>
  );
}

export default App;
