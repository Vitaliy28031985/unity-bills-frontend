export interface CostItem {
  id: string;
  _id: string;
  title: string;
  sum: number;

  number?: number;   
  price?: number;   
  
  isShow?: boolean;
  isDelete?: boolean;

  createdAt: string;
  updatedAt: string;
}



export interface CostList {
  id?: string;
  _id: string;

  title: string;      
  owner: string;

  costs: CostItem[];

  sum: number;

  createdAt: string;
  updatedAt: string;

  isShow?: boolean;
  isDelete?: boolean;
}