import { Customer, CustomerErrors, PaymetType } from "../../types";

export class UserCustomer {
  protected payment: PaymetType = '';
  protected address: string = '';
  protected phone: string = '';
  protected email: string = '';

  constructor (initialCustomer?: Customer) {
    if (initialCustomer) {
      this.saveData(initialCustomer);
    }
  }

  //Сохранение данных
  public saveData(data: Partial<Customer>): void {
    if (data.payment !== undefined) this.payment = data.payment;
    if (data.address !== undefined) this.address = data.address;
    if (data.phone !== undefined) this.phone = data.phone;
    if (data.email !== undefined) this.email = data.email;
  }

  //Получение данных
  public getData(): Customer {
    return {
      payment: this.payment,
      address: this.address,
      phone: this.phone,
      email: this.email,
    };
  }

  //очистка данных покупателя
  public clearData(): void {
    this.payment = '';
    this.address = '';
    this.phone = '';
    this.email = '';
  }


  //Проверка данных и Валидация данных
  public validate(): CustomerErrors | boolean  {
    const errors: CustomerErrors = {};

    if (!this.payment.trim()) {
      errors.payment = 'Не выбран вид оплаты';
    }
    if (!this.address.trim()) {
      errors.address = 'Укажите адрес доставки';
    }
    if (!this.phone.trim()) {
      errors.phone = 'Укажите номер телефона';
    }
    if (!this.email.trim()) {
      errors.email = 'Укажите email';
    }
    
    return Object.keys(errors).length > 0 ? errors : true;
   
  }

}