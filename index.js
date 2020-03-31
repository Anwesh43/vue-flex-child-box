const scGap = 0.02
const delay = 30

class State {
    scale = 0
    dir = 0
    prevScale = 0

    update(cb) {
        this.scale += scGap * this.dir
        if (Math.abs(this.scale - this.prevScale) > 1) {
            this.scale = this.prevScale + this.dir
            this.dir = 0
            this.prevScale = this.scale
            cb(this.scale)
        }
    }

    startUpdating(cb) {
        if (this.dir == 0) {
            this.dir = 1 - 2 * this.prevScale
            cb()
        }
    }
}


const vueInstance = new Vue({
    el : '#app',
    data: {
      children : 0
    },

    methods: {
        add() {
            this.children++
        },
        sub() {
            if (this.children > 0) {
                this.children--
            }
        }
    }
})
