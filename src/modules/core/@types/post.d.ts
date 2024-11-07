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
}


export type ContentFormPost = {
    type: 'PT' | 'PI' | 'PV',
    modifier: ModifierType,
    value: {
        html: string;
    }
  };