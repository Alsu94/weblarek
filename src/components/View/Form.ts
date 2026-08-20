import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export interface IFormData {
  valid: boolean;
  errors: string[];
}

export abstract class Form<T> extends Component<IFormData & T> {
  protected errorsElement: HTMLElement
  protected submitButton: HTMLButtonElement

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container)

    this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container)
    this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container)

    this.container.addEventListener('input', (event) => {
      const target = event.target as HTMLInputElement;

      this.events.emit(`${this.container.getAttribute('name')}.${target.name}:change`, { value: target.value });
    });

    this.container.addEventListener('submit', (event) => {
      event.preventDefault();
      this.events.emit(`${this.container.getAttribute('name')}:submit`);
    });
  }

  set valid(value: boolean) {
    this.submitButton.disabled = !value
  }

  set errors(value: string[]) {
    this.errorsElement.textContent = value.join(', ')
  }

}

