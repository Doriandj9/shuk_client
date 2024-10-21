import { PostText } from "@/modules/core/@types/post";
import { CreatePostContext } from "@/modules/core/components/AppNewPost";
import { lettersAndComponents } from "@/modules/core/utilities/lettersAndComponents";
import { KeyboardEvent, useContext, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

const TabPostText = () => {
  const { register, watch } = useFormContext<PostText>();
  const { content, setContent } = useContext(CreatePostContext);
  const refContent = useRef<HTMLParagraphElement | null>(null);

  const handleKeyUp = (e: KeyboardEvent<HTMLParagraphElement>) => {
    const html =  refContent.current?.innerHTML;
    const [letters, components] = lettersAndComponents(
            html || ""
          );
          if (letters > 50 || components > 8) {
            setContent({
              type: content?.type || "PT",
              modifier: {
                style: {
                  ...content?.modifier.style,
                  fontSize: "0.85rem",
                },
              },
              value: { ...content?.value },
            });
          }
          if(refContent.current){
            refContent.current.innerHTML = html || '';
          }
          
  };

  // useEffect(() => {
  //   if (refContent) {
  //     const [letters, components] = lettersAndComponents(
  //       refContent.current?.innerHTML || ""
  //     );
  //     if (letters > 50 || components > 8) {
  //       setContent({
  //         type: content?.type || "PT",
  //         modifier: {
  //           style: {
  //             ...content?.modifier.style,
  //             fontSize: "0.85rem",
  //           },
  //         },
  //         value: { ...content?.value },
  //       });
  //     }
  //   }

  //   setContent({
  //     type: "PT",
  //     modifier: { ...(content?.modifier || { style: {} }) },
  //     value: { ...content?.value },
  //   });
  // }, []);

  return (
    <>
      <div className="flex items-center justify-center w-full h-full relative">
        <div
          data-placeholder=""
          className="app-description-post"
          style={content?.modifier.style}
        >
          <p
            ref={refContent}
            contentEditable
            onKeyUp={handleKeyUp}
            className="app-description-post"
          ></p>
        </div>
      </div>
    </>
  );
};

export default TabPostText;
