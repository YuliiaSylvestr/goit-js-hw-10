import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  startButton: document.querySelector('[data-start]'),
  daysLabel: document.querySelector('[data-days]'),
  hoursLabel: document.querySelector('[data-hours]'),
  minutesLabel: document.querySelector('[data-minutes]'),
  secondsLabel: document.querySelector('[data-seconds]'),
};

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

const addLeadingZero = value => String(value).padStart(2, '0');

const calculateAndSetDate = timer => {
  const dateNow = new Date();
  const differenceInMilliseconds =
    userSelectedDate.getTime() - dateNow.getTime();

  if (differenceInMilliseconds <= 0) {
    clearInterval(timer);
    refs.startButton.removeAttribute('disabled');
    return;
  }

  const differenceObject = convertMs(differenceInMilliseconds);

  refs.daysLabel.textContent = addLeadingZero(differenceObject.days);
  refs.hoursLabel.textContent = addLeadingZero(differenceObject.hours);
  refs.minutesLabel.textContent = addLeadingZero(differenceObject.minutes);
  refs.secondsLabel.textContent = addLeadingZero(differenceObject.seconds);
};

let userSelectedDate = null;

refs.startButton.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const dateNow = new Date();
    const isUserSelectPastDate = selectedDate.getTime() < dateNow.getTime();
    if (isUserSelectPastDate) {
      iziToast.error({
        title: 'Please choose a date in the future',
        position: 'topRight',
        backgroundColor: '#f53d3d',
        titleColor: 'white',
        progressBar: false,
        icon: '',
      });
      refs.startButton.setAttribute('disabled', true);
    } else {
      refs.startButton.removeAttribute('disabled');
    }
    userSelectedDate = selectedDate;
  },
};

refs.startButton.addEventListener('click', event => {
  refs.startButton.setAttribute('disabled', true);
  const timer = setInterval(() => {
    calculateAndSetDate(timer);
  }, 1000);
  calculateAndSetDate(timer);
});

flatpickr('#datetime-picker', options);
