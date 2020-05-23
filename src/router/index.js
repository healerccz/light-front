import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/home.vue'
// 导入全局样式表
import '../assets/css/global.css'
import Welcome from '../components/welcome.vue'
import Switch from '../components/switch.vue'
import Info from '../components/info.vue'

import axios from 'axios'
Vue.prototype.$http = axios

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: 'home' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{ path: '/welcome', component: Welcome }, { path: '/switch', component: Switch }, { path: '/info', component: Info }]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数 代表放行
  if (to.path === '/login') return next()
  // 获取 cookie
  const token = window.sessionStorage.getItem('token')
  console.log('token:' + token)
  if (!token) return next('/login')
  else { return next() }
})

export default router
