import { Product } from "../../types";

export class Catalog {
  protected products: Product[] = []; //массив все товаров

  protected selectedProduct: Product | null = null;  //выбранный товар

  constructor(initialProducts: Product[] = []) {  //констурктор дефолтным значение принимает пустой массив
    this.products = initialProducts;
  }

  
  //Получение список товаров 
  public getProducts(): Product[] {
    return [...this.products];
  }

  //Сохранить выбранную карточку
  public saveSelectedProduct(product: Product | null): void {
    this.selectedProduct = product;
  }

  //Получить выбранную карточку
  public getSelectedProduct(): Product | null {
    return this.selectedProduct;
  }

  //Сохранить массив товаров
  public saveProducts(products: Product[]): void {
    this.products = products;
  }
}
