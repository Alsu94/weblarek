import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";
import { CDN_URL, categoryMap } from "../../utils/constants";

interface ICardPreviewData {
  image: string;
  category: string;
  description: string;
  buttonText?: string;
  buttonDisabled?: boolean;
}

export class CardPreview extends Card<ICardPreviewData> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected descriptionElement: HTMLElement;
  protected cardButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container)

    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container)
    this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container)
    this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container)
    this.cardButton = ensureElement<HTMLButtonElement>('.card__button', this.container)

    this.cardButton.addEventListener('click', () => {
      this.events.emit('card:toggle', {id: this.container.dataset.id})
    })
  }

  set image(value: string) {
    this.imageElement.src = CDN_URL + value
  }

  set category(value: string) {
    this.categoryElement.textContent = value

    this.categoryElement.className = 'card__category'

    const categoryClass = categoryMap[value as keyof typeof categoryMap];

    if (categoryClass) {
      this.categoryElement.classList.add(categoryClass)
    }
  }

  set description(value: string) {
    this.descriptionElement.textContent = value
  }

  set buttonText(value: string) {
    this.cardButton.textContent = value
  }

  set buttonDisabled(value: boolean) {
    this.cardButton.disabled = value
  }
}