import Vue from 'vue'
import Main from '../Main.vue'

import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import From from '../views/From.vue'
import Movie from '../views/Movie.vue'
import Router from '../views/Router.vue'
import Profile from '../views/Profile.vue'
import MovieDetail from '../views/MovieDetail.vue'
import Exercise from '../views/Exercise.vue'
import Exercise2 from '../views/Exercise2.vue'
import Exercise3 from '../views/Exercise3.vue'
import Exercise32 from '../views/Exercise32.vue'
import Exercise4 from '../views/Exercise4.vue'
import API from '../views/API.vue'
import Filter from '../views/Filter.vue'
import Ex5 from '../views/Ex5.vue'
import Ex6 from '../views/Ex6.vue'
import Checkout from '../views/Checkout.vue'
import Ex7 from '../views/Ex7.vue'
import Testlumen from '../views/Testlumen.vue'
import Facebook from '../views/Facebook.vue'
import My from '../views/beneat/my.vue'
import Leave from '../views/beneat/Leave.vue'
import Login from '../views/beneat/Login.vue'
import Register from '../views/beneat/Register.vue'
import Employee from '../views/beneat/Employee.vue'
import Homeadmin from '../views/beneat/Homeadmin.vue'
import Deparment from '../views/beneat/Deparment.vue'
import WorkFromHome from '../views/beneat/WorkFromHome.vue'
import Time from '../views/beneat/Time.vue'
import LeaveHistory from '../views/beneat/Leavehistory.vue'
import ManageHoliday from '../views/beneat/Manageholiday.vue'
import Report from '../views/beneat/Report.vue'
// import Test from '../views/test.vue'

import store from '../store/index'
Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'test',
  //   component: Test
  // },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/movie',
    name: 'Movie',
    component: Movie
  },
  {
    path: '/router',
    name: 'router',
    component: Router,
    children: [
      {
        path: 'profile',
        component: Profile
      },
      {
        path: 'movie',
        component: Movie
      },
      {
        path: 'from',
        component: From
      },
      {
        path: 'exercise4',
        component: Exercise4
      }
    ]
  },
  {
    path: '/from',
    name: 'From',
    component: From
  },
  {
    path: '/exercise',
    name: 'exercise',
    component: Exercise
  },
  {
    path: '/exercise2',
    name: 'exercise2',
    component: Exercise2
  },
  {
    path: '/exercise3',
    name: 'exercise3',
    component: Exercise3
  },
  {
    path: '/exercise32',
    name: '/exercise32',
    component: Exercise32
  },
  {
    path: '/movie/:id',
    name: '/movie detail',
    component: MovieDetail
  },
  {
    path: '/exercise4',
    name: 'exercise4',
    component: Exercise4
  },
  {
    path: '/api',
    name: 'api',
    component: API
  },
  {
    path: '/filter',
    name: 'filter',
    component: Filter
  },
  {
    path: '/ex5',
    name: 'ex5',
    component: Ex5
  },
  {
    path: '/ex6',
    name: 'ex6',
    component: Ex6
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout,
    children: [
      {
        path: 'ex6',
        component: Ex6
      }
    ]
  },
  {
    path: '/ex7',
    name: 'ex7',
    component: Ex7
  },
  {
    path: '/testlumen',
    name: 'testlumen',
    component: Testlumen
  },
  {
    path: '/facebook',
    name: 'facebook',
    component: Facebook
  },
  {
    path: '/homeadmin',
    name: 'homeadmin',
    component: Main,
    meta: {
      required: true
    },
    children: [
      {
        path: '',
        component: Homeadmin,
        meta: {
          required: true
        }
      },
      {
        path: 'manageholiday',
        component: ManageHoliday,
        meta: {
          required: true
        }
      },
      {
        path: 'leave',
        component: Leave,
        meta: {
          required: true
        }
      },
      {
        path: 'leave/leavehistory',
        component: LeaveHistory,
        meta: {
          required: true
        }
      },
      {
        path: 'employee',
        component: Employee,
        meta: {
          required: true
        }
      },
      {
        path: 'deparment',
        component: Deparment,
        meta: {
          required: true
        }
      },
      {
        path: 'workfromhome',
        component: WorkFromHome,
        meta: {
          required: true
        }
      },
      {
        path: 'time',
        component: Time,
        meta: {
          required: true
        }
      },
      {
        path: 'report',
        component: Report,
        meta: {
          required: true
        }
      }
    ]
  },
  {
    path: '/my',
    name: 'my',
    component: Main,
    children: [
      {
        path: '/',
        component: My
      }
    ]
  },
  {
    path: '/leave',
    name: 'leave',
    component: Main,
    meta: {
      required: true
    },
    children: [
      {
        path: '/',
        component: Leave
      }
    ]
  },
  {
    path: '/employee',
    name: 'employee',
    component: Main,
    children: [
      {
        path: '/',
        component: Employee
      }
    ]
  },
  {
    path: '/workfromhome',
    name: 'workfromhome',
    component: Main,
    children: [
      {
        path: '/',
        component: WorkFromHome
      }
    ]
  },
  {
    path: '/time',
    name: 'time',
    component: Main,
    children: [
      {
        path: '/',
        component: Time
      }
    ]
  },
  {
    path: '/leavehistory',
    name: 'leavehistory',
    component: Main,
    children: [
      {
        path: '/',
        component: LeaveHistory
      }
    ]
  },
  {
    path: '/manageholiday',
    name: 'manageholiday',
    component: Main,
    children: [
      {
        path: '/',
        component: ManageHoliday
      }
    ]
  },
  {
    path: '/report',
    name: 'report',
    component: Main,
    children: [
      {
        path: '/',
        component: Report
      }
    ]
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // console.log('อีเมล', store.state.user.dataUser.email)
  if (to.meta.required && !store.state.user.dataUser.email) {
    next({ path: '/login' })
  }
  next()
})

export default router
