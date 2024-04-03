<script setup lang="ts">
import { useAuthStore } from '@/stores/modules/auth';

const authStore = useAuthStore();
const router = useRouter();
/**
 * Проверяет наличие данных пользовательской сессии
 * и переводит на страницу авторизации, если их нет.
 */
const changeRouteOnLogout = () => {
  if (authStore?.token === null && router) {
    router.push({
      name: 'Authorization',
    });
  }
};
watchEffect(changeRouteOnLogout);
</script>

<template>
  <div class="protected">
    <TheSidebar></TheSidebar>
    <main class="protected__main main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" src="./ProtectedLayout.scss" />