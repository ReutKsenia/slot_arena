<script setup lang="ts">
defineProps({
  /** @value */
  modelValue: {
    type: String,
    default: '',
  },
});

defineEmits<{
  'update:modelValue': [value: string];
}>();

const visiblePassword = ref(false);

const passwordType = computed(() => (visiblePassword.value ? 'text' : 'password'));
const passwordIcon = computed(() => (visiblePassword.value ? 'eye' : 'eye-off'));

const onIconClick = () => {
  visiblePassword.value = !visiblePassword.value;
};

const passwordAriaLabel = computed(() =>
  visiblePassword.value ? 'Показать пароль' : 'Скрыть пароль',
);
</script>

<template>
  <BaseField
    :type="passwordType"
    v-bind="$attrs"
    @update:model-value="(value) => $emit('update:modelValue', String(value))"
  >
    <template #append>
      <button
        type="button"
        class="field__icon-body field__icon-body--eye"
        :aria-label="passwordAriaLabel"
        @click="onIconClick"
      >
        <SvgIcon
          :name="passwordIcon"
          class="field__icon"
        />
      </button>
    </template>
  </BaseField>
</template>
