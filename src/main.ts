import { Cart } from './components/Models/Cart';
import { Catalog } from './components/Models/Catalog';
import { LarekApi } from './components/LarekApi';
import { UserCustomer } from './components/Models/UserCustomer';
import './scss/styles.scss';
import { Customer } from './types';
import { apiProducts } from './utils/data';
import { API_URL } from './utils/constants';
import { Api } from './components/base/Api';

//Каталог товаров
const catalogModel = new Catalog();
catalogModel.saveProducts(apiProducts.items);

console.log('Массив товаров из каталога: ', catalogModel.getProducts())

let products = catalogModel.getProducts();
catalogModel.saveSelectedProduct(products[0])

console.log('Выбранный товар из каталога: ', catalogModel.getSelectedProduct())
let selectedProduct = catalogModel.getSelectedProduct()

//Корзина товаров
const cartModel = new Cart();

if (selectedProduct) {
  cartModel.addItem(selectedProduct)
}

console.log('Список товаров в корзине: ', cartModel.getItems())
let productsInCart = cartModel.getItems()
console.log('Количество товаров в корзине: ', cartModel.getItemsCount())
console.log('Сумма стоимости товаров в корзине: ', cartModel.getTotalPrice())

if (productsInCart.length > 0) {
  console.log('Узнать о наличие товара в корзине: ', cartModel.hasItemById(productsInCart[0].id))
  cartModel.removeItem(productsInCart[0])
  console.log('Количество товаров в корзине: ', cartModel.getItemsCount())
}

//Покупатель
const UserCustomerModel = new UserCustomer();
let data: Customer = {
  payment: 'card',
  address: 'address',
  phone: '880020006',
  email: 'test@mail.ru'
}
UserCustomerModel.saveData(data)

console.log('Валидация данных: ', UserCustomerModel.isValid()); 

console.log('Валидация данных: ', UserCustomerModel.getData()); 

UserCustomerModel.clearData()


//Получаем данные мз сервера
const baseApi = new Api(API_URL)

const appApi = new LarekApi(baseApi)
let productsList = [];
appApi.getProducts().then(res => {
  productsList = res.items
  catalogModel.saveProducts(productsList);
  console.log('Массив товаров из каталога (сервер): ', catalogModel.getProducts())
}).catch(err => {
  console.error(`Ошибка при загрузке товаров ${err}`)
})











