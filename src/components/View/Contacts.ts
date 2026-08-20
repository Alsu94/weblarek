import { IEvents } from "../base/Events";
import { Form } from "./Form";

interface IContactsData {
  email: HTMLInputElement;
  phone: HTMLInputElement;
}

export class Contacts extends Form<IContactsData> {
  constructor(protected events: IEvents, container: HTMLElement) {
    super(events, container)
  }

  set email(value: string) {
    const emailInput = this.container.querySelector('input[name="email"]') as HTMLInputElement;
    if (emailInput) {
      emailInput.value = value;
    }
  }

  set phone(value: string) {
    const phoneInput = this.container.querySelector('input[name="phone"]') as HTMLInputElement;
    if (phoneInput) {
      phoneInput.value = value;
    }
  }
}