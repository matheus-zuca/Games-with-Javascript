let player_pos_X = 1.5;
let player_pos_Y = 5;
let player_angle = 0;
let player_speed = 0.04;
let player_rotation_speed = 0.02;
let color = '#ff0000';
let colorraycast = '#ffff00';
const GameMap = require('./gamemap.js');
let gameMap = new GameMap(25);

class Player {
  constructor(size) {
    this.x = player_pos_X;
    this.y = player_pos_Y;
    this.angle = player_angle;
    this.speed = player_speed;
    this.size = size;
  }

  draw(ctx) {
    for (let i = -50; i < 50; i++) {
      ctx.strokeStyle = colorraycast;
      ctx.beginPath();
      ctx.moveTo(this.x * 100, this.y * 10);
      ctx.lineTo(
        this.x * 100 + window.innerWidth * Math.cos(this.angle + i * 0.002),
        this.y * 10 + window.innerWidth * Math.sin(this.angle + i * 0.002)
      );
      ctx.stroke();
    }

    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(this.x * 100, this.y * 10, this.size, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }

  check_wall(x, y) {
    return `${x}, ${y}` in gameMap.worldMap;
  }

  check_collision(dx, dy) {
    if (!this.check_wall(parseInt(this.x + dx), parseInt(this.y))) {
      this.x += dx;
      console.log('A velocidade de x é ' + dx);
    }

    if (!this.check_wall(parseInt(this.x), parseInt(this.y + dy))) {
      this.y += dy;
      console.log('A velocidade de y é ' + dy);
    }
  }

  movement(e) {
    let sin_a = Math.sin(this.angle);
    let cos_a = Math.cos(this.angle);
    let dx = 0;
    let dy = 0;
    let speed_sin = this.speed * sin_a;
    let speed_cos = this.speed * cos_a;

    switch (e.keyCode) {
      case 87: //W
        dx = speed_cos;
        dy = speed_sin;
        break;
      case 65: //A
        dx = speed_sin;
        dy = -speed_cos;
        break;
      case 83: //S
        dx = -speed_cos;
        dy = -speed_sin;
        break;
      case 68: //D
        dx = -speed_sin;
        dy = speed_cos;
        break;
      case 37:
        this.angle -= player_rotation_speed;
        break;
      case 39:
        this.angle += player_rotation_speed;
        break;
      default:
        break;
    }

    this.check_collision(dx, dy);
  }
}

module.exports = Player;
