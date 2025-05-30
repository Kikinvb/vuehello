import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ElementView from "../views/ElementView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/element',
    name: 'element',
    component: ElementView
  },
  {
    path: '/axios',
    name: 'axiosview',
    component: ()=>import('../views/AxiosView')
  },
  {
    path: '/login',
    name: 'login',
    component: ()=>import('../views/LoginView')
  },
  {
    path: '/register',
    name: 'register',
    component: ()=>import('../views/RegisterView')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
