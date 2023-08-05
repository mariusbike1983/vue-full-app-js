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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ManageView.vue')
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
