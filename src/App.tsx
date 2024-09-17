import { api } from "./config/app";
import RootRoutes from "./routes/RootRoutes";


function App() {
 api.interceptors.response.use((response) => {
    return response;
 },
(error) => {
  if (error.response) {
    // La solicitud fue hecha y el servidor respondió con un código de estado
    console.error('Error en la respuesta:', error.response.data);
  } else if (error.request) {
    // La solicitud fue hecha pero no se recibió respuesta
    console.error('Error en la solicitud:', error.request);
  } else {
    // Algo ocurrió al configurar la solicitud
    console.error('Error en la configuración de la solicitud:', error.message);
  }
  
  // Retornar una promesa rechazada para que el componente pueda manejar el error
  // return Promise.reject(error);
}
);
  return (
    <>
        <RootRoutes />
    </>
  );
}

export default App;
