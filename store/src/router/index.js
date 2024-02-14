import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store' // Assicurati di importare il tuo store Vuex

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: { requiresAuth: true } // Aggiungi un meta campo per indicare che questa rotta richiede autenticazione
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    // Se la rotta richiede autenticazione e l'utente non è autenticato, reindirizzalo alla pagina di login
    next({ name: 'login' })
  } else {
    next() // Altrimenti, procedi con la navigazione
  }
})

export default router
