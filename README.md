https://github.com/Alsu94/weblarek

# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Vite

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/main.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run dev
```

или

```
yarn
yarn dev
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Интернет-магазин «Web-Larёk»
«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме MVP (Model-View-Presenter), которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

Model - слой данных, отвечает за хранение и изменение данных.  
View - слой представления, отвечает за отображение данных на странице.  
Presenter - презентер содержит основную логику приложения и  отвечает за связь представления и данных.

Взаимодействие между классами обеспечивается использованием событийно-ориентированного подхода. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события используя методы как Моделей, так и Представлений.

### Базовый код

#### Класс Component
Является базовым классом для всех компонентов интерфейса.
Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

Конструктор:  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент за отображение, которого он отвечает.

Поля класса:  
`container: HTMLElement` - поле для хранения корневого DOM элемента компонента.

Методы класса:  
`render(data?: Partial<T>): HTMLElement` - Главный метод класса. Он принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент. Предполагается, что в классах, которые будут наследоваться от `Component` будут реализованы сеттеры для полей с данными, которые будут вызываться в момент вызова `render` и записывать данные в необходимые DOM элементы.  
`setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`


#### Класс Api
Содержит в себе базовую логику отправки запросов.

Конструктор:  
`constructor(baseUrl: string, options: RequestInit = {})` - В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.

Поля класса:  
`baseUrl: string` - базовый адрес сервера  
`options: RequestInit` - объект с заголовками, которые будут использованы для запросов.

Методы:  
`get(uri: string): Promise<object>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер  
`post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.  
`handleResponse(response: Response): Promise<object>` - защищенный метод проверяющий ответ сервера на корректность и возвращающий объект с данными полученный от сервера или отклоненный промис, в случае некорректных данных.

#### Класс EventEmitter
Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

Конструктор класса не принимает параметров.

Поля класса:  
`_events: Map<string | RegExp, Set<Function>>)` -  хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события.

