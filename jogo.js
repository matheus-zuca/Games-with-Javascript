var canvas = document.getElementById('game-canvas')
var contexto = canvas.getContext('2d');
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
    tamanho: 20,
    posX: 230,
    posY: 230,

    desenha() {
        contexto.fillStyle = GBColorPalette["Dark Green"];
        contexto.fillRect(Snake.posX, Snake.posY, Snake.tamanho, Snake.tamanho);
    },
    atualiza() {
        Snake.posY += Snake.velocidadeY;
        Snake.posX += Snake.velocidadeX;

        if (Snake.posY > canvas.height) {
            Snake.posY = 0;
        }

        if (Snake.posX > canvas.width) {
            Snake.posX = 0;
        }

        if (Snake.posY < 0) {
            Snake.posY = canvas.height;
        }

        if (Snake.posX < 0) {
            Snake.posX = canvas.width;
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
        contexto.fillStyle = "rgba(0,0,0, 0.3)";
        contexto.fillRect(0,0,canvas.width, canvas.height);
        contexto.fillStyle = GBColorPalette["Darkest Green"];
        contexto.fillText("99 Jogos em 1", canvas.width/2 - contexto.measureText("99 Jogos em 1").width/2, 50); 
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
            Snake.desenha();
            Snake.atualiza();
        }
    },
    TelaPause:{
        atualiza(){

        }
    }
};

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
    if (e.keyCode == 37) {
        Snake.velocidadeX = -10;
        Snake.velocidadeY = 0;
    } else if (e.keyCode == 38) {
        Snake.velocidadeX = 0;
        Snake.velocidadeY = -10;
    } else if (e.keyCode == 39) {
        Snake.velocidadeX = 10;
        Snake.velocidadeY = 0;
    } else if (e.keyCode == 40) {
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