import { Product } from "../../types";

export class Cart {
  protected items: Product[] = [];  //массив товаров, выбранных покупателем для покупки

  //Добавить товар в корзину
  public addItem(product: Product): void {
    this.items.push(product);
  }

  //Удалить товар
  public removeItem(product: Product): void {
    const index = this.items.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  //Количество товаров
  public getItemsCount(): number {
    return this.items.length;
  }

  //Список товаров
  public getItems(): Product[] {
    return [...this.items];
  }

  //Сумма стоимости товаров
  public getTotalPrice(): number {
    return this.items.reduce((sum, item) => sum + (item.price ?? 0), 0);
  }

  //Узнать о наличие товара
  public hasItemById(id: number | string): boolean {
    return this.items.some(item => item.id === id);
  }
}