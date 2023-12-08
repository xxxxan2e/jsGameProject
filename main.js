

let canvas;
let ctx;
canvas = document.createElement("canvas") // 변수 저장
ctx = canvas.getContext("2d") // 2d의 세계를 캔버스에 가져온다.
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas); // html에 canvas 세팅

let galaxybackgroundImage,spaceshipImage,bulletImage,enemyImage,gameoverImage;
let gameOver = false; // true이면 게임 끝남, false이면 게임 안 끝남
let score = 0;


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
        this.alive = true; // true이면 살아있는 총알, false면 죽은 총알

        bulletList.push(this);
    };
    this.update = function() {
        this.y -= 7;
    };

    this.checkHit = function() {

        for(let i=0; i < enemyList.length; i++) {
            if(this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x<=enemyList[i].x+40 ){
                score++;
                this.alive = false; // 죽은 총알
                enemyList.splice(i,1);
            }
        }
        
    };
}

function generateRandomValue(min,max) {
    let randomNum = Math.floor(Math.random()*(max-min-1))+min
    return randomNum;
}

let enemyList=[]
function Enemy() {
    this.x = 0;
    this.y = 0;
    this.init = function() {
        this.y = 0 // 무조건 최상단 높이에서 시작
        this.x = generateRandomValue(0,canvas.width-67) // x 좌표 랜덤 위치로 지정, canvas 범위 내로 한정해준다
        enemyList.push(this);
    };
    this.update=function(){
        this.y += 1; // 적군의 속도 조절

        if(this.y >= canvas.height - 67) {
            gameOver = true;
        }
    }
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
}

function createEnemy() {
    const interval = setInterval(function() {
        let e = new Enemy()
        e.init()
    },1000) // setInterval에는 2개의 매개변수 => (호출하고 싶은 함수, 호출 간격(시간)) 시간의 단위는 ms
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
        if (bulletList[i].alive) {
            bulletList[i].update();
        bulletList[i].checkHit();
        }
        
    };

    for(let i=0; i<enemyList.length; i++) {
        enemyList[i].update();
    }
    
}

function render() { // 이미지를 불러오는 함수
    ctx.drawImage(galaxybackgroundImage, 0, 0, canvas.width, canvas.height); // 무슨 이미지를 어디에(x,y 좌표) 가로, 세로 크기
    ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY);
    ctx.fillText(`score:${score}`, 20, 20);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";

    for(let i = 0; i<bulletList.length;i++) {
        if(bulletList[i].alive) {
            ctx.drawImage(bulletImage,bulletList[i].x,bulletList[i].y);
        }
    }

    for(let i=0; i<enemyList.length;i++) {
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
    }
} 

function main() {
    if (!gameOver) { // 적군이 바닥에 닿으면서 true로 결과값 바뀌고 main이 멈추게 된다
        update(); // 좌표값을 업데이트 하고
        render(); // 그려주고
        console.log("animation calls main function")
        requestAnimationFrame(main); // 화면을 계속해서 호출해준다. 좌표값이 갱신되고 그 값을 렌더로 표현하고 애니메이션이 반복.
    } else {
        ctx.drawImage(gameoverImage,10,100,380,380);
    }
}

loadImage();
setupKeyboardListener() 
createEnemy();
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

// 적군 만들기
// x,y, init, update
// 적군은 위치 랜덤
// 적군은 밑으로 내려옴 = y좌표가 증가한다
// 1초마다 하나씩 적군이 생성
// 적군의 우주선이 바닥에 닿으면 game over
// 적군과 총알이 만나면 적군 처치. score 1점 획득

// 적군이 죽는다 = 총알이 적군에게 닿는다
// 총알의 y좌표 <= 적군의 y좌표 AND 총알의 x좌표 >= 적군의 x좌표 AND 총알의 x 좌표 <= 적군의 x좌표 + 적군의 넓이
// => 닿았다
// => 총알이 죽게 됨, 적군의 우주선이 없어짐, 점수 확득!