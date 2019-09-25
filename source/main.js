import Vue from 'vue'

import router from ':src/script/router'
import store from ':src/script/store'

import main from ':src/views/main.vue'

window.app = new Vue({
    router, store,
    render: handler => handler(main)
}).$mount('#app')