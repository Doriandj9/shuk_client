import { Skeleton } from "@mui/material";

export const AppLoadingNavbarCategory = () => {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <div key={item} className="app-container-fade text-sm min-h-10 mt-2 w-full">
          <div className="h-10 flex flex-col justify-between">
            <div className="flex gap-2">
              <Skeleton variant="circular" width={40} height={40} />
              <div className="flex-grow">
              <Skeleton variant="text" width={'100'} sx={{ fontSize: "1rem" }} height={40} />

              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

