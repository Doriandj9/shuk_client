import AppDisplayPost from "@/modules/core/components/AppDisplayPost";
import AppErrorFetchingPosts from "@/modules/core/components/AppErrorFetchingPosts";
import AppLoadingPosts from "@/modules/core/components/AppLoadinPosts";
import AppNotPosts from "@/modules/core/components/AppNotPosts";
import InfinityScroll from "@/modules/core/components/InfinityScroll";
import { useGetInfinityPosts } from "@web/hooks/post/hooks";


const ListPost = () => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useGetInfinityPosts();

  return (
    <>
      <InfinityScroll
        render={(scroll) => {
          if (scroll.action && !isFetching && status !== 'pending' && !isFetchingNextPage) {
            scroll.changeStatus({ action: false });
            fetchNextPage();
          }

          return (
            <div className="flex flex-col gap-2 md:items-center">
              {data?.pages.map(({ data: posts }) => {
                return posts.map((post) => (
                  <div
                    className={`app-container-fade text-sm mt-2 
                      ${post?.path_resource?.meta?.typeAspectRadio?.neutral?.value == 'vertical' && post?.path_resource?.meta?.typeAspectRadio?.neutral?.height > 500
                         ? 'app-container-post-vertical' : 'app-container-post'}`}
                    key={post.id}
                  >
                    <AppDisplayPost post={post} />
                  </div>
                ));
              })}
              {status == 'error' && (<AppErrorFetchingPosts error={error} />)}
              {status != 'error' && status == 'pending' && (<AppLoadingPosts />)}
              {status != 'error' && isFetchingNextPage && (<AppLoadingPosts />)}
              {status !== 'error' && !isFetching && !hasNextPage && (
                <div className="mt-4">
                  <AppNotPosts />
                </div>
              )}
            </div>
          );
        }}
      />
    </>
  );
};

export default ListPost;
