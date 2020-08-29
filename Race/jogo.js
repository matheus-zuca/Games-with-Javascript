var canvas = document.getElementById('game-canvas')
var contexto = canvas.getContext('2d');
var GBColorPalette = {
    "Background": "#CADC9F",
    "Darkest Green": "#0f380f",
    "Dark Green": "#306230",
    "Light Green": "#8bac0f",
    "Lightest Green": "#9bbc0f",
    "White": "#ffffff",
    "Black": "#000000"
}
var player = CriarCarro(canvas.height-80, canvas.width/2-3, GBColorPalette["Dark Green"]);
var total = 0;
var enemy = CriarCarro(0, 230, GBColorPalette["Black"]);



function CriarCarro(baseX, baseY, color){
var Carro ={
	baseY: baseX,
	baseX:baseY,
	velocidadeY:0,
	velocidadeX:0,
	desenha(){

		Carro.baseY += Carro.velocidadeY;
		Carro.baseX += Carro.velocidadeX;
		contexto.fillStyle = color;
		//Corpo do carro
		contexto.fillRect(Carro.baseX,Carro.baseY, 10, 60);
		//Eixos
		contexto.fillRect(Carro.baseX-17,Carro.baseY+10, 40, 10);
		contexto.fillRect(Carro.baseX-17,Carro.baseY+45, 40, 10);
		//Rodas
		contexto.fillRect(Carro.baseX-17,Carro.baseY+5, 8, 20);
		contexto.fillRect(Carro.baseX+23,Carro.baseY+5, 8, 20);
		contexto.fillRect(Carro.baseX-17,Carro.baseY+40, 8, 20);
		contexto.fillRect(Carro.baseX+23,Carro.baseY+40, 8, 20);
	},
	detectaBarreira(){
		if(Carro.baseX <= 177 && Carro.velocidadeX < 0){
			Carro.velocidadeX = 0;
		}

		if(Carro.baseX >= 317 && Carro.velocidadeX > 0){
			Carro.velocidadeX = 0;
		}

		if(Carro.baseY <= 10 && Carro.velocidadeY < 0){
			Carro.velocidadeY = 0;
		}

		if(Carro.baseY >= 430 && Carro.velocidadeY > 0){
			Carro.velocidadeY = 0;
		}
	},
	andar(){
		Carro.baseY +=5;
	}
}

return Carro;
}

function Controle(){
	var baseX;
	if(enemy.baseY > 500){
		baseX = Math.floor(Math.random() * (317 - 177)) + 177;
		enemy = CriarCarro(0, baseX, GBColorPalette["Black"]);
	}

	enemy.desenha();
	enemy.andar();
}

var Estrada = {
	desenha(){
		contexto.fillStyle = GBColorPalette["Light Green"];
		contexto.fillRect(150 ,0, 200, canvas.height);
		contexto.fillStyle = GBColorPalette["Darkest Green"];
		contexto.fillRect(150 ,0, 5, canvas.height);
		contexto.fillRect(350 ,0, 5, canvas.height);
		
		
		for(var i = total; i < 500; i+=40){
		contexto.fillStyle = GBColorPalette["Dark Green"];
		contexto.fillRect(150 ,i, 5, 20);
		contexto.fillRect(350 ,i, 5, 20);
		contexto.fillStyle = GBColorPalette["White"];
		contexto.fillRect(250 ,i, 5, 20);
	}

		if(total >= 39){
			total = 0;
		}else{
		total += 3;
	}


	}
}


var Fundo = {
	altura: canvas.height,
	largura: canvas.width,
	desenha(){
		contexto.fillStyle = GBColorPalette["Lightest Green"];
		contexto.fillRect(0,0,Fundo.altura, Fundo.largura);
	}
}

function loop(){
	Fundo.desenha();
	Estrada.desenha();
	player.detectaBarreira();
	player.desenha();
	Controle();
	enemy.desenha();
	enemy.andar();
	requestAnimationFrame(loop);
}

loop();

document.addEventListener('keydown', Andar);
document.addEventListener('keyup', Para);

function Para(){
	    player.velocidadeY = 0;
	        player.velocidadeX = 0;
}

function Andar(e) {

    if (e.keyCode == 37) {
        player.velocidadeX = -10;
        player.velocidadeY = 0;
    } else if (e.keyCode == 38) {
        player.velocidadeX = 0;
        player.velocidadeY = -10;
    } else if (e.keyCode == 39) {
        player.velocidadeX = 10;
        player.velocidadeY = 0;
    } else if (e.keyCode == 40) {
        player.velocidadeX = 0;
        player.velocidadeY = 10;
    }
}