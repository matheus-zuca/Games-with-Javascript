var canvas = document.getElementById('game-canvas')
var contexto = canvas.getContext('2d');
var fruta = CriarFruta();
var posAntigaX;
var posAntigaY;
var posAntePX;
var posAntePY;
var dirAtual;
var GBColorPalette = {
    "Background": "#CADC9F",
    "Darkest Green": "#0f380f",
    "Dark Green": "#306230",
    "Light Green": "#8bac0f",
    "Lightest Green": "#9bbc0f"
}
var Snake = {
    comprimentoCobra: 0,
    espaço: 5,
    velocidadeX: 0,
    velocidadeY: 0,
    tamanho: 10,
    posX: 230,
    posY: 230,

    desenha() {
        
        
        for(var i = 0; i < Snake.comprimentoCobra; i++){
            contexto.fillStyle = GBColorPalette["Dark Green"];
            posAntePX = posAntigaX;
            posAntePY = posAntigaY;
            contexto.fillRect(posAntePX, posAntePY, Snake.tamanho, Snake.tamanho);
        }

        contexto.fillStyle = GBColorPalette["Dark Green"];
        contexto.fillRect(Snake.posX, Snake.posY, Snake.tamanho, Snake.tamanho);
        
        posAntigaY = Snake.posY;
        posAntigaX = Snake.posX;
    },
    atualiza() {
        Snake.posY += Snake.velocidadeY;
        Snake.posX += Snake.velocidadeX;
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
    },
    detectarColisao(){
        if(Snake.posX == fruta.posX && Snake.posY == fruta.posY){
            Snake.comprimentoCobra++;
            fruta = CriarFruta();
        }
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
    desenha(){
        contexto.font = "30px Roboto";
        contexto.fillStyle = "rgba(0,0,0, 0.1)";
        contexto.fillRect(0,0,canvas.width, canvas.height);
        contexto.fillStyle = GBColorPalette["Darkest Green"];
        contexto.fillText("99 Jogos em 1", canvas.width/2 - contexto.measureText("99 Jogos em 1").width/2, 50);
        
        contexto.fillText("Clique pra começar", canvas.width/2 - contexto.measureText("Clique pra começar").width/2, 450); 

        contexto.font = "15px Roboto";
        contexto.fillText("(Por enquanto só o da cobrinha)", canvas.width/2 - contexto.measureText("(Por enquanto só o da cobrinha)").width/2, 80);
    }

}

var telaAtual = {};

const TELAS = {
    TelaInicial: {
        atualiza(){
            FUNDO.desenha();
            Snake.desenha();
            Titulo.desenha();
        }
    },
    TelaJogo: {
        atualiza() {
            
            FUNDO.desenha();
            fruta.desenha();
            Snake.desenha();
            Snake.atualiza();
            Snake.detectarBordas();
            Snake.detectarColisao();
        }
    },
    TelaPause:{
        atualiza(){

        }
    }
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
        Snake.velocidadeX = -10;
        Snake.velocidadeY = 0;
    } else if (e.keyCode == 38 && dirAtual != "baixo") {
        dirAtual = "cima";
        Snake.velocidadeX = 0;
        Snake.velocidadeY = -10;
    } else if (e.keyCode == 39&& dirAtual != "esquerda") {
        dirAtual = "direita";
        Snake.velocidadeX = 10;
        Snake.velocidadeY = 0;
    } else if (e.keyCode == 40&& dirAtual != "cima") {
        dirAtual = "baixo";
        Snake.velocidadeX = 0;
        Snake.velocidadeY = 10;
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