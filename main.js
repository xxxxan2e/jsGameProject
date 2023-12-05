

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

let bulletList = [] // 총알들을 저장하는 리스트

function Bullet() {
    this.x = 0;// function Bullet에 속하는 x
    this.y = 0;
    this.init=function() { // 초기화
        this.x = spaceshipX + 20;// 총알은 우주선에서 발사되어야 하기 때문에
        this.y = spaceshipY;

        bulletList.push(this);
    };
    this.update = function() {
        this.y -= 7;
    };
}


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
    document.addEventListener("keydown", function (event) { // 키를 누르고 있을 때

        keysDown[event.keyCode] = true
        
    }); // 이벤트를 읽어오는 함수
    document.addEventListener("keyup",function (event){ // 키에서 손가락을 떼면
        delete keysDown[event.keyCode];

        if(event.keyCode == 32) {
            createBullet() // 스페이스 바를 누르면 총알 생성되는 함수 만듦
        }
    });
}

function createBullet() {
    console.log("총알 생성!")
    let b = new Bullet() // 총알 하나 생성
    b.init()
    console.log("새로운 총알 리스트",bulletList);
}


function update() {
    if(39 in keysDown) {// right. 키보드의 오른쪽 버튼이 눌렸다면
        spaceshipX += 5; // 우주선의 속도를 조절한다
    }
    if(37 in keysDown) { // left.
        spaceshipX -= 5;
    }
    if(spaceshipX <=0) { // x축 왼쪽 범위 한정
        spaceshipX=0
    }
    if(spaceshipX >= canvas.width-64) { // x축 오른쪽 범위 한정
        spaceshipX=canvas.width - 64;
    }

    // 우주선의 좌표값이 무한대로 업데이트가 되는 게 아닌! 경기장 안에서만 있게 하려면?

    // 총알의 y좌표 업데이트하는 함수 호출
    for(let i=0; i<bulletList.length; i++) {
        bulletList[i].update()
    };
    
}

function render() { // 이미지를 불러오는 함수
    ctx.drawImage(galaxybackgroundImage, 0, 0, canvas.width, canvas.height); // 무슨 이미지를 어디에(x,y 좌표) 가로, 세로 크기
    ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY);

    for(let i = 0; i<bulletList.length;i++) {
        ctx.drawImage(bulletImage,bulletList[i].x,bulletList[i].y)
    }
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

// 총알 만들기
// 1. 스페이스바를 누르면 총알 발사
// 2. 총알이 발사 = 총알의 y값이 --. x값 = 스페이스를 누른 순간의 우주선의 x좌표
// 3. 발사된 총알들은 총알 배열(Array)에 저장함
// 4. 모든 총알들은 x,y 좌표 값이 있어야 함
// 5. 총알 배열을 가지고 render 그려줌 