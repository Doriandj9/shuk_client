

export const convertImg = (img: Blob, objResult: object | null =null, key: string | null =null) =>{
    const reader = new FileReader();

    reader.onload = () => {
        const urlImg = reader.result;
        if(objResult && key){
            Reflect.set(objResult,key,urlImg);
        }
    };

    reader.readAsDataURL(img);
};