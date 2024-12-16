import { Skeleton } from "@mui/material";

const AppLoadingPosts = () => {
  return (
    <>
     {[1,2,3].map((item) => (
         <div key={item} className="app-container-fade text-sm app-container-post min-h-60 p-2 mt-2">
         <div className="h-60 flex flex-col justify-between">
           <div className="flex gap-2">
             <Skeleton variant="circular" width={40} height={40} />
             <div className="w-20">
               <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
             </div>
             <div className="w-20">
               <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
             </div>
           </div>
             <div className="mt-2">
               <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
               <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
               <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
               <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
               <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
               <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
 
             </div>
           <div className="flex gap-2 justify-between">
             <div className="">
             <Skeleton variant="rounded" width={110} height={30}/>
             </div>
             <div className="">
             <Skeleton variant="rounded" width={110} height={30}/>
             </div>
             <div className="">
               <Skeleton variant="rounded" width={110} height={30}/>
             </div>
             <div className="">
             <Skeleton variant="rounded" width={110} height={30}/>
             </div>
           </div>
         </div>
       </div>
     ))}
    </>
  );
};

export default AppLoadingPosts;
