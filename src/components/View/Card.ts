import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

export interface ICardData {
  id: string
  title: string
  price: number|null
}

export abstract class Card<T> extends Component<ICardData & T> {
  protected titleElement: HTMLElement
  protected priceElement: HTMLElement

  constructor(container: HTMLElement) {
    super(container)

    this.titleElement = ensureElement<HTMLElement>('.card__title', this.container)
    this.priceElement = ensureElement<HTMLElement>('.card__price', this.container)
  }

  set id(value: string) {
    this.container.dataset.id = value
  }

  set title(value: string) {
    this.titleElement.textContent = value
  }

  set price(value: number|null) {
    if (value === null) {
      this.priceElement.textContent = 'Бесценно'
    } else {
      this.priceElement.textContent = `${value} синапсов`
    }
  }

}

