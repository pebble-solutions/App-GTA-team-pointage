import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import QrCode from '../views/QrCode.vue'
import PersonnelList from '../views/PersonnelList.vue'
import PersonnelPresent from '../views/PersonnelPresent.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/qrcode',
    name: 'QrCode',
    component: QrCode
  },
  {
    path: '/personnel-list',
    name: 'PersonnelList',
    component: PersonnelList
  },
  {
    path: '/personnel-present',
    name: 'PersonnelPresent',
    component: PersonnelPresent
  },
  // {
  //   path: '/about',
  //   name: 'À propos',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  // {
  //   path: '/element/:id',
  //   name: 'Element',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Element.vue'),
  //   children: [
  //     {
  //       path: 'properties',
  //       component: () => import('../views/ElementProperties.vue')
  //     },
  //     {
  //       path: 'informations',
  //       component: () => import('../views/ElementInformations.vue')
  //     }
  //   ]
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
