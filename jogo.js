var canvas = document.getElementById('game-canvas')
var contexto = canvas.getContext('2d');
var fruta = CriarFruta();
var dirAtual;
var GBColorPalette = {
    "Background": "#CADC9F",
    "Darkest Green": "#0f380f",
    "Dark Green": "#306230",
    "Light Green": "#8bac0f",
    "Lightest Green": "#9bbc0f"
}

function CriarCobra(posX, posY){
    var Snake = {
    tamanho: 10,
    posX: posX,
    posY: posY,

    desenha() {
        contexto.fillStyle = GBColorPalette["Dark Green"];
        contexto.fillRect(Snake.posX, Snake.posY, Snake.tamanho, Snake.tamanho);
        
    },
    detectarBordas(){
        if (Snake.posY > canvas.height - 10) {
            Snake.posY = 10;
        }

        if (Snake.posX > canvas.width - 10) {
            Snake.posX = 10;
        }

        if (Snake.posY < 10) {
            Snake.posY = canvas.height;
        }

        if (Snake.posX < 10) {
            Snake.posX = canvas.width;
        }
    }
    }

    return Snake;
}

var Cobra = {
    comprimentoCobra: 1,
    espaço: 2,
    velocidadeX: 0,
    velocidadeY: 0,
    pedacos: [],
    inicializacao(){
        Cobra.pedacos[0] = CriarCobra(250,250);
    },
    criarNova(){
        Cobra.pedacos[Cobra.comprimentoCobra] = CriarCobra(250,250);
        Cobra.comprimentoCobra++;
    },
    desenha(){
        for(var i = Cobra.comprimentoCobra-1; i > 0; i--){
            Cobra.pedacos[i].posX = Cobra.pedacos[i-1].posX;
            Cobra.pedacos[i].posY = Cobra.pedacos[i-1].posY;
            Cobra.pedacos[i].desenha();
            Cobra.pedacos[i].detectarBordas();
        }
        Cobra.pedacos[0].posX += Cobra.velocidadeX;
            Cobra.pedacos[0].posY += Cobra.velocidadeY;
            Cobra.pedacos[0].desenha();
            Cobra.pedacos[0].detectarBordas();
            Cobra.detectarColisao();
    },
    pegaFruta(){
        if(Cobra.pedacos[0].posX == fruta.posX && Cobra.pedacos[0].posY == fruta.posY){
            fruta = CriarFruta();
            Cobra.criarNova();
        }
    },
    detectarColisao(){
        for(var i = 1; i < Cobra.comprimentoCobra; i++){
             if(Cobra.pedacos[0].posX == Cobra.pedacos[i].posX && Cobra.pedacos[0].posY == Cobra.pedacos[i].posY){
                console.log(`Bateu no ${Cobra.pedacos[i]}`);
        }}
    }
}



const FUNDO = {
    altura: canvas.height,
    largura: canvas.width,
    desenha() {
        contexto.fillStyle = GBColorPalette["Light Green"];
        contexto.fillRect(0, 0, FUNDO.altura, FUNDO.largura);
    }
}

const Titulo = {
    desenha(texto){
        contexto.font = "30px Roboto";
        contexto.fillStyle = "rgba(0,0,0, 0.1)";
        contexto.fillRect(0,0,canvas.width, canvas.height);
        contexto.fillStyle = GBColorPalette["Darkest Green"];
        contexto.fillText(texto, canvas.width/2 - contexto.measureText(texto).width/2, 50);
    }

}

var telaAtual = {};

const TELAS = {
    TelaInicial: {
        atualiza(){
            FUNDO.desenha();
            Titulo.desenha("Teste - Jogo da Cobrinha");
            Cobra.inicializacao();
            Cobra.desenha();
        }
    },
    TelaJogo: {
        atualiza() {
            FUNDO.desenha();
            fruta.desenha();
            Cobra.desenha();
            Cobra.pegaFruta();
        }
    },
    TelaPause:{
        atualiza(){

        }
    },
    TelaGameOver:{
        atualiza(){
            FUNDO.desenha();
            Titulo.desenha("Fim de Jogo");
        }
    },
};

function CriarFruta(){
    var fruta = {
    posX: 0,
    posY: 0,
    tamanho: 10,
    cor: "#CADC9F",

    desenha(){
        contexto.fillStyle = fruta.cor;
        contexto.fillRect(fruta.posX, fruta.posY, fruta.tamanho,fruta.tamanho);
    },
    definirposicao(){
        var posY;
        var posX;
        while(posY % 10 != 0 || posY >= canvas.height){
            posY = Math.floor(Math.random()*canvas.height) + 1;
        }

        while(posX % 10 != 0 || posY >= canvas.width){
            posX = Math.floor(Math.random()*canvas.width) + 1;
        }

        fruta.posY = posY;
        fruta.posX = posX;
    }
    }

    fruta.definirposicao();

    return fruta;
}


function GetTelaAtual(telaSelecionada) {
    telaAtual = telaSelecionada;
}

function loop() {
    telaAtual.atualiza();
    requestAnimationFrame(loop);
}

document.addEventListener('keydown', Andar);

document.addEventListener('click', Iniciar);

function Iniciar(){
    GetTelaAtual(TELAS.TelaJogo);
}

function Andar(e) {

    if (e.keyCode == 37 && dirAtual != "direita") {
        dirAtual = "esquerda";
        Cobra.velocidadeX = -10;
        Cobra.velocidadeY = 0;
    } else if (e.keyCode == 38 && dirAtual != "baixo") {
        dirAtual = "cima";
        Cobra.velocidadeX = 0;
        Cobra.velocidadeY = -10;
    } else if (e.keyCode == 39&& dirAtual != "esquerda") {
        dirAtual = "direita";
        Cobra.velocidadeX = 10;
        Cobra.velocidadeY = 0;
    } else if (e.keyCode == 40&& dirAtual != "cima") {
        dirAtual = "baixo";
        Cobra.velocidadeX = 0;
        Cobra.velocidadeY = 10;
    } else if (e.keyCode == 32) {
        if (telaAtual == TELAS.TelaPause) {
            GetTelaAtual(TELAS.TelaJogo);
        } else {
            GetTelaAtual(TELAS.TelaPause);
        }
    }
}

GetTelaAtual(TELAS.TelaInicial);
loop();