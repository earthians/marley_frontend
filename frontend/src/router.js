import { createRouter, createWebHistory } from 'vue-router'
import { session } from './data/session'
import { users } from './data/users'

const routes = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/waitlist',
    name: 'Waitlist',
    component: () => import('@/pages/Waitlist.vue'),
  },
  {
    path: '/Register',
    name: 'Register',
    component: ()=> import('@/pages/Register.vue')
  },
  {
    path: '/Appointment',
    name: 'Appointment',
    component: ()=> import('@/pages/Appointment.vue')
  },
  {
    path: '/Booking_confirmation',
    name: 'Booking_confirmation',
    component: ()=> import('@/pages/Booking_confirmation.vue')
  },
  {
    path: '/BookingSuccess',
    name: 'BookingSuccess',
    component: ()=> import('@/pages/BookingSuccess.vue')
  },
  {
    path: '/kiosk',
    name: 'Kiosk',
    component: ()=> import('@/pages/Kiosk.vue')
  },
  {
    path: '/QueueSelection',
    name: 'QueueSelection',
    component: ()=> import('@/pages/QueueSelection.vue')
  },
  {
    path: '/TokenDisplay',
    name: 'TokenDisplay',
    component: ()=> import('@/pages/TokenDisplay.vue')
  },
  // {
  //   path: '/practitioner_screen',
  //   name: 'practitioner_screen',
  //   component: ()=> import('@/pages/practitioner_screen.vue')
  // },
  {
    path: '/bed_management',
    name: 'bed_management',
    component: ()=> import('@/pages/bed_management.vue')
  },
]

let router = createRouter({
  history: createWebHistory('/healthcare'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = session.isLoggedIn
  try {
    await users.promise
  } catch (error) {
    isLoggedIn = false
  }
  if (to.name === 'Home' && isLoggedIn) {
    next({ name: 'Waitlist' })
  } else if (!isLoggedIn) {
    window.location.href = '/login?redirect-to=/healthcare/'
  } else {
    next()
  }
})

export default router
