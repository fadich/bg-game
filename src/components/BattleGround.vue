<template>
    <div class="bg">
        <div class="info"></div>
        <div class="arena-wrap">
            <div class="left-side" style="width: 15%; background: #e0e5ef;"></div>
            <div class="arena">
                <div class="row" v-for="x in 10">
                    <a class="col" :id="x + '-' + y" v-for="y in 10" @click="focusOn(x, y)" @contextmenu="hideRange">
                        <div class="char-wrap" v-if="char = charOn(x, y)" :title="char.getName()">
                            <div class="char" :style="char.getModel().style"></div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="right-side" style="width: 35%; background: #e0e5ef;"></div>
        </div>
    </div>
</template>

<script>
  import Character from '../Entities/Character'
  import Vue from 'vue'

  let stoneModel = {
    style: {
      'background-image': 'url(https://images.vexels.com/media/users/3/145666/isolated/lists/63531ef59252017e7bd91cad6f7b6200-flat-stone-illustration.png)',
      'background-repeat': 'no-repeat',
      'background-size': '70px 90px',
      'border': 'none',
      'border-radius': '0',
      'width': '70px',
      'height': '70px'
    }
  }

  let ch1 = new Character({
    x: 5,
    y: 1,
    movement: 3,
    name: 'Orc-archer',
    model: {
      style: {
        'background-image': 'url(https://www.syncrpg.com/sam/data/tokenImages/Devin_Night/allfreezippedpacks/orgobosmed_32.png)',
        'background-repeat': 'no-repeat',
        'background-size': '70px 70px',
        'border': 'none',
        'border-radius': '0'
      }
    }
  })
  let ch2 = new Character({
    x: 8,
    y: 7,
    name: 'Minotaur',
    movement: 2,
    model: {
      style: {
        'background-image': 'url(https://orig00.deviantart.net/ca0f/f/2010/249/5/c/minotaur_walk_by_lionheartcartoon-d2y57n7.gif)',
        'background-repeat': 'no-repeat',
        'background-size': '70px 70px',
        'border': 'none',
        'border-radius': '0'
      }
    }
  })
  let ch3 = new Character({
    x: 1,
    y: 1,
    name: 'Sonic',
    movement: 5,
    model: {
      style: {
        'background-image': 'url(https://orig00.deviantart.net/fd4e/f/2012/282/d/d/sonic_sprite_walk_cycle_by_logic_monkey-d5hcbqe.gif)',
        'background-repeat': 'no-repeat',
        'background-size': '70px 70px',
        'border': 'none',
        'border-radius': '0'
      }
    }
  })
  let block1 = new Character({
    x: 2,
    y: 7,
    name: 'Stone',
    movement: 0,
    model: stoneModel
  })
  let block2 = new Character({
    x: 3,
    y: 7,
    name: 'Stone',
    movement: 0,
    model: stoneModel
  })
  let block3 = new Character({
    x: 5,
    y: 7,
    name: 'Stone',
    movement: 0,
    model: stoneModel
  })
  let block4 = new Character({
    x: 7,
    y: 3,
    name: 'Stone',
    movement: 0,
    model: stoneModel
  })
  let block5 = new Character({
    x: 7,
    y: 4,
    name: 'Stone',
    movement: 0,
    model: stoneModel
  })
  let block6 = new Character({
    x: 8,
    y: 3,
    name: 'Stone',
    movement: 0,
    model: stoneModel
  })
  let block7 = new Character({
    x: 10,
    y: 6,
    name: 'Stone',
    movement: 0,
    model: stoneModel
  })
  let block8 = new Character({
    x: 9,
    y: 6,
    name: 'Stone',
    movement: 0,
    model: stoneModel
  })
  let block9 = new Character({
    x: 6,
    y: 3,
    name: 'Stone',
    movement: 0,
    model: stoneModel
  })
  let block10 = new Character({
    x: 5,
    y: 3,
    name: 'Stone',
    movement: 0,
    model: stoneModel
  })
  let block11 = new Character({
    x: 9,
    y: 3,
    name: 'Stone',
    movement: 0,
    model: stoneModel
  })

  export default {
    name: 'BattleGround',
    data () {
      return {
        charsOn: {},
        focusedChar: null,
        movementFields: []
      }
    },
    methods: {
      addChar (char) {
        Vue.set(this.charsOn, char.getCoordinates(), char)
      },
      removeChar (char) {
        Vue.set(this.charsOn, char.getCoordinates(), null)
      },
      charOn (x, y) {
        return this.charsOn[x + '-' + y] || null
      },
      focusOn (x, y) {
        let char = this.charOn(x, y)
        if (char) {
          this.hideRange()
          this.focusedChar = char
          this.setMovementFields(x, y, char.getMovement())
            .displayRange()

          return
        }

        if (this.movementFields.indexOf(x + '-' + y) > -1) {
          this.removeChar(this.focusedChar)
          this.focusedChar.setCoordinates(x, y)
          this.addChar(this.focusedChar)
          this.focusedChar = null
          this.hideRange()

//        return
        }
      },
      setMovementFields (x, y, range) {
        if (range <= 0) {
          return this
        }

        let k

        k = (x + 1) + '-' + y
        if (x < 10 && !this.charsOn[k]) {
          this.movementFields.push(k)
          this.setMovementFields(x + 1, y, range - 1)
        }
        k = (x - 1) + '-' + y
        if (x > 1 && !this.charsOn[k]) {
          this.movementFields.push(k)
          this.setMovementFields(x - 1, y, range - 1)
        }
        k = x + '-' + (y + 1)
        if (y < 10 && !this.charsOn[k]) {
          this.movementFields.push(k)
          this.setMovementFields(x, y + 1, range - 1)
        }
        k = x + '-' + (y - 1)
        if (y > 1 && !this.charsOn[k]) {
          this.movementFields.push(k)
          this.setMovementFields(x, y - 1, range - 1)
        }

        return this
      },
      getFields () {
//        for (let i = 1; i <= 10; i++) {
//          for (let j = 1; j <= 10; j++) {
//            if (Math.abs(x - i) + Math.abs(y - j) <= range) {
//              let k = i + '-' + j
//              if (!this.charsOn[k]) {
//                this.allowedFields.push(k)
//              }
//            }
//          }
//        }
      },
      displayRange () {
        for (let field of this.movementFields) {
          let f = document.getElementById(field)

          f.classList.add('allowed-field')
        }
      },
      hideRange (ev) {
        this.movementFields = []

        for (let i = 1; i <= 10; i++) {
          for (let j = 1; j <= 10; j++) {
            let f = document.getElementById(i + '-' + j)

            f.classList.remove('allowed-field')
          }
        }

        if (ev) {
          ev.preventDefault()
        }
      }
    },
    created () {
      this.addChar(ch1)
      this.addChar(ch2)
      this.addChar(ch3)
      this.addChar(block1)
      this.addChar(block2)
      this.addChar(block3)
      this.addChar(block4)
      this.addChar(block5)
      this.addChar(block6)
      this.addChar(block7)
      this.addChar(block8)
      this.addChar(block9)
      this.addChar(block10)
      this.addChar(block11)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .bg {
        .info {
            height: 50px;
            border-bottom: 1px solid gray;
            margin-bottom: 25px;
        }

        .arena-wrap {
            display: flex;
            justify-content: space-between;
            .arena {
                margin: 0 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                .row {

                    &:first-child {
                        border-left: 1px solid black;
                    }
                    .col {
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        width: 70px;
                        height: 70px;

                        border-right: 1px solid black;
                        border-bottom: 1px solid black;

                        &:first-child {
                            border-top: 1px solid black;
                        }

                        .char-wrap {
                            .char {
                                width: 60px;
                                height: 60px;
                                border-radius: 30px;
                                border: 1px solid black;
                            }
                        }
                    }

                    .allowed-field {
                        background-color: #e0e0e0;
                    }
                }
            }
        }
    }
</style>
