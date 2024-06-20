// Import stylesheets
import './style.css';
const GameMap = require('./gamemap.js');
const Player = require('./player.js');

// Write Javascript code!
var canvas = document.getElementById('app');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');

let map = new GameMap(25);
let player = new Player(10);
Draw();

function Draw() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  map.draw_map(ctx);
  player.draw(ctx);
  //requestAnimationFrame(Draw)
  setInterval(Draw, 1000 / 10);
}

document.addEventListener('keydown', (e) => {
  player.movement(e);
});
