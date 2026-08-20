import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

interface IConfirmData {
  price: number | null;
}

export class Confirm extends Component<IConfirmData> {
  protected priceElement: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container)

    this.priceElement = ensureElement<HTMLElement>('.order-success__description', this.container)
    this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container)

    this.closeButton.addEventListener('click', () => {
      this.events.emit('confirm:close')
    })
  }

  set price(value: number | null) {
    this.priceElement.textContent = `Списано ${value} синапсов`
  }

}