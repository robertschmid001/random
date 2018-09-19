import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home.vue'
import Login from './components/Login.vue'

Vue.use(Router)

let router = new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            redirect: {
                name: "Login"
            }
        },{
        path: '*',
        name: 'home',
        component: Home
        },{
        path: '/login',
        name: 'Login',
        component: Login
        }, {
            path: '/home',
            name: 'home',
            component: Home
        }
    ]
})

// router.beforeEach((to, from, next) => {
//     let currentUser = firebase.auth().currentUser;
//     let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

//     if (requiresAuth && !currentUser) next('login')
//     else if (!requiresAuth && currentUser) next('chatrooms')
//     else next()
// })

export default router