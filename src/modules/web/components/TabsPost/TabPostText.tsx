import { usePostStore } from "@/store/postStore";
import { useMemo, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";


const TabPostText = () => {
  const { register } = useFormContext();
  const {value, updateValueHtm, modifier, type} = usePostStore((state) => state);
  const [t] = useTranslation('web');
  const span = useRef(document.createElement('span'));
  span.current.id = 'span-placeholder-post';
  span.current.className = 'span-placeholder';


  const writeComponenText = (element: HTMLElement) => {
    if(value.html !== '' && value.html.trim() !== '<br>'){
      removePlaceholder();
      onRenderPost(element);
    } else {
      onRenderPost(element);
      onRenderPlaceholder(element);
    }
    element.onkeyup = () => {
      const html = element.innerHTML;
      console.log(html);
      if(html  !== '' && html.trim() !== '<br>'){
        removePlaceholder();
      } else {
        onRenderPlaceholder(element);
      }
      updateValueHtm(html);
    };
  };

  const removePlaceholder = () => {
    document.querySelectorAll('#span-placeholder-post').forEach((element) => element.remove());
  };

  const onRenderPlaceholder = (element: HTMLElement) => {
    const parent = element.parentElement || document.createElement('div');
    const placeholder = parent.dataset.placeholder;
    
    span.current.textContent = placeholder || '';
    element.append(span.current);

  };
  const onRenderPost = (element: HTMLElement) => {
    if(type !== 'PT'){
      return;
    }
    const parent = element.parentElement || document.createElement('div');
    element.innerHTML = value.html;

    const values: [string, string][] = Object.entries(modifier.style);
    
    values.forEach((styles) => {
    const [key, value]: [string, string] = styles;
      Reflect.set(parent.style,key,value);     
    });

    const valuesP: [string, string][] = Object.entries(modifier.styleParagraph);

    valuesP.forEach((styles) => {
      const [key, value]: [string, string] = styles;
        Reflect.set(element.style,key,value);     
      });

  };

  useMemo(() => {
    let element = document.getElementById('post-content-new');
    if (!element) {
      const interval = setInterval(() => {
        element = document.getElementById('post-content-new');
        if (element) {
          writeComponenText(element);
          clearInterval(interval);
        }
      }, 500);
    } else {
      writeComponenText(element);
    }
  },[modifier.style, modifier.styleParagraph,modifier.isModifyBackground, type]);

  console.log(value);
  return (
    <>
      <input type="hidden" {...register('payloadPost')} />
      <input type="hidden" {...register('typePost', { value: 'PT' })} />
      <div className="flex items-center justify-center w-full h-full relative">
        <div
          data-placeholder={t('descriptions.share-idea')}
          className="app-description-post relative"
          
        >
          <p className="app-description-post hidden-scroll text-xl"
          id="post-content-new"
            contentEditable
          ></p>
        </div>
      </div>
    </>
  );
};

export default TabPostText;
