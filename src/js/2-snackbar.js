import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('input[name="delay"]'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const delayValue = refs.delayInput.value;
  const promiseCheckedRadio = document.querySelector(
    'input[name="state"]:checked'
  );
  if (!promiseCheckedRadio) {
    return;
  }
  const promiseValue = promiseCheckedRadio.value;
  new Promise((resolve, reject) => {
    if (promiseValue === 'fulfilled') {
      resolve(delayValue);
    } else if (promiseValue === 'rejected') {
      reject(delayValue);
    }
  })
    .then(value => {
      setTimeout(() => {
        iziToast.success({
          title: `✅ Fulfilled promise in ${value}ms`,
          position: 'topRight',
          titleColor: 'white',
          backgroundColor: '#1ee624',
          progressBar: false,
          icon: '',
        });
      }, value);
    })
    .catch(value => {
      setTimeout(() => {
        iziToast.error({
          title: `❌ Rejected promise in ${value}ms`,
          position: 'topRight',
          backgroundColor: '#f53d3d',
          titleColor: 'white',
          progressBar: false,
          icon: '',
        });
      }, value);
    });
  e.currentTarget.reset();
});
