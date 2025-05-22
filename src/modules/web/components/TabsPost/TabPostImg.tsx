import { usePostStore } from "@/store/postStore";
import { Divider } from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import DropPost from "../DropPost";


const TabPostImg = () => {
  const { value, updateValueHtm, modifier, type } = usePostStore((state) => state);
  const [t] = useTranslation('web');
  const [message, setMessage] = useState('');
  const span = <span className="span-placeholder top-10">{message}</span>;

  const writeComponenText = (element: HTMLElement) => {
    if (value.html !== '' && value.html.trim() !== '<br>') {
      removePlaceholder();
      onRenderPost(element);
    } else {
      onRenderPost(element);
      onRenderPlaceholder(element);
    }
    element.oninput = () => {
      const html = element.innerHTML;
      if (html !== '' && html.trim() !== '<br>') {
        removePlaceholder();
      } else {
        onRenderPlaceholder(element);
      }
      updateValueHtm(html);
    };
  };

  const removePlaceholder = () => {
    setMessage('');
  };

  const onRenderPlaceholder = (element: HTMLElement) => {
    const parent = element.parentElement || document.createElement('div');
    const placeholder = parent.dataset.placeholder;

    setMessage(placeholder || '');

  };
  const onRenderPost = (element: HTMLElement) => {
    if (type !== 'PI') {
      return;
    }
    element.innerHTML = value.html;

    const valuesP: [string, string][] = Object.entries(modifier.styleParagraph);
    valuesP.filter((item) => {
      const [a, b]: [string, string] = item;
      if (a == 'display' && b === 'flex' ||
        a === 'justifyContent' && b === 'center' ||
        a === 'alignItems' && b === 'center'
      ) {
        return false;
      }

      return true;
    }).forEach((styles) => {
      const [key, value]: [string, string] = styles;
      Reflect.set(element.style, key, value);
    });

  };

  useMemo(() => {
    let element = document.getElementById('post-content-new-video');
    if (!element) {
      const interval = setInterval(() => {
        element = document.getElementById('post-content-new-video');
        if (element) {
          writeComponenText(element);
          clearInterval(interval);
        }
      }, 500);
    } else {
      console.log('video', type);
      writeComponenText(element);
    }
  }, [modifier.style, modifier.styleParagraph, modifier.isModifyBackground, type]);

  return (
    <>
      <div className="flex flex-col app-container-grid-media-post">
        <div
          data-placeholder={t('descriptions.share-idea')}
          className="flex flex-col relative  h-20"
        >
          <p className="app-description-input hidden-scroll h-20"
            id="post-content-new-video"
            contentEditable
          ></p>
          {span}
          <div className="my-2">
            <Divider />
          </div>
        </div>
        <div className="flex-grow shadow-lg place-self-stretch">
          <DropPost />
        </div>
      </div>
    </>
  );
};

export default TabPostImg;
