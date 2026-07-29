import { IApi, IProductResponse, IOrderRequest, IOrderResult  } from "../types";

export class LarekApi {

  protected api: IApi;

  constructor(api: IApi) {  
    this.api = api;
  }

  public getProducts(): Promise<IProductResponse> {
    return this.api.get<IProductResponse>('/product/')
    // .then((res: IProductResponse) => {
    //   console.log(res)
    //   return {
    //     total: res.total,
    //     items: res.items
    //   }
    // })
  }

  public createOrder(order: IOrderRequest): Promise<IOrderResult> {
    return this.api.post<IOrderResult>('/order/', order, 'POST');
  }
}