// Key codes
const LEFT_ARROW = 37
const UP_ARROW = 38
const RIGHT_ARROW = 39
const DOWN_ARROW = 40
const W = 87
const A = 65
const S = 83
const D = 68
const SPACE = 32

export default class InputHandler {
  constructor () {
    this.horizontal = 0
    this.vertical = 0
    this.fire = false

    document.addEventListener('keydown', event => {
      if ([LEFT_ARROW, UP_ARROW, RIGHT_ARROW, DOWN_ARROW, SPACE].includes(event.keyCode)) {
        event.preventDefault()
      }

      switch (event.keyCode) {
        case A:
        case LEFT_ARROW:
          this.horizontal = -1
          break
        case D:
        case RIGHT_ARROW:
          this.horizontal = 1
          break
        case W:
        case UP_ARROW:
          this.vertical = -1
          break
        case S:
        case DOWN_ARROW:
          this.vertical = 1
          break
        case SPACE:
          this.fire = true
          break
      }
    })

    document.addEventListener('keyup', event => {
      switch (event.keyCode) {
        case A:
        case LEFT_ARROW:
          if (this.horizontal < 0) this.horizontal = 0
          break
        case D:
        case RIGHT_ARROW:
          if (this.horizontal > 0) this.horizontal = 0
          break
        case W:
        case UP_ARROW:
          if (this.vertical < 0) this.vertical = 0
          break
        case S:
        case DOWN_ARROW:
          if (this.vertical > 0) this.vertical = 0
          break
        case SPACE:
          this.fire = false
          break
      }
    })
  }

  getFire () {
    return this.fire
  }

  getDirectionalInput () {
    return {
      x: this.horizontal,
      y: this.vertical
    }
  }
}
