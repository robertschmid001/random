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
import Mentions from './components/global/_subs/Mentions.vue'

import holdingTable from './components/Portefeuille/tables/HolTable.vue'
import entTable from './components/Portefeuille/tables/EntTable.vue'
import globEntTable from './components/Portefeuille/tables/GlobEntTable.vue'
import contTable from './components/Portefeuille/tables/ContTable.vue'
import assTable from './components/Portefeuille/tables/AssTable.vue'
import cotTable from './components/Portefeuille/tables/CotTable.vue'
import chartHub from './components/Portefeuille/_subs/charts/ChartHub.vue'

import createPassword from './components/modals/modal-create-password.vue'
import initialisation from './components/modals/initialisation.vue'
import mdp from './components/modals/modal-password.vue'
import signUp from './components/modals/modal-signup.vue'
import axios from "axios"

import { store } from './store/Store'

Vue.use(Router)

let router = new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            redirect: {
                name: "Login"
            }
        },
        
        // {
            // path: '*',
            // name: 'Accueil',
            // component: Home,
            // meta: {
            //     requiresAuth: true
            // }
        // }
        {
            path: '/login',
            name: 'Login',
            component: Login,
            children: [
                {
                    path: 'initialisation',
                    name: 'initialisation',
                    component: initialisation
                }, {
                    path: 'inscription',
                    name: 'signup',
                    component: signUp
                }, {
                    path: 'mot-de-passe-oublie',
                    name: 'mdp',
                    component: mdp
                },
            ]
        }, {
            path: '/createPassword/:hash?',
            name: 'createPassword',
            component: createPassword,
        }, {
            path: '/accueil',
            name: 'Accueil',
            component: Home,
            meta: {
                requiresAuth: true
            }
        }, {
            path: '/profil',
            name: 'Profil',
            component: Profile,
            meta: {
                requiresAuth: true
            }
        }, {
            path: '/recherche',
            name: 'Recherche assuré',
            component: Search,
            meta: {
                requiresAuth: true
            }
        }, {
            path: '/portefeuille',
            name: 'Portefeuille',
            component: Portefeuille,
            children: [
            {   path: '',
                name: 'Mon Portefeuille clients',
                component: holdingTable
            }, {
                path: '/entreprises',
                name: 'Toutes les entreprises',
                component: globEntTable
            }, {
                path: ':hol?:nuH?/entreprises',
                name: 'entreprise',
                component: entTable
            }, {
                path: ':hol?:nuH?/:ent?:nuC?/contrats',
                name: 'contrats',
                component: contTable
            }, {
                path: ':hol?:nuH?/:ent?:nuC?/:cont?:nC?/assures',
                name: 'assures',
                component: assTable
            }, {
                path: ':hol?:nuH?/:ent?:nuC?/:cont?:nC?/cotisations',
                name: 'cotisations',
                component: cotTable
            }, {
                path: ':hol?:nuH?/:ent?:nuC?/:cont?:nC?/Graphiques et Tableaux',
                name: 'tableaux et graphiques',
                component: chartHub
            }
            ],
                meta: {
                    requiresAuth: true
                }
        }, {
            path: '/messagerie',
            name: 'Messagerie',
            component: Email,
            meta: {
                requiresAuth: true
            }
        }, {
            path: '/documents',
            name: 'Documents',
            component: Documents,
            meta: {
                requiresAuth: true,
                requiresRoot: true
            }
        }, {
            path: '/actualites',
            name: 'Actualites',
            component: Actualites,
            meta: {
                requiresAuth: true
            }
        }, {
            path: '/extraction/:type?',
            name: 'Extraction',
            component: Extraction,
            meta: {
                requiresAuth: true
            }
        }, {
            path: '/mentions-legales',
            name: 'Mentions-legales',
            component: Mentions
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.name === 'Login') {
        store.state.authenticated = false
    }
    // if (to.matched.some(record => record.meta.requiresRoot)) {
    //     if ( this.$store.state.cabinet.user_type === 'root' ) {
    //         next()
    //     } else next(from.name)
    // }
    if (to.name === 'createPassword') {
        store.state.authenticated = false
        axios.post('https://courtier.cpms.fr/logout')
        .then(response => {
            if (response.data.status) {
                // console.log('inside passCreateRoute')
            store.state.authenticated = false
            }
            // console.log('under passCreateRoute')
        })
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        axios.post('https://courtier.cpms.fr/isLoged')
            .then(response => {
                if (response.data.status){
                    store.state.authenticated = true
                    next()
                } else {
                    store.state.authenticated = false
                    next('/login')
                }
            })
    } else {
        next()
    }
})

export default router