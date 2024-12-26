import { Skeleton } from "@mui/material";

const AppLoadingComments = () => {
  return (
    <>
     {[1,2,3].map((item) => (
         <div key={item} className="app-container-fade text-sm min-h-20 p-2 mt-2 w-full">
         <div className="h-20 flex flex-col justify-between">
           <div className="flex gap-2">
             <Skeleton variant="circular" width={40} height={40} />
             <div className="mt-2 w-full">
               <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
               <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
               <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
               <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
             </div>
           </div>
         </div>
       </div>
     ))}
    </>
  );
};

export default AppLoadingComments;
