import { CSSProperties } from "react";

export type TypesPost = {
    TEXT : 'PT',
    IMG  : 'PI',
    VIDEO: 'PV'
};

export type PostImage = {
    description?: string | null;  
    typePost: 'PI';
    file: Blob;
    payloadPost: string;

};

export type PostText = {
    description?: string;  
    typePost: 'PT';
    payloadPost: string;
};

export type PostVideo = {
    description?: string;  
    typePost: 'PV';
    file: Blob;
    payloadPost: string;
};

export type ModifierType = {
    style: CSSProperties;
    isModifyBackground: boolean;
    styleParagraph: CSSProperties;
}


export type ContentFormPost = {
    type: 'PT' | 'PI' | 'PV';
    modifier: ModifierType;
    value: {
        html: string;
    };
  };

  export type PostTypesBack = 'PT' | 'PI' | 'PV';

  export type ContentFormPostHook = ContentFormPost & {
    type: PostTypesBack;
    modifier: ModifierType;
    value: {
        html: string;
        file?: Blob | null;
    };
    updateType: (payload: PostTypesBack) => unknown,
    updateModifierStyle: (payload: CSSProperties) => unknown,
    updateModifierBg: (payload: boolean) => unknown,
    updateModifierStilePrg: (payload: CSSProperties) => unknown,
    updateValueHtm: (payload: string) => unknown,
    updateValueFile: (payload: Blob | null) => unknown
  };