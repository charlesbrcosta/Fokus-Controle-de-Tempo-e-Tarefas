const html = document.querySelector('html');

const startButton = document.querySelector('.app__card-primary-button');
const temporizador = document.getElementById('time');
const img = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title'); 

const listButton = document.querySelectorAll('.app__card-button');

const duracaoFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescansoLongo = 900;

listButton.forEach(button => {

    const getValue = button.getAttribute('data-contexto');

    button.addEventListener('click', () => {
        if(getValue === 'foco'){
            html.setAttribute('data-contexto', 'foco');
        } else if(getValue === 'short'){
            html.setAttribute('data-contexto', 'descanso-curto');
        } else {
            html.setAttribute('data-contexto', 'descanso-longo');
        }
    });
});