import AppLayout from "@core/layouts/AppLayout";
import { Children } from "@core/@types/core";

const Login: React.FC<Children> = () => {

    return (<>
        <AppLayout>
            <form action="">
                <label htmlFor="">email</label> <br />
                <input type="email" /><br />
                <label htmlFor="">Clave</label><br />
                <input type="password" /><br />

                <button className="p-2 bg-white">enviar</button>
            </form>
        </AppLayout>
    </>);
};


export default Login;