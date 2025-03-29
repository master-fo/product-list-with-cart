import { products } from "../data";
 import { productsWrapper, cartWrapper, addToCartBtns, confirmOrderBtn, orderConfirmedPage, orderItemsContainer, confirmOrderTotal, newOrderBtn } from "../main";
 import { getElement, getProduct, removeChild } from "./helper-functions";
 
 let cart = {
 
 }
 
 function updateCart(action, id){
     switch(action){
       case 'ADD':
         updateProductUI('ADD', id)
         addProductToCart(id)
         cart[id] = 1
         console.log('ADDING')
         break;
       case 'INCREASE':
         updateProductInCart(action, id)
         cart[id] = cart[id] + 1
         console.log('INCREASING')
         break;
       case 'DECREASE':
         updateProductInCart(action, id)
         cart[id] = cart[id] - 1
         if(Number(getElement(id, productsWrapper).children[2].children[1].children[1].textContent) <= 0){
           removeChild(getElement(id, cartWrapper),cartWrapper)
           updateProductUI('REMOVE', id)
           delete cart[id]
         }
         console.log('DECREASING')
         break;
       case 'REMOVE':
         removeChild(getElement(id, cartWrapper), cartWrapper)
         delete cart[id]
         updateProductUI('REMOVE', id)
         console.log('REMOVING')
         break;
       default:
         console.log('ERROR!!!')
     }
 
     let total = 0;
     for(let i = 0; i<cartWrapper.children.length; i++){
       total = total + Number(cartWrapper.children[i].children[0].children[1].children[2].textContent.slice(1))
     }
     cartWrapper.nextElementSibling.children[1].textContent = `$${total.toFixed(2)}`
     cartWrapper.previousElementSibling.textContent = `Your Cart (${cartWrapper.children.length})`
     if(cartWrapper.children.length > 0){
       cartWrapper.parentElement.classList.remove('hidden')
       cartWrapper.parentElement.nextElementSibling.classList.add('hidden')
     }else{
       cartWrapper.parentElement.classList.add('hidden')
       cartWrapper.parentElement.nextElementSibling.classList.remove('hidden')
     }
   }
   function updateProductUI(action, id){
     let productEl = getElement(id, productsWrapper)
   
     let productQuantityEl = productEl.children[2].children[1].children[1]
     let productImgEl = productEl.children[0].children[0]
   
     if(action == 'ADD'){
       productEl.children[2].children[0].classList.add('hidden')
       productEl.children[2].children[1].classList.remove('hidden')
   
       productQuantityEl.textContent = 1
       productImgEl.classList.add('border-2', 'border-red-500')
     }else{
       productEl.children[2].children[0].classList.remove('hidden')
       productEl.children[2].children[1].classList.add('hidden')
   
       productImgEl.classList.remove('border-2', 'border-red-500')
     }
   }
   function addProductToCart(id){
     let product = getProduct(id)[0]
     let cartItem = document.createElement('div')
   
     cartItem.setAttribute('id', product.id)
     cartItem.className = 'flex justify-between items-center'
     cartItem.innerHTML = `
                 <div class="cart-product--details">
                   <p class="text-sm font-bold text-gray-700">${product.desc}</p>
                   <div class="flex justify-start gap-5">
                       <span class="text-sm text-red-500">1x</span>
                       <span class="text-sm text-gray-500">@ ${product.price.toFixed(2)}</span>
                       <span class="text-sm text-gray-500">$${product.price.toFixed(2)}</span>
                   </div>
               </div>
               <a href="#" class="w-5 h-5 border-2 border-gray-300 rounded-full flex justify-center items-center">
                   <img src="/images/icon-remove-item.svg" class="w-2 h-2 text-gray-500" alt="">
               </a>
               `
     cartWrapper.appendChild(cartItem)
     cartItem.children[1].addEventListener('click', e =>{
       e.preventDefault();
       updateCart('REMOVE', product.id)
     })
   }
   function updateProductInCart(action='INCREASE', id){
     let productEl = getElement(id, productsWrapper)
     let productInCart = getElement(id, cartWrapper)
   
     let productQuantityEl = productEl.children[2].children[1].children[1]
     let quantity = Number(productQuantityEl.textContent)
     let price = Number(productEl.children[1].children[2].textContent.slice(1))
     let productTotal = action == "INCREASE" ? ((quantity+1) * price) : (quantity * price)
   
     if(action == 'DECREASE'){
       productQuantityEl.textContent = Number(productQuantityEl.textContent) - 1
     
       productInCart.children[0].children[1].children[0].textContent = `${quantity - 1}x`
       productInCart.children[0].children[1].children[2].textContent = `$${(productTotal-price).toFixed(2)}`
     }
     else{
         //write a condition to check if product exist in cart before adding again
       productQuantityEl.textContent = Number(productQuantityEl.textContent) + 1
 
       productInCart.children[0].children[1].children[0].textContent = `${quantity + 1}x`
       productInCart.children[0].children[1].children[2].textContent = `$${productTotal.toFixed(2)}`
     }
   }
   function addToCartEvent(e){
     addToCartBtns.forEach(addToCartBtn => {
       addToCartBtn.addEventListener('click', e => {
         e.preventDefault()
         let id = -1
         let el = e.target
         if(!el.classList.contains('add-to--cart-btn')){
           el = el.parentElement
         }
         if(el.classList.contains('add-to--cart-btn') && (!el.classList.contains('incr') && !el.classList.contains('decr'))){
           id = Number(el.parentElement.parentElement.id)
           updateCart('ADD', id)
         }else{
           if(el.classList.contains('decr') && !el.classList.contains('incr')){
             if(Number(el.nextElementSibling.textContent) > 0){
               id = Number(el.parentElement.parentElement.parentElement.id)
               updateCart('DECREASE', id)
             }
           }else{
             id = Number(el.parentElement.parentElement.parentElement.id)
             updateCart('INCREASE', id)
           }
         }
       })
     })
   }
   function loadProducts(){
     let elements = []
     products.forEach(product => {
         elements.push(`
               <div id="${product.id}" class="relative max-h-95 max-w-80 sm:max-w-70 md:max-w-45">
                 <div class="image-container rounded-lg">
                     <img class="product-img max-h-70 w-full rounded-lg object-cover" src="/images/image-${product.img}-desktop.jpg" alt="">
                 </div>
                 <div class="text-container mt-7">
                     <h3 class="product-name text-xs text-gray-500">${product.name}</h3>
                     <p class="product-desc text-sm font-semibold">${product.desc}</p>
                     <span class="price text-red-700">$${product.price.toFixed(2)}</span>
                 </div>
                 <div href="#" class="absolute h-10 inset-x-0 bottom-17 rounded-3xl">
                     <a href="#" class="bg-white add-to--cart-btn border-2 border-red-200 h-full flex justify-center gap-3 items-center rounded-3xl">
                         <img class="w-4 h-4" src="/images/icon-add-to-cart.svg" alt="">
                         <span class="text-black text-sm">Add to Cart</span>
                     </a>
                     <div class=" hidden bg-red-600 h-full flex justify-around items-center rounded-3xl">
                         <a href="" class="add-to--cart-btn decr w-5 h-5 border-2 border-white rounded-full flex justify-center items-center">
                             <img class="text-white w-2" src="/images/icon-decrement-quantity.svg" alt="">
                         </a>
                         <span class="text-white text-sm">0</span>
                         <a href="" class="add-to--cart-btn incr w-5 h-5 border-2 border-white rounded-full flex justify-center items-center">
                             <img class="text-white w-2" src="/images/icon-increment-quantity.svg" alt="">
                         </a>
                     </div>
                 </div>
               </div>
       `)
       productsWrapper.innerHTML = elements
     })
   }
 
   function confirmOrder(){
     confirmOrderBtn.addEventListener('click', e=>{
       e.preventDefault()
       let elements = []
       let total = 0.0
     
       Object.keys(cart).forEach( key => {
         let product = getProduct(key)[0]
 
         total = total + (cart[key]*product.price)
         elements.push(`<div class="flex justify-between items-center">
           <div class="flex gap-2">
               <img src="/images/image-${product.img}-desktop.jpg" alt="" class="w-10 h-10 rounded-md">
               <div class="">
                   <p class="text-sm font-bold text-gray-700">${product.desc}</p>
                   <div class="flex justify-start gap-5">
                       <span class="text-sm text-red-500">${cart[key]}x</span>
                       <span class="text-sm text-gray-500">@ ${product.price.toFixed(2)}</span>
                   </div>
               </div>
           </div>
           <span class="text-sm text-gray-500">$${(cart[key]*product.price).toFixed(2)}</span>
         </div>`)
       })
       orderItemsContainer.innerHTML = elements
       confirmOrderTotal.textContent = `$${total.toFixed(2)}`
       orderConfirmedPage.classList.remove('hidden')
 
       orderConfirmedPage.children[0].lastElementChild.addEventListener('click', newOrder)
     })
   }
   
   function newOrder(e){
     e.preventDefault()
     Object.keys(cart).forEach(key=>{
         updateCart('REMOVE', key)
         delete cart[key]
     })
     orderConfirmedPage.classList.add('hidden')
   }
 
 
   export {
     loadProducts,
     addToCartEvent,
     updateCart,
     updateProductUI,
     addProductToCart,
     updateProductInCart,
     confirmOrder,
   }