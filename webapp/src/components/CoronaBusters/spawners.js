import MovingGameObject from './gameObject'

class MovingGameObjectSpawner {
  constructor (gameImage, gameWidth, gameHeight, speed, points) {
    this.gameImage = gameImage
    this.gameWidth = gameWidth
    this.gameHeight = gameHeight
    this.spawnedGameObjects = []
    this.gameObjectSpeed = speed
    this.gameObjectPoints = points
  }

  removeGameObjects (indices) {
    let points = 0
    this.spawnedGameObjects = this.spawnedGameObjects.filter((gameObject, i) => {
      if (indices.includes(i)) {
        points += gameObject.getPoints()
        return false
      } else {
        return true
      }
    })
    return points
  }

  spawnGameObject () {
    this.spawnedGameObjects.push(
      new MovingGameObject(
        this.gameImage,
        Math.random() * (this.gameWidth - this.gameImage.width),
        0 - this.gameImage.height,
        this.gameObjectSpeed / 2 + Math.random() * this.gameObjectSpeed,
        this.gameObjectPoints
      )
    )
  }

  getSpawnedGameObjects () {
    return this.spawnedGameObjects
  }
}

export class EnemySpawner extends MovingGameObjectSpawner {
  constructor (gameImage, gameWidth, gameHeight) {
    super(gameImage, gameWidth, gameHeight, 1, 100)
    this.spawnRate = 500
  }

  startSpawning = () => {
    this.spawnGameObject()
    this.spawnRate--
    if (this.spawnRate < 50) this.spawnRate = 50
    setTimeout(this.startSpawning, this.spawnRate)
  }
}

export class PowerUpSpawner extends MovingGameObjectSpawner {
  constructor (gameImage, gameWidth, gameHeight) {
    super(gameImage, gameWidth, gameHeight, 0.5, 300)
    this.powerUpSpawnChance = 0.25
    this.interval = 2000
  }

  startSpawning = () => {
    setInterval(() => {
      const spawnChance = Math.random()
      if (spawnChance <= this.powerUpSpawnChance) {
        this.spawnGameObject()
      }
    }, this.interval)
  }
}
