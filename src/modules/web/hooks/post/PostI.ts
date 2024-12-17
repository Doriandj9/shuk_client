import { User } from "@web/@types/web";

export type DocStatusData = 'CO' | 'DR' | 'AC' | 'DL' | 'ED';

type LinksObj = {
  url: string;
  label: string;
  active: boolean;
};

export interface PostData {
    id: number
    title?: string;                         
    description?: string;                  
    date: string;                             
    doc_status: DocStatusData          
    is_active: boolean;                       
    type_post: string;                       
    path_resource?: string;                   
    likes: number;                            
    comments: number;                       
    shared: number;                           
    payload_post?: string;                   
    is_multiple: boolean;                    
    user_id?: number; 
    created_at?: string;                        
    updated_at?: string;                        
    created_by?: number;                     
    updated_by?: number;
    is_temp?:boolean;
    user: User                    
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