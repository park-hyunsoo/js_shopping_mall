import Header from './components/commons/Header';
import HomeView from './components/HomeView';
import ProductView from './components/ProductView';
import CartView from './components/CartView';
import SigninView from './components/SigninView';
import RegisterView from './components/RegisterView';
import ProfileView from './components/ProfileView';
import ShippingView from './components/ShippingView';
import PaymentView from './components/PaymentView';
import PlaceOrderView from './components/PlaceOrderView';
import OrderView from './components/OrderView';
import DashboardView from './components/DashboardView';
import ProductListView from './components/ProductListView';
import ProductEditView from './components/ProductEditView';
import OrderListView from './components/OrderListView';

import Error404View from './components/Error404View';
import { parseRequestUrl, showLoading, hideLoading } from './utils'; 

const routes = {
  '/': HomeView,
  '/product/:id': ProductView,
  '/cart' : CartView,
  '/cart/:id' : CartView,
  '/signin': SigninView, 
  '/register': RegisterView,
  '/profile': ProfileView,
  '/shipping': ShippingView,
  '/payment': PaymentView,
  '/placeorder': PlaceOrderView,
  '/order/:id': OrderView,
  '/dashboard': DashboardView,
  '/productlist': ProductListView,
  '/product/:id/edit': ProductEditView,
  '/orderlist': OrderListView,  
};

const router = async () => {
  showLoading(); 

  const request = parseRequestUrl();
  const parseUrl = (request.resource ? `/${request.resource}` : '/')
    + (request.id ? '/:id' : '') + (request.verb ? `/${request.verb}` : '');

  const view = routes[parseUrl] ? routes[parseUrl] : Error404View;
  const header = document.getElementById('header-container');
  header.innerHTML = await Header.render();
  await Header.after_render();

  const main = document.getElementById('main-container');
  main.innerHTML = await view.render();
  if (view.after_render) await view.after_render();

  hideLoading(); 
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
