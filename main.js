

let canvas;
let ctx;
canvas = document.createElement("canvas") // 변수 저장
ctx = canvas.getContext("2d") // 2d의 세계를 캔버스에 가져온다.
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas); // html에 canvas 세팅

let galaxybackgroundImage,spaceshipImage,bulletImage,enemyImage,gameoverImage;
function loadImage() { // 이미지를 가져오는 함수
    galaxybackgroundImage = new Image();
    galaxybackgroundImage.src="images/galaxybackground.jpg";

    spaceshipImage = new Image();
    spaceshipImage.src="images/spaceship.png";

    bulletImage = new Image();
    bulletImage.src="images/bulletImage.png";

    enemyImage = new Image();
    enemyImage.src="images/enemy.png";

    gameoverImage = new Image();
    gameoverImage.src = "images/gameover.jpg";

}

function render() { // 이미지를 불러오는 함수
    ctx.drawImage(galaxybackgroundImage, 0, 0, canvas.width, canvas.height) // 무슨 이미지를 어디에(x,y 좌표) 가로, 세로 크기
} 



loadImage()
render()
