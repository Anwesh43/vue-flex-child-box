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

class Animator {

    animated = false

    start(cb) {
        if (!this.animated) {
            this.animated = true
            this.interval = setInterval(() => {
                cb()
            }, delay)
        }
    }

    stop() {
        if (this.animated) {
            this.animated = false
            clearInterval(this.interval)
        }
    }
}

const animator = new Animator()
Vue.component('child-box', {
    created() {
        this.state.startUpdating(() => {
            animator.start(() => {
                this.state.update(() => {
                    animator.stop()
                })
            })
        })

    },
    data() {
        const state = new State()
        return {state}
    },

    computed: {
        childBoxStyle() {
            const background = 'teal'
            const width = `${50 * this.state.scale}px`
            const height = `${50 * this.state.scale}px`
            const textAlign = 'center'
            const fontSize = '20px'
            const color = 'white'
            return {background, width, height, textAlign, fontSize, color}
        }
    },
    template : '<div :style = "childBoxStyle"><slot></slot></div>'
})

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
