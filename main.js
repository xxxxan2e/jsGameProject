

let canvas;
let ctx;
canvas = document.createElement("canvas") // 변수 저장
ctx = canvas.getContext("2d") // 2d의 세계를 캔버스에 가져온다.
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas); // html에 canvas 세팅

let galaxybackgroundImage,spaceshipImage,bulletImage,enemyImage,gameoverImage;

// 우주선 좌표 (우주선은 움직이기 때문에 계속 바뀔 예정)
let spaceshipX = canvas.width/2-32
let spaceshipY = canvas.height-64


function loadImage() { // 이미지를 가져오는 함수
    galaxybackgroundImage = new Image();
    galaxybackgroundImage.src="images/galaxybackground.jpg";

    spaceshipImage = new Image();
    spaceshipImage.src="images/spaceship.png";

    bulletImage = new Image();
    bulletImage.src="images/bullet.png";

    enemyImage = new Image();
    enemyImage.src="images/enemy.png";

    gameoverImage = new Image();
    gameoverImage.src = "images/gameover.jpg";

}

let keysDown={}; // 객체타입으로
function setupKeyboardListener() {
    document.addEventListener("keydown", function(event) { // 키를 누르고 있을 때
        keysDown[event.keyCode] = true
        console.log("키다운객체에 들어간 값은?",keysDown)
        
    }); // 이벤트를 읽어오는 함수
    document.addEventListener("keyup",function(event){ // 키에서 손가락을 떼면
        delete keysDown[event.keyCode]
        console.log("버튼 클릭 후",keysDown)
    })
}

function update() {
    if(39 in keysDown) {// right. 키보드의 오른쪽 버튼이 눌렸다면
        spaceshipX += 5; // 우주선의 속도를 조절한다
    }
    if(37 in keysDown) { // left.
        spaceshipX -= 5;
    }

    // 우주선의 좌표값이 무한대로 업데이트가 되는 게 아닌! 경기장 안에서만 있게 하려면?
    
}

function render() { // 이미지를 불러오는 함수
    ctx.drawImage(galaxybackgroundImage, 0, 0, canvas.width, canvas.height); // 무슨 이미지를 어디에(x,y 좌표) 가로, 세로 크기
    ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY);
} 

function main() {
    update(); // 좌표값을 업데이트 하고
    render(); // 그려주고
    console.log("animation calls main function")
    requestAnimationFrame(main); // 화면을 계속해서 호출해준다. 좌표값이 갱신되고 그 값을 렌더로 표현하고 애니메이션이 반복.
}

loadImage();
setupKeyboardListener() 
main();

// 방향키를 누르면
// 우주선의 xy 좌표가 바뀌고
// 다시 render 그려준다
