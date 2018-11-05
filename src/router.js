import Vue from 'vue'
import Router from 'vue-router'

import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Profile from './components/Profile.vue'
import Search from './components/Search.vue'
import Portefeuille from './components/Portefeuille/Portefeuille.vue'
import Email from './components/Email.vue'

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
            name: 'Accueil',
            component: Home
        },{
            path: '/login',
            name: 'Login',
            component: Login
        }, {
            path: '/accueil',
            name: 'Accueil',
            component: Home
        }, {
            path: '/profil',
            name: 'Profil',
            component: Profile
        }, {
            path: '/recherche',
            name: 'Recherche assuré',
            component: Search
        }, {
            path: '/portefeuille',
            name: 'Portefeuille',
            component: Portefeuille
        }, {
            path: '/messagerie',
            name: 'Messagerie',
            component: Email
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