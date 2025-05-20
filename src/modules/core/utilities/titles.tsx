import { webRoutes, StructureBasicRoutesWeb, ResultsResources } from "@/config/webRoutes";
import { useTranslation } from "react-i18next";


const recursiveSetObjet = (route: StructureBasicRoutesWeb, container: { [x: string]: string; }[]) => {

    const result = {
        [route.uri ? route.uri() : route.path]: route.title
    };

    container.push(result);

    if (!route.children) {
        return;
    }

    Object.entries(route.children)
        .forEach((routes) => {
            const route = routes[1];
            recursiveSetObjet(route, container);
        });
};


export const useSetAppTitle = () => {
    const [t] = useTranslation('core');


    const setTitleApp = (pathname: string) => {
        const objRoutes: { [x: string]: ResultsResources; }[] = [];
        Object.entries(webRoutes)
            .forEach((routes) => {
                const route = routes[1];
                recursiveSetObjet(route, objRoutes);
            });
        const objTitle = objRoutes.find((res) => Reflect.has(res, pathname) || Reflect.has(res, `/${pathname}`));

        const title = objTitle ? objTitle[pathname] ?? objTitle[`/${pathname}`] : '';
        if(title !== ''){
            document.title = `${t(title)} | SHUK `;
        }
           

    };

    return {setTitleApp};
};

export const setAppTitle = (title: string) => {
     document.title = `${title} | SHUK `;
};