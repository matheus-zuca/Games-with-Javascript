const Player = require('./player.js');
let player = new Player(15);
let fieldOfView = Math.PI / 3;
let halfFOV = fieldOfView / 2;
let numRays = Math.floor(screen.width / 2);
let halfNumRays = Math.floor(numRays / 2);
let deltaAngle = fieldOfView / numRays;
let maxDepth = 20;

class Raycast {
  ray_cast() {
    let ray_angle = player.angle - halfFOV + 0.0001;
    for (let ray = 0; ray < numRays; ray++) {
      let sin_a = Math.sin(ray_angle);
      let cos_a = Math.cos(ray_angle);

      let x_vert;
      let dx;
      //Veritcals
      if (cos_a > 0) {
        x_vert = x_map + 1;
        dx = 1;
      } else {
        x_vert = x_map - 1e-6;
        dx = -1;
      }

      ray_angle += deltaAngle;
    }
  }
}

module.exports = Raycast;
