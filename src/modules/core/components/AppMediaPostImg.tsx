import { app } from "@/config/app";
import { PathResourcesType } from "@/modules/web/hooks/post/PostI";
import React, { useEffect, useMemo, useState } from "react";
import { FileRecord } from "../@types/post";
import { convertImg } from "../utilities/img/convert";

type AppMediaPostImgProps = {
    pathResource: PathResourcesType | null;
    file: FileRecord | null;
    isTemp: boolean | null | undefined;
    fileTem: Blob | null | undefined; 
};

const AppMediaPostImg: React.FC<AppMediaPostImgProps> = ({ pathResource, file, isTemp, fileTem }) => {
    
    const [pathTemp, setPathTemp] = useState<string>('');

    useMemo(() => {
        if(isTemp){
            convertImg(fileTem || new Blob(),setPathTemp);
        }
    },[]);


    useEffect(() => {
        const elements: HTMLElement[] = Array.from(document.querySelectorAll('img[data-src]'));
         const images: HTMLImageElement[] = [];
         elements.forEach((element) => {
                if(element instanceof HTMLImageElement){
                    images.push(element);
                }
         });

        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              Reflect.set(img,'src',img.getAttribute('data-src') || '');
              observer.unobserve(img);
            }
          });
        }, { threshold: 0.1 });
        
        images.forEach((image) => observer.observe(image));
    
        return () => {
          images.forEach((image) => observer.unobserve(image));
        };
      }, []);

      console.log(pathResource?.meta.metaColors?.max || 'transparent');
    return (
        <>
        <div className="content-img-post"  style={{backgroundColor: pathResource?.meta.metaColors?.max || 'transparent'}}>
            <div className={`${pathResource?.meta.typeAspectRadio?.unknown?.not_standard ? 'w-10/12 m-auto' : 'no-standar'}`}
            >
                <img className="card-post-img"
                src={isTemp ? pathTemp : `${app.base_server}${pathResource?.path}`} 
                data-src={isTemp ? pathTemp : `${app.base_server}${file?.path}`} 
                loading="lazy"
                alt="Img"
                />

            </div>
        </div>
        </>
    );
};


export default AppMediaPostImg;