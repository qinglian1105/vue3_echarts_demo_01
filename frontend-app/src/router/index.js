import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',      
    },
    {
      path: '/login',
      name: 'login',
      meta: {title: 'Login'},
      component: () => import('../views/PageLogin.vue'),
    },
    {
      path: '/home',
      name: 'home', 
      meta: {title: 'Home'},    
      component: () => import('../views/PageHome.vue'),
    },
    {
      path: '/financial_info',
      name: 'financial_info', 
      meta: {title: 'Financial Info'},       
      component: () => import('@/views/PageFinancialInfo.vue'),
    },
    {
      path: '/data_status',
      name: 'data_status',    
      meta: {title: 'Data Status'},    
      component: () => import('../views/PageDataStatus.vue'),
    },
    {
      path: '/auth_user',
      name: 'auth_user', 
      meta: {title: 'Auth User'},       
      component: () => import('../views/PageAuthUser.vue'),
    },
    {
      path: '/page_tst',
      name: 'page_tst',  
      meta: {title: 'Page Test'},      
      component: () => import('../views/PageTestPage.vue'),
    },
    {
      path: '/logout',
      name: 'Logout',
      meta: {title: 'Logout'}, 
      component: () => import('../views/PageLogout.vue'),
    }
  ],
})

export default router
