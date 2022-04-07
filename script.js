//GRAB ELEMENTS
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//RESIZE WINDOW
canvas.width = 1024;
canvas.height = 576;
const gravity = 0.7;

const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./img/background.png",
});
//CANVAS BACKGROUND
ctx.fillRect(0, 0, canvas.width, canvas.height);

//PLAYER OBJECT
const player = new Fighter({
  position: { x: 0, y: 0 },
  velocity: { x: 0, y: 0 },
  offset: { x: 0, y: 0 },
});

//ENEMY OBJECT
const enemy = new Fighter({
  position: { x: 500, y: 0 },
  velocity: { x: 0, y: 0 },
  offset: { x: -50, y: 0 },
  color: "blue",
});

//MOVEMENT FIX (2KEYS AT SAME TIME)

const keys = {
  a: { pressed: false },
  d: { pressed: false },
  //  w: { pressed: false },
  ArrowLeft: { pressed: false },
  ArrowRight: { pressed: false },
  //  ArrowUp: { pressed: false },
};
//let lastkey;

//COLLISION MATH
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <=
      rectangle2.position.y + rectangle2.heighta
  );
}

//ANIMATION LOOP
function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  player.update();
  enemy.update();

  //PLAYER MOVE TO THE DIRECTION OF THE KEY
  player.velocity.x = 0;

  if (keys.a.pressed && player.lastkey === "a") {
    player.velocity.x = -5;
  } else if (keys.d.pressed && player.lastkey === "d") {
    player.velocity.x = 5;
  }
  //ENEMY MOVE TO THE DIRECTION OF THE KEY
  enemy.velocity.x = 0;

  if (keys.ArrowLeft.pressed && enemy.lastkey === "ArrowLeft") {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastkey === "ArrowRight") {
    enemy.velocity.x = 5;
  }

  //DETECT COLLISION | ATTACK
  if (
    rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    enemy.health = -20;
    document.querySelector("#enemyhealth").style.width = enemy.health + "%";
  }

  if (
    rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    console.log("hehe");
  }
}
animate();

//EVENT LISTENERS

//MOVE RIGHT
window.addEventListener("keydown", event => {
  switch (event.key) {
    //MOVE PLAYER
    case "d":
      keys.d.pressed = true;
      player.lastkey = "d";
      break;
    //player.velocity.x = 3;
    case "a":
      keys.a.pressed = true;
      player.lastkey = "a";
      //player.velocity.x = -3;
      break;
    case "w":
      player.velocity.y = -5;
      break;
    case " ":
      player.attack();
      break;

    //MOVE ENEMY
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastkey = "ArrowRight";
      //player.velocity.x = 3;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastkey = "ArrowLeft";
      //player.velocity.x = -3;
      break;
    case "ArrowUp":
      enemy.velocity.y = -5;
      break;
    case "ArrowDown":
      enemy.attack();
      break;
  }
});
//MOVE LEFT
window.addEventListener("keyup", event => {
  switch (event.key) {
    //MOVE PLAYER
    case "d":
      keys.d.pressed = false;
      //player.velocity.x = 0;
      break;
    case "a":
      keys.a.pressed = false;
      //player.velocity.x = 0;
      break;
    // case "w":
    //   keys.w.pressed = false;
    //   break;

    //MOVE ENEMY
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      //player.velocity.x = 0;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      //player.velocity.x = 0;
      break;
    // case "ArrowUp":
    //   keys.ArrowUp.pressed = false;
    //   break;
  }
});
