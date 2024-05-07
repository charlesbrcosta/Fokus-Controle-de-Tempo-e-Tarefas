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
let musicLoaded = false;
let listTimeSecond = {
    'foco' : 1500, 
    'short' : 300,
    'long' : 900, 
}

//instância de objetos de Audio
const music = new Audio('./sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sons/play.wav');
const audioPause = new Audio('./sons/pause.mp3');
const audioFinishedTime = new Audio('./sons/beep.mp3');

music.loop = true;

// Funções relacionadas a música
music.addEventListener('loadedmetadata', () => {
    // O evento é acionado quando os metadados da músicas são carregados com sucesso.
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

// Funções relacionadas ao contexto e mensagens
const contextMessages = {
    'foco' : `
    Otimize sua produtividade,<br>
    <strong class="app__title-strong">mergulhe no que importa.</strong>`,
    
    'short' : `
    Que tal dar uma respirada?<br>
    <strong class="app__title-strong">Faça uma pausa curta!</strong>`,
    
    'long' : `
    Hora de voltar à superfície.<br>
    <strong class="app__title-strong">Faça uma pausa longa.</strong>`,
}

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

function handleGetTimeByContext(context) {
    if(listTimeSecond.hasOwnProperty(context)){
        return listTimeSecond[context];
    }

    console.error(`Erro: contexto "${context} inválido."`);
    return null;
}

// Funções relacionadas à contagem regressiva
const handleCountDown = () => {

    if(timeSecond === 0 ) {
        audioFinishedTime.play();
        alert('Tempo finalizado.');
        handleResetTime();
        return;
    }
    timeSecond -= 1;
    handleUpdateTimerDisplay();
}

function handleStartOrPause() {
    if(intervalId){
        audioPause.play();
        handleResetTime();
        return;
    }
    audioPlay.play();
    intervalId = setInterval(handleCountDown, 1000);
    startPauseBt.textContent = 'Pausar'
    iconStartPause.setAttribute('src', './imagens/pause.png');
}

function handleResetTime() {
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

// Funções auxiliares
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

// Event listeners e inicialização
buttons.forEach(button => {
    const attributeContext = button.getAttribute('data-contexto');  

    button.addEventListener('click', () =>{
        const time = handleGetTimeByContext(attributeContext);
        if(time !== null) {
            timeSecond = time;
            handleChangeContext(attributeContext);
            handleSetbuttonActiveStyle(button);            
        }        
    });
});

startPause.addEventListener('click', handleStartOrPause);
handleUpdateTimerDisplay();
handleChangeContext();

window.onload = () => {
    // Garante que o checkbox esteja desmarcado ao carregar ou atualizar a página.
    checkbox.checked  = false;
}
    