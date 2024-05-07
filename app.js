const html = document.querySelector('html');
const buttons = document.querySelectorAll('.app__card-button');
const startPause = document.getElementById('start-pause');
const iniciarOuPausaBt = document.querySelector('#start-pause span'); 
const banners = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const checkbox = document.querySelector('input[type=checkbox]');
const musicFocoInput = document.getElementById('alternar-musica');
const iconComeçarOuPausar = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.getElementById('timer');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null

//instância de um novo objeto Audio
const music = new Audio('./sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('./sons/play.wav');
const audioPausa = new Audio('./sons/pause.mp3');
const audioTempoFinalizado = new Audio('./sons/beep.mp3');

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
    mostrarTempo();
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
            tempoDecorridoEmSegundos = 1500;
            handleChangeContext('foco');
            
        } else if(attributeContext === 'short'){
            tempoDecorridoEmSegundos = 300;
            handleChangeContext('descanso-curto');
            
        } else {
            tempoDecorridoEmSegundos = 900;
            handleChangeContext('descanso-longo');
            
        }
            
        handleSetbuttonActiveStyle(button);
    });
});

const contagemRegressiva = () => {

    if(tempoDecorridoEmSegundos === 0 ) {
        audioTempoFinalizado.play();
        alert('Tempo finalizado.');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPause.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if(intervaloId){
        audioPausa.play();
        zerar();
        return;
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausaBt.textContent = 'Pausar'
    iconComeçarOuPausar.setAttribute('src', './imagens/pause.png');
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausaBt.textContent = 'Começar'
    iconComeçarOuPausar.setAttribute('src', './imagens/play_arrow.png');
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();

window.onload = () => {
    // Garante que o checkbox esteja desmarcado ao carregar ou atualizar a página.
    checkbox.checked  = false;
}