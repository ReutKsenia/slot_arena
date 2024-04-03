<script setup lang="ts">
import { type ToastType } from '@/types/toast.types';

import { TOAST_TYPE } from '@/constants/toasts';

const emit = defineEmits<{ close: [] }>();

const props = defineProps({
  /*
    Тип уведомления
  */
  type: {
    type: String as PropType<ToastType>,
    default: 'positive',
  },

  /*
    Текст сообщения.
  */
  message: {
    type: String,
    default: '',
  },
});

const toast = computed(() => TOAST_TYPE[props.type]);
const messageVisible = computed(() => (props.message ? '' : 'notification__info-message--hidden'));

const onClose = () => {
  emit('close');
};
</script>

<template>
  <div
    class="notification"
    :class="`notification--${props.type}`"
  >
    <div class="notification__wrapper">
      <SvgIcon
        :name="toast.icon"
        class="notification__icon"
      />
      <div class="notification__info">
        <p class="notification__info-title">{{ toast.title }}</p>
        <p
          class="notification__info-message"
          :class="messageVisible"
        >
          {{ props.message }}
        </p>
      </div>
    </div>
    <CloseButton @click="onClose"></CloseButton>
  </div>
</template>

<style lang="scss" src="./TheToastListItem.scss"></style>
