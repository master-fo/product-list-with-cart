import {products} from "../data";
 import { productsWrapper } from "../main";
 
 function getElement(id, parent){
     if(parent.children.length <= 0){
       return undefined
     }else{
       for(let i = 0; i<parent.children.length; i++){
         if(parent.children[i].id == id){
           return parent.children[i]
         }
       }
       return undefined
     }
   }
   function getProduct(id){
     return products.filter(product => {
       return product.id == id
     })
   }
   function removeChild(child, parent){
     let productEl = getElement(Number(child.getAttribute('id')), productsWrapper)
     let productImgEl = productEl.children[0].children[0]
     let productQuantityEl = productEl.children[2].children[1].children[1]
     productImgEl.classList.remove('border-red-500', 'border-2')
     productQuantityEl.classList.remove('border-red-500', 'border-2')
     parent.removeChild(child)
   }
 
   export {getElement, getProduct, removeChild}