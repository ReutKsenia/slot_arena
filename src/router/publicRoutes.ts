import type { RouteRecordRaw } from 'vue-router';

import LoginView from '@/views/LoginView.vue';

const publicRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/login',
    name: 'Authorization',
    component: LoginView,
    meta: {
      layout: 'public',
    },
  },
];

export { publicRoutes };