<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useToastStore } from '@/stores/modules/toasts';

const toastStore = useToastStore();
const { toasts, count } = storeToRefs(toastStore);
const { hide } = toastStore;

const className = computed(() => (count ? 'toasts--visible' : ''));

const onClose = (id: number) => {
  hide(id);
};
</script>

<template>
  <transition-group
    tag="div"
    name="list-complete"
    class="toasts"
    :class="className"
  >
    <TheToastListItem
      v-for="toast in toasts"
      :key="toast.id"
      :type="toast.type"
      :message="toast.message"
      class="toasts__item"
      @close="onClose(toast.id)"
    />
  </transition-group>
</template>

<style lang="scss" src="./TheToastList.scss"></style>
