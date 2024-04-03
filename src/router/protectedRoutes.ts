import type { RouteRecordRaw } from 'vue-router';

import MainView from '@/views/MainView.vue';

const protectedRoutes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: 'Main',
    component: MainView,
    meta: {
        layout: 'protected',
        name: 'main',
    },
  },
];

export { protectedRoutes };