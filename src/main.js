let productsWrapper = document.querySelector('#products-wrapper')
let cartWrapper = document.querySelector('#cart-wrapper')
let confirmOrderBtn = document.querySelector('#confirm-order--btn')
let orderConfirmedPage = document.querySelector('#order-confirmed--page')
let newOrderBtn = document.querySelector('#new-order--btn')
let orderItemsContainer = document.querySelector('#order-items--container')
let confirmOrderTotal = document.querySelector('#confirm-order--total')

import {
  loadProducts,
  addToCartEvent,
  confirmOrder
} from './_lib/DOM-elements'

loadProducts();
 let addToCartBtns = document.querySelectorAll('.add-to--cart-btn')
 addToCartEvent()
 confirmOrder()
 
 export {productsWrapper, cartWrapper, addToCartBtns, confirmOrderBtn, orderConfirmedPage, orderItemsContainer, confirmOrderTotal, newOrderBtn}