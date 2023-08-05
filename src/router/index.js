import { createRouter, createWebHistory } from 'vue-router'
import TodoListView from '../views/TodoListView.vue'
import { securityStore } from '../helpers/security';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todolist',
      component: TodoListView
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
    }
  ]
});

router.beforeEach((to, from) => {
  if (!securityStore.isUserLoggedIn && to.name !== 'login') {
    return { name: 'login' }
  } 
});

export default router
