
export type DocStatusData = 'CO' | 'DR' | 'AC' | 'DL' | 'ED';

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
    created_by?: number;                     
    updated_by?: number;                    
  }