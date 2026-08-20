import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

interface IModalData {
  content: HTMLElement;
}

export class Modal extends Component<IModalData> {
  protected contentElement: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container)

    this.contentElement = ensureElement<HTMLElement>('.modal__content', this.container)
    this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container)

    this.closeButton.addEventListener('click', () => {
      this.close()
    })

    this.container.addEventListener('click', (evt) => {
      if (evt.target === this.container) {
        this.close(); 
      }
    });
  }

  set content(value: HTMLElement) {
    this.contentElement.replaceChildren(value)
  }

  open() {
    this.container.classList.add('modal_active')
    this.events.emit('modal:open', () => {
      const pageWrapper = document.querySelector('.page__wrapper');
      if (pageWrapper) {
        pageWrapper.classList.add('page__wrapper_locked');
      }
    })
  }

  close() {
    this.container.classList.remove('modal_active')
    this.events.emit('modal:close', () => {
      const pageWrapper = document.querySelector('.page__wrapper');
      if (pageWrapper) {
        pageWrapper.classList.remove('page__wrapper_locked');
      }
    })
  }

}