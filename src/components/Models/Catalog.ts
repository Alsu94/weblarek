import { Product } from "../../types";
import { IEvents } from "../base/Events";

export class Catalog {
  protected products: Product[] = []; //массив все товаров

  protected selectedProduct: Product | null = null;  //выбранный товар

  constructor(protected events: IEvents, initialProducts: Product[] = []) {  //констурктор дефолтным значение принимает пустой массив
    this.products = initialProducts;
  }

  
  //Получение список товаров 
  public getProducts(): Product[] {
    return [...this.products];
  }

  //Сохранить выбранную карточку
  public saveSelectedProduct(product: Product): void {
    this.selectedProduct = product;

    this.events.emit('card:select', { id: product.id });
  }

  //Получить выбранную карточку
  public getSelectedProduct(): Product | null {
    return this.selectedProduct;
  }

  //Сохранить массив товаров
  public saveProducts(products: Product[]): void {
    this.products = products;

    this.events.emit('items:changed', { items: this.products });
  }

  //Поиск товара по id
  public getProductId(productId: string): Product | undefined {
    const index = this.products.findIndex(item => item.id === productId);
    return (index !== -1) ? this.products[index] : undefined
  } 
}
