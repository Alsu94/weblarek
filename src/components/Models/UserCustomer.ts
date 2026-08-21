import { Customer, CustomerErrors, PaymentType } from "../../types";
import { IEvents } from "../base/Events";

export class UserCustomer {
  protected payment: PaymentType = '';
  protected address: string = '';
  protected phone: string = '';
  protected email: string = '';
  protected initialCustomer: Customer | null = null;

  constructor (protected events: IEvents, initialCustomer?: Customer) {
    if (initialCustomer) {
      this.initialCustomer = initialCustomer;
      this.saveData(initialCustomer);
    }
  }

  //Сохранение данных
  public saveData(data: Partial<Customer>): void {
    if (data.payment !== undefined) this.payment = data.payment;
    if (data.address !== undefined) this.address = data.address;
    if (data.phone !== undefined) this.phone = data.phone;
    if (data.email !== undefined) this.email = data.email;

    this.events.emit('customer:changed');
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

    if (this.initialCustomer) {
      this.saveData(this.initialCustomer)
    } else {
      this.saveData({
        payment: '',
        address: '',
        phone: '',
        email: ''
      })
    }
  }


  //Проверка данных и Валидация данных
  public validate(): CustomerErrors  {
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

    return errors
   
  }

}