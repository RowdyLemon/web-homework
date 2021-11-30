export default class MovingGameObject {
  constructor (gameImage, x, y, speed, points) {
    this.img = gameImage
    this.position = {
      x,
      y
    }
    this.speed = speed
    this.points = points
  }

  canCollide () {
    return this.position.y >= 0 - this.img.height / 2
  }

  getPoints () {
    return this.points
  }

  getBoundBox () {
    return {
      x: this.position.x,
      y: this.position.y,
      width: this.img.width,
      height: this.img.height
    }
  }

  update (ctx) {
    this.position.y += this.speed
    ctx.drawImage(this.img, this.position.x, this.position.y)
  }
}
