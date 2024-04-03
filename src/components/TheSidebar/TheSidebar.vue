<script setup lang="ts">
import { useAuthStore } from '@/stores/modules/auth';
import { useToastStore } from '@/stores/modules/toasts';

const authStore = useAuthStore();
const router = useRouter();
const { show, hideAll } = useToastStore();

const { information } = useAuthStore();

const pendingLogout = ref(false);

const username = computed(() => information?.login);
const realBalance = computed(() => {
    return information?.balance ? information?.balance[0].attributes.available : 0;
});
const bonusBalance = computed(() => {
    return information?.balance ? information?.balance[1].attributes.available : 0;
});
const freeSpins = computed(() => {
    return information?.balance ? information?.balance[2].attributes.available : 0;
});
const totalBalance = computed(() => realBalance.value + bonusBalance.value + freeSpins.value);

const onLogout = async () => {
  try {
    pendingLogout.value = true;

    await authStore.logout();
    router.push({
      name: 'Authorization',
    });
    hideAll();
  } catch (e: any) {
    console.log(e);
    show('negative', e.message);
  } finally {
    pendingLogout.value = false;
  }
};
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__info-wrapper">
        <div class="sidebar__user-info">
            <div class="sidebar__user-indicator">
                <div class="sidebar__user-indicator-circle"></div>
            </div>
            <div class="sidebar__user-icon-wrapper">
                <div class="sidebar__user-icon-bg">
                    <SvgIcon class="sidebar__user-icon" name="user"></SvgIcon>
                </div>
            </div>
            <div class="sidebar__username">{{ username }}</div>
        </div>
        <div class="sidebar__balance-info">
            <div class="sidebar__balance-item">
                <span class="sidebar__balance-label">Total balance</span>
                <span class="sidebar__balance-value">{{ totalBalance }}</span>
            </div>
            <div class="sidebar__balance-item">
                <span class="sidebar__balance-label">Real balance</span>
                <span class="sidebar__balance-value">{{ realBalance }}</span>
            </div>
            <div class="sidebar__balance-item">
                <span class="sidebar__balance-label">Bonus balance</span>
                <span class="sidebar__balance-value">{{ bonusBalance }}</span>
            </div>
            <div class="sidebar__balance-item">
                <span class="sidebar__balance-label">Free spins</span>
                <span class="sidebar__balance-value">{{ freeSpins }}</span>
            </div>
        </div>
    </div>
    <BaseButton :loading="pendingLogout" @click="onLogout">Logout</BaseButton>
  </div>
</template>
  
  <style lang="scss" src="./TheSidebar.scss"></style>
  