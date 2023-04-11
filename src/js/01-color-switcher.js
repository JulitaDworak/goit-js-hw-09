const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')
const body  = document.querySelector('body')


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  

  const bcgColor = ()=> {
    timerId = setInterval(() => {
     body.style.backgroundColor = getRandomHexColor();
    }, 1000);
startBtn.disabled = true
  stopBtn.disabled = false
  }

  const bcgStopColor =()=> {
    clearInterval(timerId);
      console.log(`Interval with id ${timerId} has stopped!`);
      startBtn.disabled = false
      stopBtn.disabled = true
    }
    
    
    startBtn.addEventListener("click",bcgColor )
    stopBtn.addEventListener("click",bcgStopColor )
    console.log(getRandomHexColor())

