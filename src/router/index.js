import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/personnel',
    name: 'PersonnelList',
    component : () => import('../views/PersonnelList.vue'),
    children: [
      {
        path: '/personnel/pin/:id',
        name: 'ClockByPin',
        component: () => import('../views/CodePin.vue')
      },
    ]
  },
  {
    path: '/personnel-present',
    name: 'PersonnelPresent',
    component: () => import('../views/PersonnelPresent.vue'),
    children: [
      {
        path: '/personnel-present/:id',
        name: 'Informations',
        component: () => import('../views/Informations.vue'),
        children: [

        ]
      },
      {
        path: '/personnel-present/pin/:id',
        name: 'ClockByPinForPresentStaff',
        component: () => import('../views/CodePin.vue')
      },
    ]
  },
  {
    path: '/pointage/:id',
    name: 'Pointage',
    component: () => import('../views/Pointage.vue'),
  },
  {
    path: '/goodbye',
    name: 'Goodbye',
    component: () => import('../views/Goodbye.vue'),
    children: [
      {
        path: '/pointage/edit',
        name: 'EditPointage',
        component: () => import('../views/EditPointage.vue')
      },    
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
