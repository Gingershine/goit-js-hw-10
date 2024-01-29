import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');


form.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
    event.preventDefault();
    
    const delay = event.target.delay.value;
    const value = event.target.state.value;
    
    const createPromise = () => {
        return new Promise((resolve, reject) => {
         
            setTimeout(() => {
                if (value === 'fulfilled') {
                    resolve(`✅ Fulfilled promise in ${delay}ms`);
                }
                reject(`❌ Rejected promise in ${delay}ms`);
            }, delay);
        });
    };

      createPromise()
    .then(value => {
      console.log(value);
      iziToast.show({
        message: `${value}`,
        position: 'topRight',
        backgroundColor: '#59A10D',
        messageColor: '#fff',
      });
    })
    .catch(error => {
      console.log(error);
      iziToast.show({
        message: `${error}`,        
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#fff',
      });
    });

  event.target.reset();
}

