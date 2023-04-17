import Notiflix from 'notiflix'

const delay = document.querySelector("input[name='delay']")
const step = document.querySelector("input[name='step']")
const amount = document.querySelector("input[name='amount']")
const createBtn = document.querySelector('button[type="submit"]')

delay.style.backgroundColor = "tomato"



const createPromise = (position, delay) => {
  return new Promise ((resolve, reject)=> {
  setTimeout(()=>{
    const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
resolve(` Fulfilled promise ${position} in ${delay}ms`)
    // Fulfill
  } else {
    reject(`Rejected promise ${position} in ${delay}ms`)
    // Reject
  }
  }, delay)
})
}


const showPromise=()=> {
let delayTime = 0
for (let i =1; i<=amount.value; i++) {
  createPromise(i, delayTime)
  .then(success => {
    Notiflix.Notify.success(success);
  })
  .catch(error => {
    Notiflix.Notify.failure(error);
  });
delayTime = (delayTime) + (+step.value);
}
}

createBtn.addEventListener('click', event => {
  event.preventDefault();
  showPromise()
})



