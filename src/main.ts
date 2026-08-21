import { Cart } from './components/Models/Cart';
import { Catalog } from './components/Models/Catalog';
import { LarekApi } from './components/LarekApi';
import { UserCustomer } from './components/Models/UserCustomer';
import './scss/styles.scss';
import { CustomerErrors, PaymentType, Product } from './types';
import { API_URL } from './utils/constants';
import { Api } from './components/base/Api';

import { EventEmitter } from './components/base/Events';
import { Header } from './components/View/Header'; 
import { ensureElement } from './utils/utils'; 
import { Gallery } from './components/View/Gallery';
import { CardCatalog } from './components/View/CardCatalog';
import { Modal } from './components/View/Modal';
import { CardPreview } from './components/View/CardPreview';
import { Basket } from './components/View/Basket';
import { CardBasket } from './components/View/CardBasket';
import { Order } from './components/View/Order';
import { Contacts } from './components/View/Contacts';
import { Confirm } from './components/View/Confirm';

// type AppEvents = {
//   'basket:open': () => void; 
// }

const events = new EventEmitter();

const header = new Header(events, ensureElement<HTMLElement>('.header'));

const gallery = new Gallery(events, ensureElement<HTMLElement>('.gallery'))

const modal = new Modal(events, ensureElement<HTMLElement>('.modal'))

  //контейнер корзина
const basketCatalogTemplate = ensureElement<HTMLTemplateElement>('#basket')
const basketCatalogElement = basketCatalogTemplate.content.firstElementChild as HTMLElement;
const basketCatalogContainer = basketCatalogElement.cloneNode(true) as HTMLElement;
const basketCatalog = new Basket(events, basketCatalogContainer)

//контейнер заказа
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const orderElement = orderTemplate.content.firstElementChild as HTMLElement;
const orderContainer = orderElement.cloneNode(true) as HTMLElement;
const order = new Order(events, orderContainer)

//контейнер контакты
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const contactsElement = contactsTemplate.content.firstElementChild as HTMLElement;
const contactsContainer = contactsElement.cloneNode(true) as HTMLElement;
const contacts = new Contacts(events, contactsContainer)

//контейнер confirm
const confirmTemplate = ensureElement<HTMLTemplateElement>('#success');
const confirmElement = confirmTemplate.content.firstElementChild as HTMLElement;
const confirmContainer = confirmElement.cloneNode(true) as HTMLElement;
const confirm = new Confirm(events, confirmContainer)

//Каталог товаров
const catalogModel = new Catalog(events);

//Корзина товаров
const cartModel = new Cart(events);

//Покупатель
const userCustomerModel = new UserCustomer(events);


//Получаем данные мз сервера
const baseApi = new Api(API_URL)

const appApi = new LarekApi(baseApi)
//Получаем список товаров
appApi.getProducts().then(res => {

  catalogModel.saveProducts(res.items);

}).catch(err => {
  console.error(`Ошибка при загрузке товаров ${err}`)
})

//Количество товаров в корзине
// header.counter = cartModel.getItemsCount()

//Словила модель изменение товаров в каталоге (saveProducts)
events.on('items:changed', (data: { items: Product[] }) => {
  console.log('Из модели данных Catalog пришло, что данные обновились');
  
  const cardElemnets = data.items.map(item => {
    const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
    const cardElement = cardTemplate.content.firstElementChild as HTMLElement;
    const cardContainer = cardElement.cloneNode(true) as HTMLElement;
    const card = new CardCatalog(events, cardContainer);
    return card.render(item)
  })

  gallery.catalog = cardElemnets
});

//Клик по карточке товара в каталоге
events.on('card:click', (data: {id: string}) => {
  console.log('Клик по карточке в каталоге товаров!');

  const selectedProduct = catalogModel.getProductId(data.id)

  if (selectedProduct) {

    catalogModel.saveSelectedProduct(selectedProduct)

  }
  
});

//Словила модель сохранение выбранного товара
events.on('card:select', (data: { id: string }) => {
  const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
    const cardPreviewElement = cardPreviewTemplate.content.firstElementChild as HTMLElement;
    const cardPreviewContainer = cardPreviewElement.cloneNode(true) as HTMLElement;
    const cardPreview = new CardPreview(events, cardPreviewContainer)

    const selectedProduct = catalogModel.getProductId(data.id);

    if (selectedProduct) {
      const textCardButton = selectedProduct.price === null ? 'Недоступно' : cartModel.hasItemById(selectedProduct.id) ? 'Удалить из корзины' : 'Купить';
      cardPreview.buttonText = textCardButton
      cardPreview.buttonDisabled = textCardButton === 'Недоступно'
  
      modal.content = cardPreview.render(selectedProduct)
  
      modal.open();
    }
})

