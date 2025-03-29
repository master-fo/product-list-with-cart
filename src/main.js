let confirmOrderBtn = document.querySelector('#confirm-order--btn')
 let orderConfirmedPage = document.querySelector('#order-confirmed--page')
 let newOrderBtn = document.querySelector('#new-order--btn')

 confirmOrderBtn.addEventListener('click', e=>{
  e.preventDefault()
  orderConfirmedPage.classList.remove('hidden')
})

newOrderBtn.addEventListener('click', e=>{
  e.preventDefault()
  orderConfirmedPage.classList.add('hidden')
})