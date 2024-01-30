import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetimePicker = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');


let userSelectedDate = 0;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const currentDate = new Date();
    if (userSelectedDate <= currentDate) {

      iziToast.error({
    title: '❌',
        message: "Please choose a date in the future",
    position: 'topRight',
      })      
    } else {
      startBtn.disabled = false;
      }    
  },
};

flatpickr(datetimePicker, options);

startBtn.addEventListener('click', handleTimer); 

function handleTimer() {
  const intervalId = setInterval(() => {
    const timeDiff = userSelectedDate - Date.now();
    const time = convertMs(timeDiff);

    if (timeDiff < 0) {
      clearInterval(intervalId);
      console.log('clear'); 
    } else {
      daysEl.textContent = addLeadingZero(time.days);
      hoursEl.textContent = addLeadingZero(time.hours);
      minutesEl.textContent = addLeadingZero(time.minutes);
      secondsEl.textContent = addLeadingZero(time.seconds);
    }    
  }, 1000)
  startBtn.disabled = true;  
  datetimePicker.disabled = true;
  
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
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
}

