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

  console.log('render p', data?.pages);
  return (
    <>
      <InfinityScroll
        render={(scroll) => {
          if(scroll.action && !isFetching && status !== 'pending' && !isFetchingNextPage){
            scroll.changeStatus({action: false});
            fetchNextPage();
          }

          return (
            <div className="flex flex-col gap-2 md:items-center">
              {data?.pages.map(({ data: posts }) => {
                return posts.map((post) => (
                  <div
                    className="app-container-fade text-sm app-container-post p-2 h-[18rem] mt-2"
                    key={post.id}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: post.description || "N/A",
                      }}
                    ></div>
                    Post={post.id}
                  </div>
                ));
              })}
              {status == 'error' && (<AppErrorFetchingPosts error={error} />)}
              {status != 'error' && status == 'pending'  && (<AppLoadingPosts />)}
              {status != 'error' && isFetchingNextPage && (<AppLoadingPosts />)}
              {status !== 'error' && !isFetching  && !hasNextPage && <AppNotPosts />}
            </div>
          );
        }}
      />
    </>
  );
};

export default ListPost;
