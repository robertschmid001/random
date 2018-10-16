import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Profile from './components/Profile.vue'
import Search from './components/Search.vue'
import Portefeuille from './components/Portefeuille/Portefeuille.vue'
import Email from './components/Email.vue'

import Home2 from './components/Home2.vue'
import Documents from './components/Documents.vue'
import Actualites from './components/Actualites.vue'
import Extraction from './components/Extraction.vue'

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
            name: 'Home',
            component: Home
        },{
            path: '/login',
            name: 'Login',
            component: Login
        }, {
            path: '/home',
            name: 'Home',
            component: Home
        }, {
            path: '/profile',
            name: 'Profile',
            component: Profile
        }, {
            path: '/recherche',
            name: 'Search',
            component: Search
        }, {
            path: '/portefeuille',
            name: 'Portefeuille',
            component: Portefeuille
        }, {
            path: '/messagerie',
            name: 'Email',
            component: Email
        }, {
            path: '/home2',
            name: 'Home2',
            component: Home2
        }, {
            path: '/documents',
            name: 'Documents',
            component: Documents
        }, {
            path: '/actualites',
            name: 'Actualites',
            component: Actualites
        }, {
            path: '/extraction',
            name: 'Extraction',
            component: Extraction
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