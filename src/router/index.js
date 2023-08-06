import { createRouter, createWebHistory } from 'vue-router'
import { securityStore } from '../helpers/security';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todolist',
      component: () => import('../views/TodoListView.vue')
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('../views/ManageView.vue')
    },
    {
      path: '/grid',
      name: 'grid',
      component: () => import('../views/GridView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LogoutView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/MyProfileView.vue')
    }
  ]
});

router.beforeEach((to, from) => {
  if (!securityStore.isUserLoggedIn && to.name !== 'login') {
    return { name: 'login' }
  } 
});

export default router
