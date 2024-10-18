import { PostText } from "@/modules/core/@types/post";
import { CreatePostContext } from "@/modules/core/components/AppNewPost";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const TabPostText = () => {
  const { register } = useFormContext<PostText>();
  const {content} = useContext(CreatePostContext);
 

  
  return (
    <>
      <div className="flex items-center justify-center w-full h-full relative">
        <div
          {...register("description")}
          contentEditable
          className="app-description-post relative"
          style={{...content?.modifier.style}}
        >
            <div className="relative">Hola</div>
        </div>
      </div>
    </>
  );
};

export default TabPostText;
