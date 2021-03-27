import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Home from "../views/Home"
import BrushFace from "../views/BrushFace"
import Inventory from "../views/Inventory"
import Instruction from "../views/Instruction"
import Advisement from "../views/Advisement"
import Recovery from "../views/Recovery"
import ExchangeGifts from "../views/exchangeGifts"
import YCT from "../views/YCT"

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'brushFace',
    path: '/brushFace',
    component: BrushFace
  },
  {
    name: 'inventory',
    path: '/inventory',
    component: Inventory
  },
  {
    name: 'instruction',
    path: '/instruction',
    component: Instruction
  },
  {
    name: 'advisement',
    path: '/advisement',
    component: Advisement
  },
  {
    name: 'recovery',
    path: '/recovery',
    component: Recovery
  },
  {
    name: 'exchangeGifts',
    path: '/exchangeGifts',
    component: ExchangeGifts
  },
  {
    name: 'yct',
    path: '/yct',
    component: YCT
  },
]

const router = new VueRouter({
  routes
})

export default router
