const html = document.querySelector('html');
const buttons = document.querySelectorAll('.app__card-button');
const banners = document.querySelector('.app__image');

const title = document.querySelector('.app__title');
const subTitle = document.getElementsByTagName('strong');


function handleChangeContext( context ) {
    html.setAttribute('data-contexto', context);
    banners.setAttribute('src', `./imagens/${context}.png`);

    switch ( context ) {
        case 'foco':
            title.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case 'descanso-curto':
            title.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        
        case 'descanso-longo':
            title.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        
        default:
            break;
    }
}


buttons.forEach(button => {
    const getAttribute = button.getAttribute('data-contexto');    
    button.addEventListener('click', () =>{
        if(getAttribute === 'foco'){
            handleChangeContext('foco');
        } else if(getAttribute === 'short'){
            handleChangeContext('descanso-curto');
        } else {
            handleChangeContext('descanso-longo');
        }
    });
});

