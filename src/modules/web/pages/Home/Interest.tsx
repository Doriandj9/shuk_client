import AppLayout from "@/modules/core/layouts/AppLayout";
import { useParams } from "react-router-dom";
import ListPostForCategory from "../../components/ListPostForCategory";
import { setAppTitle } from "@/modules/core/utilities/titles";

export const Interest = () => {
    const { name } = useParams();
    const url = new URL(window.location.href);
    const id = url.searchParams.get('i');
    setAppTitle(name ?? 'Categories');
    return (
        <>
            <AppLayout>
                {
                    id ?
                        <ListPostForCategory category_id={String(id)} />
                        :
                        <ListPostForCategory category_name={name?.toLocaleLowerCase()?.replaceAll('_', ' ')} />
                }
            </AppLayout>
        </>
    );
};