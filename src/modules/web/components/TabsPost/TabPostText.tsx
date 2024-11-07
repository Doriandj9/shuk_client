import { PostText } from "@/modules/core/@types/post";
import { CreatePostContext } from "@/modules/core/components/AppNewPost";
// import { lettersAndComponents } from "@/modules/core/utilities/lettersAndComponents";
import { KeyboardEvent, useContext, useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

const TabPostText = () => {
  const { register, setValue } = useFormContext<PostText>();
  const { content, setContent } = useContext(CreatePostContext);
  const refContent = useRef<HTMLParagraphElement | null>(null);

  const handleKeyUp = (e: KeyboardEvent<HTMLParagraphElement>) => {

    if (!e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
      const response = {
        type: content?.type || "PT",
        modifier: {
          style: {
            ...content?.modifier.style,
          },
        },
        value: { html: refContent.current?.innerHTML || '' },
      };
      setValue('payloadPost', JSON.stringify(response));
      setContent(response);
    }
  };


  useEffect(() => {
    if (refContent.current && content?.value?.html) {
      refContent.current.focus({ preventScroll: true });
      refContent.current.innerHTML = content?.value?.html;

      const range = document.createRange();
      range.selectNodeContents(refContent.current);
      range.collapse(false);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }, []);

  return (
    <>
    <input type="hidden" {...register('payloadPost')} />
    <input type="hidden" {...register('typePost', {value: 'PT'})} />
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
