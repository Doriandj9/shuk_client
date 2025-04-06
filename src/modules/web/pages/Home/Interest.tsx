import AppLayout from "@/modules/core/layouts/AppLayout";
import { useParams } from "react-router-dom";
import ListPostForCategory from "../../components/ListPostForCategory";

export const Interest = () => {
    const { name } = useParams();
    const url = new URL(window.location.href);
    const id = url.searchParams.get('i');

    return (
        <>
            <AppLayout>
                {
                    id ?
                        <ListPostForCategory category_id={String(id)} />
                        :
                        <ListPostForCategory category_name={name?.replaceAll('_', ' ')} />
                }
            </AppLayout>
        </>
    );
};