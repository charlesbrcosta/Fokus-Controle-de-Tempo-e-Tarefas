const html = document.querySelector('html');
const buttons = document.querySelectorAll('.app__card-button');
const startPause = document.getElementById('start-pause');
const startPauseBt = document.querySelector('#start-pause span'); 
const banners = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const checkbox = document.querySelector('input[type=checkbox]');
const musicFocoInput = document.getElementById('alternar-musica');
const iconStartPause = document.querySelector('.app__card-primary-butto-icon');
const time = document.getElementById('timer');

let timeSecond = 1500;
let intervalId = null

//instância de um novo objeto Audio
const music = new Audio('./sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sons/play.wav');
const audioPause = new Audio('./sons/pause.mp3');
const audioFinishedTime = new Audio('./sons/beep.mp3');

music.loop = true;

let musicLoaded = false;

// O evento é acionado quando os metadados da músicas são carregados com sucesso.
music.addEventListener('loadedmetadata', () => {
    musicLoaded = true;
});

musicFocoInput.addEventListener('change', () => {
    if(musicLoaded){
        if(music.paused){
            music.play();
        } else {
            music.pause();
        }
    } else {
        console.error('Erro: A música ainda não foi carregada.');
    }
});

/* Definindo mensagem de contexto para diferentes estados  */
const contextMessages = {
    'foco' : `
    Otimize sua produtividade,<br>
    <strong class="app__title-strong">mergulhe no que importa.</strong>`,
    
    'descanso-curto' : `
    Que tal dar uma respirada?<br>
    <strong class="app__title-strong">Faça uma pausa curta!</strong>`,
    
    'descanso-longo' : `
    Hora de voltar à superfície.<br>
    <strong class="app__title-strong">Faça uma pausa longa.</strong>`,
}

/* Faz alterações nos contextos */
function handleChangeContext( context ) {
    handleUpdateTimerDisplay();
    // Verifica se o contexto é valido no objeto contextMessages antes de prosseguir.
    if(!contextMessages.hasOwnProperty( context )) {
        console.error(`Erro: contexto "${context}" inválido`);
        return;
    }
        
    const message = contextMessages[ context ];
    title.innerHTML = message;    
    
    html.setAttribute('data-contexto', context);
    banners.setAttribute('src', `./imagens/${context}.png`);
}

function handleSetbuttonActiveStyle(btn) {
    try {
        // Remove todos os active dos buttons.
        buttons.forEach(element => {
            element.classList.remove('active');
        });

        // Verfifica se o btn é uma instância de Element
        if(btn instanceof Element) {
            btn.classList.add('active');
        } else {
            throw new Error(`Erro: o argumento "${btn}" não é um elemento do DOM.`);
        }
    } catch(error) {
        console.log(error.message);
    }
}

buttons.forEach(button => {
    const attributeContext = button.getAttribute('data-contexto');  

    button.addEventListener('click', () =>{
        
        if(attributeContext === 'foco'){
            timeSecond = 1500;
            handleChangeContext('foco');
            
        } else if(attributeContext === 'short'){
            timeSecond = 300;
            handleChangeContext('descanso-curto');
            
        } else {
            timeSecond = 900;
            handleChangeContext('descanso-longo');
            
        }
            
        handleSetbuttonActiveStyle(button);
    });
});

const contagemRegressiva = () => {

    if(timeSecond === 0 ) {
        audioFinishedTime.play();
        alert('Tempo finalizado.');
        resetTime();
        return;
    }
    timeSecond -= 1;
    handleUpdateTimerDisplay();
}

startPause.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervalId){
        audioPause.play();
        resetTime();
        return;
    }
    audioPlay.play();
    intervalId = setInterval(contagemRegressiva, 1000);
    startPauseBt.textContent = 'Pausar'
    iconStartPause.setAttribute('src', './imagens/pause.png');
}

function resetTime() {
    clearInterval(intervalId);
    startPauseBt.textContent = 'Começar'
    iconStartPause.setAttribute('src', './imagens/play_arrow.png');
    intervalId = null;
}

function handleUpdateTimerDisplay() {
    const timer = new Date(timeSecond * 1000);
    const formattedTime = timer.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit'});
    time.innerHTML = `${formattedTime}`;
}

handleUpdateTimerDisplay();

window.onload = () => {
    // Garante que o checkbox esteja desmarcado ao carregar ou atualizar a página.
    checkbox.checked  = false;
}