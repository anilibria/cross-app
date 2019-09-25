import Vue from 'vue'
import update from ':src/views/update.vue'

window.app = new Vue({
    render: handler => handler(update)
}).$mount('#app')