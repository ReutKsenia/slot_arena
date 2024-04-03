import { createRouter, createWebHistory } from 'vue-router';

import { protectedRoutes } from '@/router/protectedRoutes';
import { publicRoutes } from '@/router/publicRoutes';

import { useAuthStore } from '@/stores/modules/auth';

const routes = [...publicRoutes, ...protectedRoutes];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const { isAuthorized } = useAuthStore();
  const isProtectedLayout = to.meta.layout === 'protected';

  if (isProtectedLayout && !isAuthorized) {
    next({
      name: 'Authorization',
      replace: true,
    });
    return;
  }

  next();
});

export { router };