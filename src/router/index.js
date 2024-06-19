// routes.js
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import About from '@/components/About.vue';
import Products from '../components/Product.vue';
import AdminCrud from '../components/CRUD/AdminCrud.vue';
import Log_In from '../components/security/Log-in.vue';
import store from '../components/VuexStore' ;
import Register from '../components/security/Register.vue';
import Perfil from '../components/PerfilUser.vue'
Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: { requiresAuth: true }  
        },
        {
            path: '/Perfil',
            name: 'Perfil',
            component: Perfil,
            meta: { requiresAuth: true }  
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '/products',
            name: 'Products',
            component: Products,
        },
        {
            path: '/crud',
            name: 'AdminCrud',
            component: AdminCrud,
            meta: { requiresAuth: true }  
        },
        {
            path: '/log_in',
            name: 'LogIn',
            component: Log_In
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: { requiresAuth: false }  
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
        if (!store.state.loggedIn) {
            next('/log_in');
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
