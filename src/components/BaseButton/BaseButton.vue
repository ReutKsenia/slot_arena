<script setup lang="ts">
import type { ButtonTheme, ButtonType } from '@/types/button.types';

const props = defineProps({
  /*
    Свойство, отвечающее за атрибут type.
  */
  type: {
    type: String as PropType<ButtonType>,
    default: 'button',
  },

  /*
    Свойство, отвечающее за цветовую схему кнопки.
    - `main` — темная кнопка с белым текстом;
  */
  theme: {
    type: String as PropType<ButtonTheme>,
    default: 'main',
  },

  /*
    Свойство, отвечающее за атрибут disabled.
  */
  disabled: {
    type: Boolean,
    default: false,
  },

  /*
    Если свойство задано — отображается загрузка а все остальные элементы кнопки скрываются.
  */
  loading: {
    type: Boolean,
    default: false,
  },

  /*
    Если свойство задано — кнопка получает стиль активного состояния.
  */
  active: {
    type: Boolean,
    default: false,
  },
});

const modifiers = computed(() => [
  `button--${props.theme}`,
  props.loading ? 'button--loading' : '',
  props.active ? 'button--active' : '',
]);
</script>

<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    :aria-busy="props.loading"
    class="button"
    :class="modifiers"
  >
    <slot />
  </button>
</template>

<style lang="scss" src="./BaseButton.scss"></style>
