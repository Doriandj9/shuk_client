import { useGetInfinityCategories } from "@/modules/admin/hooks/categories/hook";
import { TagCategories } from "./TagCategories";
import { usePostStore } from "@/store/postStore";
import InfinityScrollElement from "@/modules/core/components/InfinityScrollElement";
import AppErrorFetchingPosts from "@/modules/core/components/AppErrorFetchingPosts";
import { AppLoadingNavbarCategory } from "@/modules/core/components/AppLoadingNavbarCategory";
import { useRef } from "react";

// type WrappingTagCategoriesProps = {
//     refElement: React.RefObject<HTMLDivElement>;
// };


export const WrappingTagCategories = () => {
    const cValues = usePostStore((state) => state.categories);
    const setCValues = usePostStore((state) => state.updateCategories);
    const refDiv = useRef<HTMLDivElement>(null);

    const {
        data: categories,
        error,
        fetchNextPage,
        isFetching,
        isFetchingNextPage,
        status
    } = useGetInfinityCategories();

    return (
        <div className="flex-grow flex gap-1 flex-grow flex-wrap h-24 overflow-y-auto" ref={refDiv}>
            {
                <InfinityScrollElement
                    refElement={refDiv}
                    className="flex-grow flex gap-1 flex-grow flex-wrap"
                    elementName="Wrapping"
                    render={(scroll) => {
                        if (scroll.action && !isFetching && status !== 'pending' && !isFetchingNextPage) {
                            scroll.changeStatus({ action: false });
                            fetchNextPage();
                        }

                        return (
                            <>
                                {status && categories?.pages.map(({ data }) => {

                                    return data.map((category) => (
                                        <TagCategories key={category.id} category={category} setCValues={setCValues} cValues={cValues} />
                                    ));
                                })}
                                {status == 'error' && (<AppErrorFetchingPosts error={error} />)}
                                {status != 'error' && status == 'pending' && (<AppLoadingNavbarCategory />)}
                                {status != 'error' && isFetchingNextPage && (<AppLoadingNavbarCategory />)}

                            </>
                        );
                    }}
                />
            }
        </div>

    );
};