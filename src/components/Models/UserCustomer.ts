import { Customer, CustomerErrors } from "../../types";

export class UserCustomer {
  protected payment: 'card' | 'cach' | '' = '';
  protected address: string = '';
  protected phone: string = '';
  protected email: string = '';

  constructor (initialCustomer?: Customer) {
    if (initialCustomer) {
      this.saveData(initialCustomer);
    }
  }

  //Сохранение данных
  public saveData(data: Customer): void {
    if (data.payment !== undefined && data.payment.trim()) this.payment = data.payment;
    if (data.address !== undefined && data.address.trim()) this.address = data.address;
    if (data.phone !== undefined && data.phone.trim()) this.phone = data.phone;
    if (data.email !== undefined && data.email.trim()) this.email = data.email;
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


  //Проверка данных
  public validate(): CustomerErrors {
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

    return errors;
  }

  //Валидация данных
  public isValid(): boolean | CustomerErrors {
    if (Object.keys(this.validate()).length === 0) {
      return true
    } else {
      return this.validate();
    }
  }

}