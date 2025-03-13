import { ContentFormPost, FileRecord, PostTypesBack } from "@/modules/core/@types/post";
import { User } from "@web/@types/web";

export type DocStatusData = 'CO' | 'DR' | 'AC' | 'DL' | 'ED' | 'TM';

type LinksObj = {
  url: string;
  label: string;
  active: boolean;
};

type MetaColorsType = {
  max: string | null;
  middle: string | null;
  min: string | null;
}

export type RadioBackType = {
  value: string;
  width: number;
  height: number;
  formule: null;
  not_standard?: boolean;
};



type TypeAspectRadioType = {
  [key : string] : RadioBackType;
};

export interface MetaInfoImg {
  aspectRadio: string | null;
  typeAspectRadio: TypeAspectRadioType | null;
  width: number;
  height: number;
  needContainer: boolean;
  metaColors: MetaColorsType;
  isResize: boolean;
}

export type PathResourcesType = {
  path: string;
  meta: MetaInfoImg
}

export interface PostData {
    id: number | string;
    title?: string;                         
    description?: string;                  
    date: string;                             
    doc_status: DocStatusData          
    is_active: boolean;                       
    type_post: PostTypesBack;                       
    path_resource?: PathResourcesType | null;                   
    likes: number;                            
    comments: number;                       
    shared: number;                           
    payload_post?: ContentFormPost | null;                   
    is_multiple: boolean;                    
    user_id?: number; 
    created_at?: string;                        
    updated_at?: string;                        
    created_by?: number;                     
    updated_by?: number;
    is_temp?:boolean;
    user: User;
    files: FileRecord[] | null;
    img: FileRecord | null;        
    file_temp?: Blob;
    your_liked?: boolean;         
    total_likes?: number;
    your_post?: boolean;
  }


export interface PostDataInfinity {
  current_page: number;
  data: PostData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: LinksObj[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export type ParamsPostInfinityFn = {
  per_page: string;
  page?: number;
  category_id?: string;
  category_name?: string;
};

export type getPostsFn = {
    (params: ParamsPostInfinityFn ): Promise<PostDataInfinity>
};