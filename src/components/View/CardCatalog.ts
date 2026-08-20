import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";
import { CDN_URL, categoryMap } from "../../utils/constants";

interface ICardCatalogData {
  category: string;
  image: string;
}

export class CardCatalog extends Card<ICardCatalogData> {
  protected categoryElement: HTMLElement;
  protected imageElement: HTMLImageElement;
  protected openButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container)

    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container)
    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container)
    this.openButton = this.container as HTMLButtonElement

    this.openButton.addEventListener('click', () => {
      this.events.emit('card:click', {id: this.container.dataset.id})
    })
  }

  set category(value: string) {
    this.categoryElement.textContent = value

    this.categoryElement.className = 'card__category'

    const categoryClass = categoryMap[value as keyof typeof categoryMap];

    if (categoryClass) {
      this.categoryElement.classList.add(categoryClass)
    }
  }

  set image(value: string) {
    this.imageElement.src = CDN_URL + value
  }

}