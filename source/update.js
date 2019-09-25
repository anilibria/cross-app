import Vue from 'vue'

// import router from ':src/script/router'
// import store from ':src/script/store'

import index from ':src/update.vue'

window.app = new Vue({
    // router, store,
    render: handler => handler(index)
}).$mount('#app')