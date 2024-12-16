import AppLoadingPosts from "@/modules/core/components/AppLoadinPosts";
import InfinityScroll from "@/modules/core/components/InfinityScroll";
import { useGetInfinityPosts } from "@web/hooks/post/hooks";


const ListPost = () => {
  const {
    data,
    error,
    fetchNextPage,
    // hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    
  } = useGetInfinityPosts();

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
              {status == 'error' && (<p>{error.message}</p>)}
              {status == 'pending'  && (<AppLoadingPosts />)}
              {isFetchingNextPage && (<AppLoadingPosts />)}
            </div>
          );
        }}
      />
    </>
  );
};

export default ListPost;
