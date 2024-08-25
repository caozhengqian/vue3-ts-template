import { createRouter, createWebHistory } from 'vue-router'
import _ from 'lodash'
const Login = () => import('@/views/Login/Login.vue')
const Home = () => import('@/views/Home/Home.vue')
const Sign = () => import('@/views/Sign/Sign.vue')
const Exception = () => import('@/views/Exception/Exception.vue')
const Apply = () => import('@/views/Apply/Apply.vue')
const Check = () => import('@/views/Check/Check.vue')
const NotAuth = () => import('@/views/NotAuth/NotAuth.vue');
const NotFound = () => import('@/views/NotFound/NotFound.vue');
const NotServer = () => import('@/views/NotServer/NotServer.vue');
import {useUserStore} from '@/stores/user'
declare module 'vue-router' {
  interface RouteMeta {
    menu?: boolean // 左侧菜单是否展示
    title?: string
    icon?: string
    auth?: boolean // 是否需要权限
  }
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/sign',
      meta: {
        menu: true,
        title: '考勤管理',
        icon: 'document-copy',
        auth: true
      },
      children: [
        {
          path: 'sign',
          name: 'sign',
          component: Sign,
          meta: {
            menu: true,
            title: '在线打卡签到',
            icon: 'calendar',
            auth: true
          }
        },
        {
          path: 'exception',
          name: 'exception',
          component: Exception,
          meta: {
            menu: true,
            title: '异常考勤查询',
            icon: 'warning',
            auth: true
          }
        },
        {
          path: 'apply',
          name: 'apply',
          component: Apply,
          meta: {
            menu: true,
            title: '添加考勤审批',
            icon: 'document-add',
            auth: true
          }
        },
        {
          path: 'check',
          name: 'check',
          component: Check,
          meta: {
            menu: true,
            title: '我的考勤审批',
            icon: 'finished',
            auth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Login
    },
      {
          path: '/403',
          name: 'notAuth',
          component: NotAuth
      },
      {
          path: '/404',
          name: 'notFound',
          component: NotFound
      },
      {
          path: '/500',
          name: 'notServer',
          component: NotServer
      },
      {
          path: '/:pathMatch(.*)*',
          redirect: '/404'
      }
  ]
})

router.beforeEach((to,from,next)=>{
    const userStore = useUserStore()
    const token = userStore.token
    const infos = userStore.infos
    if(to.meta.auth && _.isEmpty(infos)){
        if(token){
            userStore.infos().then(res=>{
                if(res.data.errcode === 0 ){
                    userStore.updateInfos(res.data.infos)
                    next()
                }
            })
        }else{
            next('/login')
        }
    }else{
        if(token && to.path === '/login'){
            next('/')
        }else{
            next()
        }
    }

})

export default router
