import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputData = document.getElementById('datetime-picker')
const daysToGo = document.querySelector('[data-days]')
const hoursToGo = document.querySelector('[data-hours]')
const minutesToGo = document.querySelector('[data-minutes]')
const secondsToGo = document.querySelector('[data-seconds]')
const startBtn = document.querySelector('button')

let calendarData = 0;
let countDown = null;
let milisecondsLeft = 0;
let timeToGo = {};

const convertMs = ms => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

// add 0 before 
const addLeadingZero = value => {
if (value<10)
return value.toString().padStart(2,'0');
return value;
}

// wywolanie zdarzenia na koniec odliczania
const endCount = () => {
  clearInterval(countDown)
  daysToGo.textContent = "00"
  hoursToGo.textContent = "00"
  minutesToGo.textContent = "00"
  secondsToGo.textContent = "00"
}


// podstawienie czasu do spanów 
const updateTimeToGo = () => {
timeToGo = convertMs(milisecondsLeft);
daysToGo.textContent = addLeadingZero(timeToGo.days)
hoursToGo.textContent = addLeadingZero(timeToGo.hours)
minutesToGo.textContent = addLeadingZero(timeToGo.minutes) 
secondsToGo.textContent = addLeadingZero(timeToGo.seconds)
milisecondsLeft -= 1000;
if (milisecondsLeft <0) {
  endCount();
  Notiflix.Report.success('Countdown ended!')
}
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    calendarData = selectedDates[0].getTime();
    milisecondsLeft = calendarData - new Date().getTime();
    if (milisecondsLeft<0) {
      return Notiflix.Report.failure(
        'Please choose a date in the future')
    }
    else {updateTimeToGo()}
    
    startBtn.disable = false
    console.log(calendarData);
},
};

flatpickr(inputData, options);


startBtn.addEventListener('click', () => {
  milisecondsLeft = calendarData - new Date().getTime();
  clearInterval(countDown);
  countDown = setInterval(() => updateTimeToGo(), 1000); 
  startBtn.disabled = true
})