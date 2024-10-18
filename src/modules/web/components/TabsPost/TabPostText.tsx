import { PostText } from "@/modules/core/@types/post";
import { useFormContext } from "react-hook-form";

const TabPostText = () => {
  const { register } = useFormContext<PostText>();

  return (
    <>
      <div className="flex items-center justify-center w-full h-full relative">
        <div
          {...register("description")}
          contentEditable
          aria-placeholder="sdadas"
          className="app-description-post"
        >
          {/* <div className="app-content-a-post"></div> */}
        </div>
      </div>
    </>
  );
};

export default TabPostText;
