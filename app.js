const html = document.querySelector('html');

const buttons = document.querySelectorAll('.app__card-button');
const startPause = document.getElementById('start-pause');

const banners = document.querySelector('.app__image');

const title = document.querySelector('.app__title');

const checkbox = document.querySelector('input[type=checkbox]');

const musicFocoInput = document.getElementById('alternar-musica');

//instância de um novo objeto Audio
const music = new Audio('./sons/luna-rise-part-one.mp3');

let tempoDeCorridoEmSegundos = 5;
let intervaloId = null

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
            handleChangeContext('foco');
            
        } else if(attributeContext === 'short'){
            handleChangeContext('descanso-curto');

        } else {
            handleChangeContext('descanso-longo');
        }
            
        handleSetbuttonActiveStyle(button);
    });
});

const contagemRegressiva = () => {

    if(tempoDeCorridoEmSegundos === 0 ) {
        console.log('entrou no if do tempoDeCorrido');
        zerar();
        console.log('tempo finalizado..');
        return;
    }

    tempoDeCorridoEmSegundos -= 1;
    console.log(tempoDeCorridoEmSegundos);
}

startPause.addEventListener('click', inicial);

function inicial() {
    if(intervaloId){
        zerar();
        return;
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}

window.onload = () => {
    // Garante que o checkbox esteja desmarcado ao carregar ou atualizar a página.
    checkbox.checked  = false;
}