Методы класса:  
`on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию обработчик.  
`emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика.  
`trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра.


# Данные
2 основных интерфейса. Product(Товар) и Customer(Покупатель)
1 интерфейс для отображении неверно введенных данных покупателем CustomerErrors

## Интерфейс Product
Товар содержит:
  `id: string` - уникальный номер,
  `title: string` - название товара,
  `image: string` - изоброжение товара,
  `category: string` - категория(группа) товара,
  `price: number | null` - цена товара,
  `description?: string` - описание (не обязательное поле).

## Интерфейс Customer
Покупатель содержит:
  `payment: 'card' | 'cach' | ''` - способ оплатыЖ картой или кэш
  `address: string` - адресс 
  `email: string` - email адресс 
  `phone: string` - номер телефона


## Интерфейс CustomerErrors
CustomerErrors содержит сообщения об ошибке по конкретным полям:
    `payment?: string` - способ оплаты
    `address?: string` - адрес покупателя
    `phone?: string` - номер телефона покупателя
    `email?: string` - почтовый адресс покупателя

# Модели данных
3 основных класса. Catalog(Каталог товаров), Cart(Корзина товаров), UserCustomer(Покупатель).

## Класс Catalog
Каталог товаров содержит в себе список товаров

Конструктор:  
`constructor(initialProducts: Product[] = [])` - принимает массив товаров.

Поля класса:  
`products: Product[]` - массив товаров  
`selectedProduct: Product | null` - выбранный товар

Методы класса:
`getProducts(): Product[]` - Получение список товаров
`saveSelectedProduct(product: Product | null): void` - Сохранение выбранной карточки
`getSelectedProduct(): Product | null` - Получение выбранной карточки
`saveProducts(products: Product[]): void` - Сохранение массива товаров
`getProductId(productId: string)` - 


## Класс Cart
Корзина товаров содержит в себе список товаров, который хочет купить ползователь

Поля класса:  
`items: Product[]` - массив товаров, выбранных покупателем для покупки

Методы класса:
`addItem(product: Product): void` - Добавление товара в корзину
`removeItem(product: Product): void` - Удаление товара из корзины
`getItemsCount(): number` - Подсчет количества товаров в корзине
`getItems(): Product[]` - Получение список товаров в корзине
`getTotalPrice(): number` - Сумма стоимости товаров в корзине
`hasItemById(id: number | string): boolean` - Определяет наличие товара (true/false)

## Класс UserCustomer

Данный класс содержит информацию о покупатели

Конструктор:  
`constructor (initialCustomer?: Customer)` - принимает данные о покупателе.

Поля класса:  
`payment: string` - спосбо ополаты 
`address: string` - адресс покупателя
`phone: string` - номер телефона покупателя
`email: string` - почтовый адрес покупателя

Методы класса:
`saveData(data: Customer): void` - Сохранение данных о покупателе
`getData(): Customer` - Получение данных о покупателе
`clearData(): void` - Очистка данных покупателя
`validate(): CustomerErrors` - Проверка данных введенный покупателем
`isValid(): boolean` - Валидация данных

# Слой коммуникации

## Интерфейс IProductResponse
IProductResponse описывает структуру объекта, которую возвращает сервер  в ответ на GET-запрос по адресу /product/
`total: number` - сколько всего товаров на сервере
`items: Product[]` - Массив товаров

## Интерфейс IOrderRequest
IOrderRequest описывает объект, который отправляем на сервер при оформлении заказа.
`interface IOrderRequest extends Customer` - наследует от интерфейса Customer и плюс свои поля
`items: string[]` - Массив ID выбранных товаров
`total: number` - Сумма заказа

## Класс LarekApi
Данный класс выполняет запрос на сервер, через композицию класса Api.

Конструктор:  
`constructor (api: IApi)` - принимает  экземпляр базового класса запросов.

Поля класса:
`api: IApi` - Хранит экземпляр базового класса Api. Используется для совершения сетевых запросов методами get и post

Методы класса:
`getProducts(): Promise<IProductResponse>` - Делает запрос на эндпоинт /product/ и получает с сервера объект содержащий общее количество товаров и массив товаров
`createOrder(order: IOrderRequest): Promise<IOrderResult>` - отправляет на сервер данные о покупателе и выбранных товарах и получает сохраненные данные

# Слой View

## Интерфейс IHeaderData
  `counter: number` - счетчик количества товаров в корзине

### Клас Header
Шапка сайта. Кнопка иконки корзины и счетчик количества товаров в корзине

Конструктор:
`constructor(protected events: IEvents, container: HTMLElement)` принимает экземпляр брокера событий и корневой элемент

Поля класса:
`counterElement: HTMLElement` - HTML элемент (контейнер) для счетчика
`basketButton: HTMLButtonElement` - кнопка HTML элемент (контейнер) для иконки корзины

Сеттары класса:
`counter(value: number)` - сеттер для изменения счетчика


## Интерфейс IGalleryData
  `catalog: HTMLElement` - контейнер для карточек товала 

### Клас Gallery
Контейнер для спискам карточек товаров

Конструктор:
`constructor(protected events: IEvents, container: HTMLElement)` принимает экземпляр брокера событий и корневой элемент

Поля класса:
`catalogElement: HTMLElement` - HTML элемент (контейнер) для списка карточек

Сеттары класса:
`catalog(items: HTMLElement[])` - сеттер для изменения блока галлерея


## Интерфейс IModalData
  `content: HTMLElement` - контейнер для тела модального окна

### Клас Modal
Модальное окно

Конструктор:
`constructor(protected events: IEvents, container: HTMLElement)` принимает экземпляр брокера событий и корневой элемент

Поля класса:
`contentElement: HTMLElement` - HTML элемент (контейнер) для контента модального окна
`closeButton: HTMLButtonElement` - контейнер кнопка для закрытия модального окна

Сеттары класса:
`content(value: HTMLElement)` - сеттер для изменения блока контента

Методы класса:
`open()` - открывает модальное окно
`close()` - закрывает модальное окно


## Интерфейс IConfirmData
  `price: number | null` - общпя стоимость товаров 

### Клас Confirm
Успешно оформленный заказ

Конструктор:
`constructor(protected events: IEvents, container: HTMLElement)` принимает экземпляр брокера событий и корневой элемент

Поля класса:
`priceElement: HTMLElement` - HTML элемент для цены
`closeButton: HTMLButtonElement` - контейнер кнопка для закрытия модального окна

Сеттары класса:
`price(value: number | null)` - сеттер для изменения цены


## Интерфейс ICardData
  `id: string` - идентификатор товара
  `title: string` - название товара
  `price: number|null` - цена товара

### Клас Card
Карточка товара абстрактный класс

Конструктор:
`constructor(container: HTMLElement)` принимает корневой элемент

Поля класса:
`titleElement: HTMLElement` - HTML элемент для категории
`priceElement: HTMLElement` - HTML элемент для цены

Сеттары класса:
`id(value: string)` - сеттер для идентефикатора
`title(value: string)` - сеттер для названия товара
`price(value: number|null)` - сеттер для цены


## Интерфейс ICardCatalogData
  `category: string;` - категория товара
  `image: string` - частичный путь к картинке

### Клас CardCatalog
Карточка товара в каталоге

Конструктор:
`constructor(protected events: IEvents, container: HTMLElement)` принимает экземпляр брокера событий и корневой элемент

Поля класса:
`categoryElement: HTMLElement` - HTML элемент для категории
`imageElement: HTMLImageElement` - HTML image элемент для картинки
`openButton: HTMLButtonElement` - контейнер кнопка для превью карточки

Сеттары класса:
`category(value: string)` - сеттер для изменения категории
`image(value: string)` - сеттер для изменения пути к картинки


## Интерфейс ICardPreviewData
  `category: string;` - категория товара
  `image: string` - частичный путь к картинке
  `description: string` - описание товара
 ` buttonText?: string` - текст на кнопке
  `buttonDisabled?: boolean` - активность кнопки

### Клас CardPreview
Превью карточка товара

Конструктор:
`constructor(protected events: IEvents, container: HTMLElement)` принимает экземпляр брокера событий и корневой элемент

Поля класса:
`categoryElement: HTMLElement` - HTML элемент для категории
`imageElement: HTMLImageElement` - HTML image элемент для картинки
`descriptionElement: HTMLElement` - контейнер кнопка для превью карточки
`cardButton: HTMLButtonElement` - контейнер кнопка для добавление в корзину или удаления из корзины

Сеттары класса:
`category(value: string)` - сеттер для изменения категории
`image(value: string)` - сеттер для изменения пути к картинки
`description(value: string)` - сеттер для изменения описания товара
`buttonText(value: string)` - сеттер для изменения текста на кнопке
`buttonDisabled(value: boolean)` - сеттер для активации/деактивации кнопки


## Интерфейс ICardBasketData
  `index: number` - порядковый номер товара в корзине

### Клас CardBasket
Карточка товара в корзине

Конструктор:
`constructor(protected events: IEvents, container: HTMLElement)` принимает экземпляр брокера событий и корневой элемент

Поля класса:
`indexElement: HTMLElement` - HTML элемент для порядкового номера
`basketDeleteButton: HTMLButtonElement` - контейнер кнопка для удаления товара из корзины

Сеттары класса:
`index(value: number)` - сеттер для порядкового номера


## Интерфейс IBasketData
  `catalogBasket: HTMLElement` - каталог корзины
  `price: number|null` - общая стоимость товаров в корзине
  `buttonDisabled?: boolean ` - активация / деактивая кнопки для перехода в оформление заказа
 
### Клас Basket
Корзина

Конструктор:
`constructor(protected events: IEvents, container: HTMLElement)` принимает экземпляр брокера событий и корневой элемент

Поля класса:
`catalogBasketElement: HTMLElement` - HTML элемент для списка товаров
`priceElement: HTMLElement` - HTML элемент для общей стоиости товаров
`basketButton: HTMLButtonElement` - кнопка оформдления заказа

Сеттары класса:
`catalogBasket(items: HTMLElement[])` - сеттер для получения списка товаров в корзине
`price(value: number | null)` - сеттер для общей стоимость товаров в корзине
`buttonDisabled(value: boolean)` - сеттер для активация / деактивая кнопки для перехода в оформление заказа


## Интерфейс IFormData
  `valid: boolean` - проверка на валлидность данных
  `errors: string[]` - список ошибок 
 
### Клас Form
Абстрактный класс  родительский класс для Заказа и Контактных данных

Конструктор:
`constructor(protected events: IEvents, container: HTMLElement)` принимает экземпляр брокера событий и корневой элемент

Поля класса:
`errorsElement: HTMLElement` - HTML элемент для списка ошибок
`priceElement: HTMLElement` - HTML элемент для общей стоиости товаров
`submitButton: HTMLButtonElement` - кнопка отправки формы

Сеттары класса:
`valid(value: boolean))` - сеттер для проверки валидности формы
`errors(value: string[])` - сеттер для списка ошибок


## Интерфейс IOrderData
  `address: HTMLInputElement` - адрес доставки
  `payment: PaymentType` - способ оплаты
 
### Клас Order
Класс заказа, где выбирается способ оплаты и адрес доставки

Конструктор:
`constructor(protected events: IEvents, container: HTMLElement)` принимает экземпляр брокера событий и корневой элемент

Поля класса:
`cardButtonElement: HTMLButtonElement` - кнопка выбора по оплаты онлайн
`cashButtonElement: HTMLButtonElement` - кнопка выбора по оплаты при получении

Сеттары класса:
`address(value: string)` - сеттер для адреса доставки
`payment(value: PaymentType)` - сеттер для способа оплаты


## Интерфейс IContactsData
  `email: HTMLInputElement` - эл.почта
  `phone: HTMLInputElement` - телефон
 
### Клас Contacts
Класс Contacts, контактная информация о покупателе

Конструктор:
`constructor(protected events: IEvents, container: HTMLElement)` принимает экземпляр брокера событий и корневой элемент

Сеттары класса:
`email(value: string)` - сеттер для эл.почты
`phone(value: string)` - сеттер для номера телефона


# События

`items:changed` - изменение списка товаров
`card:select` - выбор карточки товара в каталоге, передает idю Презентер открывает карточку в модальном отклоненный
`cart:changed` - изменение карточки (Удалине/Добавление/Очистка корзины)
`customer:changed` - изменение данных о покупателе
`card:click` - клик по карточке товара в каталоге
`card:toggle` - клик по кнопке Купить/Удалить в карточке товара
`basket:open` - клик по иконке корзины открывает модальное окно
`cardBasket:delete` - клик по иконке удалить товар из корзины
`basket:processing` - клик по кнопке оформить в корзине
`order.payment:change` - клик по кнопке выбора оплаты (Онлайн/При получении)
`order.address:change` - инпут ввод адресса
`order:submit` - клик форма заказа - кнопка Далее
`contacts.email:change` - инпут ввод email
`contacts.phone:change` - инпут ввод номера телефона
`contacts:submit` - клик форма контакты - кнопка оплатить, отправка формы на сервер
`confirm:close` - клик за новыми покупками (закрыть модалку)

# Презентер

Презентер отвечает за логику приложения и связывает Модели и Представления. Презентер реализован в main.ts. Презентер только обрабатывает события







