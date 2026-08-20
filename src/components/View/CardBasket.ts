import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";

interface ICardBasketData {
  index: number;
}

export class CardBasket extends Card<ICardBasketData> {
  protected indexElement: HTMLElement;
  protected basketDeleteButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container)

    this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container)
    this.basketDeleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container)

    this.basketDeleteButton.addEventListener('click', () => {
      this.events.emit('cardBasket:delete', {id: this.container.dataset.id})
    })
  }

  set index(value: number) {
    this.indexElement.textContent = String(value)
  }

}