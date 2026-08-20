import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IGalleryData {
  catalog: HTMLElement;
}

export class Gallery extends Component<IGalleryData> {
  protected catalogElement: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container)
    
    this.catalogElement = this.container
  }

  set catalog(items: HTMLElement[]) {
    this.catalogElement.replaceChildren(...items)
  }
}