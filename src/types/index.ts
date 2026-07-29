export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';


export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface Product {
    id: string;                
    title: string;
    image: string;
    category: string;
    price: number | null;
    description?: string;
}

export type PaymetType = 'card' | 'cach' | '';

export interface Customer {
    payment: PaymetType;
    address: string;
    email: string;
    phone: string;
}

export type CustomerErrors = Partial<Record<keyof Customer, string>>


export interface IProductResponse {
    total: number;     
    items: Product[];
}

export interface IOrderRequest extends Customer {
    items: string[]; 
    total: number;
}

export interface IOrderResult {
    id: string; 
    total: number;
}


