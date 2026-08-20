import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { Form } from "./Form";
import { PaymentType } from "../../types";

interface IOrderData {
  address: HTMLInputElement;
  payment: PaymentType;
}

export class Order extends Form<IOrderData> {
  protected cardButtonElement: HTMLButtonElement;
  protected cashButtonElement: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(events, container)

    this.cardButtonElement = ensureElement<HTMLButtonElement>('button[name="card"]', this.container)
    this.cashButtonElement = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container)

    this.cardButtonElement.addEventListener('click', () => {
      this.events.emit('order.payment:change', {value: 'card'})
    })

    this.cashButtonElement.addEventListener('click', () => {
      this.events.emit('order.payment:change', {value: 'cash'})
    })
  }

  set address(value: string) {
    const addressInput = this.container.querySelector('input[name="address"]') as HTMLInputElement;
    if (addressInput) {
      addressInput.value = value;
    }
  }

  set payment(value: PaymentType) {
    this.cardButtonElement.classList.toggle('button_alt-active', value === 'card');
    this.cashButtonElement.classList.toggle('button_alt-active', value === 'cash');
  }
}