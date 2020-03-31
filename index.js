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
            this.children--
        }
    }
})