//изменение корзины - сообщила модель
events.on('cart:changed', () => {

  header.counter = cartModel.getItemsCount(); 

  refreshBasket(); 
});

//Клик по кнопке Купить/Удалить в карточке товара
events.on('card:toggle', (data: {id: string}) => {
  console.log('Клик по кнопке Купить/Удалить в карточке товара');
  const selectedProduct = catalogModel.getProductId(data.id)
  if (selectedProduct) {
    if (cartModel.hasItemById(selectedProduct.id)) {
      //если товар есть в корзине (Удалить)
      cartModel.removeItem(selectedProduct)
    } else {
      //товара нет в корзине (Купить)
      cartModel.addItem(selectedProduct)
    }
    // header.counter = cartModel.getItemsCount()
    modal.close()
  }
})

//Клик по иконке корзины
events.on('basket:open', () => {
  refreshBasket()

  modal.open()
});

//Клик по иконке удалить товар из корзины
events.on('cardBasket:delete', (data: {id: string}) => {
  console.log('Клик по иконке удалить товар из корзины');
  const selectedProduct = catalogModel.getProductId(data.id)
  if (selectedProduct) {
    cartModel.removeItem(selectedProduct)
    
    // refreshBasket()
    // header.counter = cartModel.getItemsCount()
  }
})

//Клик по кнопке оформить в корзине
events.on('basket:processing', () => {
  modal.content = order.render();
})

//Изменились данные покупателя - сообщила модель
events.on('customer:changed', () => {

  renderAndValidateForm()

})

//Клик по кнопке выбора оплаты
events.on('order.payment:change', (data: {value: PaymentType}) => {
  order.payment = data.value
  userCustomerModel.saveData({payment: data.value})
})

//ВВод адресса в инпут 
events.on('order.address:change', (data: {value: string}) => {
  order.address = data.value
  userCustomerModel.saveData({address: data.value})
})

//Клик форма заказа - кнопка далее
events.on('order:submit', () => {
  console.log('Клик на кнопку Далее')
  modal.content = contacts.render();
})

//ВВод email в инпут 
events.on('contacts.email:change', (data: {value: string}) => {
  contacts.email = data.value
  userCustomerModel.saveData({email: data.value})
})

//ВВод phone в инпут 
events.on('contacts.phone:change', (data: {value: string}) => {
  contacts.phone = data.value
  userCustomerModel.saveData({phone: data.value})
})

//Клик форма контакты - кнопка оплатить
events.on('contacts:submit', () => {
  console.log('Клик на кнопку оплатить')
 
  const productListId = cartModel.getItems().map(item => item.id)
  const data = {
    items: productListId,
    total: cartModel.getTotalPrice(),
    ...userCustomerModel.getData()
  }
  appApi.createOrder(data).then(res => {
    console.log(res)
    confirm.price = res.total

    cartModel.clearCart()
    userCustomerModel.clearData()

    modal.content = confirm.render()
  }).catch(err => {
    console.error(`Ошибка при оформлении товаров ${err}`)
  })
})


//Клаик за новыми покупками (закрыть модалку)
events.on('confirm:close', () => {
  modal.close()
})

function refreshBasket() {
  const cardsBasket = cartModel.getItems()
  //карточки в корзине
  const cardBasketElemnets = cardsBasket.map((item, index) => {
    const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
    const cardBasketElement = cardBasketTemplate.content.firstElementChild as HTMLElement;
    const cardBasketContainer = cardBasketElement.cloneNode(true) as HTMLElement;
    const cardBasket = new CardBasket(events, cardBasketContainer);
    cardBasket.index = index + 1
    return cardBasket.render(item)
  })

  basketCatalog.catalogBasket = cardBasketElemnets
  basketCatalog.price = cartModel.getTotalPrice()
  basketCatalog.buttonDisabled = cartModel.getItemsCount() === 0

  modal.content = basketCatalog.render()
}

function renderAndValidateForm() {
  const errors = userCustomerModel.validate() as CustomerErrors;

  const customerData = userCustomerModel.getData()

  const orderErrors: string[] = [];

  if (errors.payment) orderErrors.push(errors.payment);
  if (errors.address) orderErrors.push(errors.address);
  
  order.errors = orderErrors;
  order.valid = orderErrors.length === 0;
  order.address = customerData.address;
  order.payment = customerData.payment;
  order.render();

  const contactsErrors: string[] = [];

  if (errors.email) contactsErrors.push(errors.email);
  if (errors.phone) contactsErrors.push(errors.phone);
  
  contacts.errors = contactsErrors; 
  contacts.valid = contactsErrors.length === 0;
  contacts.email = customerData.email;
  contacts.phone = customerData.phone;
  contacts.render();
}








