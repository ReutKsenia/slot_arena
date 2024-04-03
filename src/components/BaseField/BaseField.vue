<script setup lang="ts">
import { useIMask } from 'vue-imask';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },

  label: {
    type: String,
    default: '',
  },

  name: {
    type: String,
    default: '',
  },

  errorMessage: {
    type: String,
    default: '',
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  inputmode: {
    type: String as PropType<
      'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'
    >,
    default: 'text',
  },

  type: {
    type: String,
    default: 'text',
  },

  placeholder: {
    type: String,
    default: undefined,
  },

  mask: {
    type: [Object, null] as PropType<RegExp>,
    default: () => /.*/s,
  },
});
const emit = defineEmits<{
  'update:modelValue': [value: string | number];
}>();
const error = ref(false);
const { el, masked } = useIMask(
  { mask: props.mask },
  {
    onComplete() {
      emit('update:modelValue', masked.value);
    },
});

const onInput = (event: Event) => {
  const { value } = event.target as HTMLInputElement;
  if (props.mask && !props.mask.test(value)) {
    error.value = true;
  } else if (props.mask && props.mask.test(value)) {
    error.value = false;
  }
}

const slots = useSlots();
const hasAppendSlots = computed(() => !!slots.append);
const classNames = computed(() => {
  return {
    'field--error': error.value,
    'field--disabled': props.disabled,
    'field--append': hasAppendSlots.value,
  };
});
</script>

<template>
  <div class="field-wrapper">
    <div
      class="field"
      :class="classNames"
    >
      <label
        v-if="label"
        :for="name"
        class="field__label"
      >
        {{ label }}
      </label>
      <span class="field__input-body">
        <input
          :id="name"
          ref="el"
          :name="name"
          :inputmode="inputmode"
          :disabled="disabled"
          :placeholder="placeholder"
          :type="type"
          class="field__input"
          @input="onInput"
        />
        <span
          v-if="hasAppendSlots"
          class="field__icons-list field__icons-list--append"
        >
          <slot name="append" />
        </span>
      </span>
      <span
        v-if="error && errorMessage"
        class="field__error-message"
      >
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" src="./BaseField.scss"></style>