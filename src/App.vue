<script setup lang="ts">
import ProtectedLayout from '@/layouts/ProtectedLayout/ProtectedLayout.vue';
import PublicLayout from '@/layouts/PublicLayout/PublicLayout.vue';

const route = useRoute();

const layout = computed(() => {
  if (route.meta.layout === 'protected') return ProtectedLayout;

  return PublicLayout;
});
</script>

<template>
  <component :is="layout">
    <RouterView v-slot="{ Component }">
      <Transition
        name="fade"
        mode="out-in"
        appear
      >
        <component :is="Component" />
      </Transition>
    </RouterView>
  </component>
  <TheToastList />
</template>
