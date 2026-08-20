import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

interface IBasketData {
  catalogBasket: HTMLElement;
  price: number|null;
  buttonDisabled?: boolean;
}

export class Basket extends Component<IBasketData> {
  protected catalogBasketElement: HTMLElement;
  protected priceElement: HTMLElement;
  protected basketButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container)

    this.catalogBasketElement = ensureElement<HTMLElement>('.basket__list', this.container)
    this.priceElement = ensureElement<HTMLElement>('.basket__price', this.container)
    this.basketButton = ensureElement<HTMLButtonElement>('.basket__button', this.container)

    this.basketButton.addEventListener('click', () => {
      this.events.emit('basket:processing')
    })
  }

  set catalogBasket(items: HTMLElement[]) {
    this.catalogBasketElement.replaceChildren(...items)
  }

  set price(value: number | null) {
    this.priceElement.textContent = `${value} синапсов`
  }

  set buttonDisabled(value: boolean) {
    this.basketButton.disabled = value
  }
}