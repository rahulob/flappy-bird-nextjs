// import Image from "next/image"

const gravity = 0.2
class Player {
  constructor(canvas) {
    this.canvas = canvas
    this.c = canvas.getContext('2d')
    this.velocity = 3
    this.x = 300
    this.y = 200
    this.w = 30
    this.h = 30
  }
  draw() {
    this.c.fillStyle = 'red'
    this.c.fillRect(this.x, this.y, this.w, this.h)
  }
  update() {
    this.y += this.velocity
    if (this.y + this.w + this.velocity <= this.canvas.height)
      this.velocity += gravity
    else this.velocity = 0
    this.draw()
  }
}

const gap = 200
class Pipe {
  constructor(canvas, x) {
    this.y1
    this.canvas = canvas
    this.c = canvas.getContext('2d')
    this.w = 100
    this.h = canvas.height
    this.x = x
    this.selectRandomHeight()
    this.velocity = 3
  }
  selectRandomHeight() {
    // const heights = [150, 200, 250, 300, 350, 400, 450, 500]
    // var height = heights[Math.floor(Math.random() * heights.length)];
    var max = (this.canvas.height - gap - 100) / 50;
    var height = Math.floor(Math.random() * (max - 2 + 1) + 2) * 50
    // var height = 600 - gap - 50;
    this.y1 = height - this.h
    this.y2 = this.h + this.y1 + gap
  }
  draw() {
    this.c.fillStyle = 'green'
    this.c.fillRect(this.x, this.y1, this.w, this.h)
    this.c.fillRect(this.x, this.y2, this.w, this.h)
  }
  update() {
    if (this.x + this.w - 3 < 0) {
      this.x = this.canvas.width
      this.selectRandomHeight()
    }
    else this.x -= 3
    this.draw()
  }
}

class Background {
  constructor(canvasContext) {
    this.c = canvasContext
    // this.bgImg = <img src="./img/bg.png" />
    this.bgImg = new Image()
    this.bgImg.src = '/img/main-bg.png'
    this.bgmfImg = new Image()
    this.bgmfImg.src = '/img/bgmf.png'
    this.bgmImg = new Image()
    this.bgmImg.src = '/img/bitmap.png'
    this.imgWidth = 0
    this.imgWidth2 = 0
  }
  update() {
    // this.c.fillRect(0, 0, this.c.canvas.width, this.c.canvas.height)
    this.c.drawImage(this.bgImg, 0, 0);

    this.c.drawImage(this.bgmfImg, this.imgWidth2, 0);
    this.c.drawImage(this.bgmfImg, this.imgWidth2 + this.c.canvas.width, 0);

    this.c.drawImage(this.bgmImg, this.imgWidth, 0, this.c.canvas.width, this.c.canvas.height);
    this.c.drawImage(this.bgmImg, this.imgWidth + this.c.canvas.width, 0, this.c.canvas.width, this.c.canvas.height);
    this.imgWidth -= 1.5;
    if (this.imgWidth <= -this.c.canvas.width)
      this.imgWidth = 0;
    this.imgWidth2 -= 0.2;
    if (this.imgWidth2 <= -this.c.canvas.width)
      this.imgWidth2 = 0;
  }
}

export { Player, Pipe, Background }