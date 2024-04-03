<script setup lang="ts">
import { useAuthStore } from '@/stores/modules/auth';
import { useToastStore } from '@/stores/modules/toasts';

import type { AuthorizationDtoType } from '@/types/api/auth.types';

import { MASK_LOGIN, MASK_PASSWORD } from '@/constants/masks';

const authStore = useAuthStore();
const router = useRouter();
const { show, hide, hideAll } = useToastStore();

const login = ref('');
const password = ref('');
const pendingSubmit = ref(false);
const warningToast = ref<number>();
const formError = ref(false);

const disabledButtonSubmit = computed(() => pendingSubmit.value || !login.value || !password.value);

const setFormError = (value: boolean) => {
  formError.value = value;
};

const clearError = () => {
  if (formError.value) {
    setFormError(false);
  }
};

const onFieldInput = (newValue: string, oldValue: string) => {
  if (warningToast.value) {
    hide(warningToast.value);
    warningToast.value = 0;
  }
  if (newValue === '' || newValue === oldValue) return;
  clearError();
};

watch(login, onFieldInput);

watch(password, onFieldInput);

const onSubmit = async (event: Event) => {
  try {
    pendingSubmit.value = true;

    const target = event.target as HTMLFormElement;
    const requestBody = Object.fromEntries(new FormData(target as HTMLFormElement)) as AuthorizationDtoType;
    await authStore.authorization(requestBody);
    router.push({
      name: 'Main',
    });
    hideAll();
  } catch (e: any) {
    show('negative', e.message);
  } finally {
    pendingSubmit.value = false;
  }
};
</script>

<template>
  <form
    class="login-form"
    @submit.prevent="onSubmit"
  >
    <h2 class="login-form__title">Sign in</h2>
    <div class="login-form__body">
      <BaseField
        v-model="login"
        label="Username"
        name="login"
        placeholder="Jon Doe"
        :mask="MASK_LOGIN"
        error-message="Login can only contain characters [A-Za-z0-9_-]"
        class="login-form__field"
      />
      <PasswordField
        v-model="password"
        label="Password"
        name="password"
        placeholder="Your password"
        :mask="MASK_PASSWORD"
        error-message="Password can only contain characters [A-Za-z0-9!@#$%^&*_]"
        class="login-form__field"
      />
    </div>
    <div class="login-form__footer">
      <BaseButton
        type="submit"
        class="login-form__button"
        :loading="pendingSubmit"
        :disabled="disabledButtonSubmit"
      >
        Login
      </BaseButton>
    </div>
  </form>
</template>

<style lang="scss" src="./TheLoginForm.scss"></style>
