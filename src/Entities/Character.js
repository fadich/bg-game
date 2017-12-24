export default function (options) {
  let x = options['x'] || 0
  let y = options['y'] || 0
  let movement = options['movement']
  let model = options.model || {style: {'background-color': 'red'}}
  let name = options['name'] || 'Character'
  let id = options['id'] || Date.now()

  this.getCoordinates = () => {
    return {
      x: x,
      y: y,
      toString () {
        return x + '-' + y
      }
    }
  }

  this.setCoordinates = (X, Y) => {
    x = X
    y = Y

    return this
  }

  this.getMovement = () => {
    return movement
  }

  this.getModel = () => {
    return model
  }

  this.getId = () => {
    return id
  }

  this.getName = () => {
    return name
  }
}
