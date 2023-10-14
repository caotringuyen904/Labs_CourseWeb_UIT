
// NGUYEN CAO TRI - 21522918 
// setup canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const ballCount = document.querySelector("p");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number
function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// Tạo lớp Cha Shape cho Ball và EvilCircle
class Shape {
    constructor(x, y, velX, velY, exists) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.exists = exists;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if (this.x + this.size >= width) {
            this.velX = -this.velX;
        }
        if (this.x - this.size <= 0) {
            this.velX = -this.velX;
        }
        if (this.y + this.size >= height) {
            this.velY = -this.velY;
        }
        if (this.y - this.size <= 0) {
            this.velY = -this.velY;
        }
        this.x += this.velX;
        this.y += this.velY;
    }
}

// Cho Ball kế thừa từ Shape và có thêm color và size
// Đồng thời thêm phương thức collisionDetect để xử lý va chạm giữa các Ball
class Ball extends Shape {
    constructor(x, y, velX, velY, color, size) {
        super(x, y, velX, velY, true);
        this.color = color;
        this.size = size;
    }
    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
            if (!(this === balls[j]) && balls[j].exists) {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.size + balls[j].size) {
                    balls[j].color = this.color =
                        "rgb(" +
                        random(0, 255) +
                        "," +
                        random(0, 255) +
                        "," +
                        random(0, 255) +
                        ")";
                }
            }
        }
    }
}

// Cho EvilCircle kế thừa từ Shape và có thêm color và size
// Đồng thời thêm phương thức setControls để xử lý di chuyển EvilCircle
// Và phương thức collisionDetect để xử lý va chạm giữa EvilCircle và Ball
// Mỗi khi va chạm nếu Ball tồn tại thì Ball.exists = false và EvilCircle.size += 10 và draw() lại trên canvas
class EvilCircle extends Shape {
    constructor(x, y, velX, velY, exists) {
        super(x, y, velX, velY, exists);
        this.color = "white";
        this.size = 10;
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }

    checkBounds() {
        if (this.x + this.size >= width) {
            this.x -= this.size;
        }
        if (this.x - this.size <= 0) {
            this.x += this.size;
        }
        if (this.y + this.size >= height) {
            this.y -= this.size;
        }
        if (this.y - this.size <= 0) {
            this.y += this.size;
        }
    }

    setControls() {
        let _this = this;
        window.onkeydown = function (e) {
            if (e.key === "a") {
                _this.x -= _this.velX;
            } else if (e.key === "d") {
                _this.x += _this.velX;
            } else if (e.key === "w") {
                _this.y -= _this.velY;
            } else if (e.key === "s") {
                _this.y += _this.velY;
            }
        };
    }

    // tính số lượng bóng còn exists = true và gán vào ballCount.textContent để hiển thị
    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
            if (balls[j].exists) {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.size + balls[j].size) {
                    balls[j].exists = false;
                    this.size += 10;
                    this.draw();
                }
            }
        }

        ballCount.textContent =
            "Ball count: " +
            balls.reduce((acc, ball) => {
                return (acc += ball.exists ? 1 : 0);
            }, 0);
    }
}

// Tạo mảng các Ball gồm 25 phần tử đặt ball count = tổng số phần tử
var balls = [];
while (balls.length < 25) {
    const size = random(10, 20);
    let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        "rgb(" +
            random(0, 255) +
            "," +
            random(0, 255) +
            "," +
            random(0, 255) +
            ")",
        size
    );
    balls.push(ball);
    ballCount.textContent = "Ball count: " + balls.length;
}

// Tạo EvilCircle với size = 10 và exists = true
var evilCircle = new EvilCircle(200, 300, 20, 20, true);

function loop() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }
    evilCircle.setControls();
    evilCircle.draw();
    evilCircle.checkBounds();
    evilCircle.collisionDetect();

    requestAnimationFrame(loop);
}

loop();
