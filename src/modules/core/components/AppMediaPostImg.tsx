import { app } from "@/config/app";
import { PathResourcesType } from "@/modules/web/hooks/post/PostI";
import React, { useEffect, useMemo, useState } from "react";
import { FileRecord } from "../@types/post";
import { convertImg } from "../utilities/img/convert";
import AppEventRenderClickImg from "./AppEventRenderClickImg";

type AppMediaPostImgProps = {
    pathResource: PathResourcesType | null;
    file: FileRecord | null;
    isTemp: boolean | null | undefined;
    fileTem: Blob | null | undefined;
};

const AppMediaPostImg: React.FC<AppMediaPostImgProps> = ({ pathResource, file, isTemp, fileTem }) => {

    const [pathTemp, setPathTemp] = useState<string>('');

    useMemo(() => {
        if (isTemp) {
            convertImg(fileTem || new Blob(), setPathTemp);
        }
    }, []);


    useEffect(() => {
        const elements: HTMLElement[] = Array.from(document.querySelectorAll('img[data-src]'));
        const images: HTMLImageElement[] = [];
        elements.forEach((element) => {
            if (element instanceof HTMLImageElement) {
                images.push(element);
            }
        });

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    Reflect.set(img, 'src', img.getAttribute('data-src') || '');
                    observer.unobserve(img);
                }
            });
        }, { threshold: 0.1 });

        images.forEach((image) => observer.observe(image));

        return () => {
            images.forEach((image) => observer.unobserve(image));
        };
    }, []);

    return (
        <>
            <AppEventRenderClickImg
                pathImg={isTemp ? pathTemp : `${app.base_server}${file?.path}`}
                render={(open) => (
                    <div onClick={open}
                    className={`cursor-pointer ${pathResource?.meta?.typeAspectRadio?.neutral?.value == 'vertical' && pathResource?.meta?.typeAspectRadio?.neutral?.height > 500
                        ? 'content-img-post-vertical' : 'content-img-post'} w-full`} style={{ backgroundColor: pathResource?.meta?.metaColors?.max || 'transparent' }} >
                        <div className="w-full relative flex justify-center items-center h-full">
                            <img className="card-post-img"
                                width={pathResource?.meta?.typeAspectRadio?.neutral?.width}
                                height={pathResource?.meta?.typeAspectRadio?.neutral?.height}
                                src={isTemp ? pathTemp : `${app.base_server}${pathResource?.path}`}
                                data-src={isTemp ? pathTemp : `${app.base_server}${file?.path}`}
                                loading="lazy"
                                alt="Img"
                            />
                        </div>
                    </div>
                )}

            />
        </>
    );
};


export default AppMediaPostImg;