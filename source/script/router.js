import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        makePath('/', 'Main'),
    ]
})

function makePath (link, component) {
    return {
        path: link,
        props: true,
        name: component.toLowerCase(),
        component: function () {
            return import(`:src/views/route/${ component }.vue`)
        }
    }
}