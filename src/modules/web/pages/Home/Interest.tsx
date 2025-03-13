import AppLayout from "@/modules/core/layouts/AppLayout";
import ListPost from "../../components/ListPost";
import { useParams } from "react-router-dom";


export const Interest = () => {
    const { name } = useParams();
    const url = new URL(window.location.href);
    const id = url.searchParams.get('i');



    return (
        <>
            <AppLayout>
                {
                    id ?
                        <ListPost category_id={String(id)} />
                        :
                        <ListPost category_name={name?.replaceAll('_', ' ')} />
                }
            </AppLayout>
        </>
    );
};