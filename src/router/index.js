import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ForgetPassword from '../views/ForgetPassword.vue'
import Patients from '../views/Patients.vue'
import CodeValidation from '../views/CodeValidation.vue'
import ResetPassword from '../views/ResetPassword.vue'
import HealthCheck from '../views/HealthCheck.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/health-check',
    name: 'HealthCheck',
    component: HealthCheck
  },{
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/code-validation',
    name: 'CodeValidation',
    component: CodeValidation
  },
  {
    path: '/forget-password',
    name: 'ForgetPassword',
    component: ForgetPassword
  },
  {
    path: '/patients',
    name: 'Patients',
    component: Patients
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
