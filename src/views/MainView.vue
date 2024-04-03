<script setup lang="ts">
import { useToastStore } from '@/stores/modules/toasts';
import type { GameEntity } from '@/types/api/games.types';

const { show } = useToastStore();

const isPreparingPage = ref(false);
const loadingCardId = ref();
const gamesList = ref<GameEntity[]>([]);
const displayedItems = ref<GameEntity[]>([]);
const pageSize = ref<number>(20);
const pageIndex = ref<number>(0);

const openGame = async (id: string) => {
      try {
        loadingCardId.value = id;
        const response = await fetchGameLink(id);
        const gameUrl = response.attributes['launch-options']['game-url'];
        window.open(gameUrl, '_blank');
      } catch (e: any) {
        show('negative', e);
      } finally {
        loadingCardId.value = null;
      }
    }

const loadMore = () => {
    const nextItems = gamesList.value.slice(pageIndex.value * pageSize.value, (pageIndex.value + 1) * pageSize.value);
    displayedItems.value = [...displayedItems.value, ...nextItems];
    pageIndex.value++;
}

const preparePage = async () => {
  try {
    isPreparingPage.value = true;
    gamesList.value = await fetchGames();
    displayedItems.value = gamesList.value.slice(0, pageSize.value);
    pageIndex.value = 1;
  } catch (e: any) {
    show('negative', e);
  } finally {
    isPreparingPage.value = false;
  }
};

onMounted(() => {
  preparePage();
});
</script>

<template>
  <ProtectedLayout>
    <div v-if="displayedItems.length">
      <div class="game-list">
        <GameCard
          v-for="game in displayedItems"
          :key="game.id"
          :gameId="game.id"
          :img="game.attributes.image"
          :title="game.attributes.title"
          :loading="loadingCardId === game.id"
          @open-game="openGame"
        />
      </div>
      <div class="load-more-btn-wrapper">
        <BaseButton class="load-more-btn" @click="loadMore">Load more</BaseButton>
      </div>
    </div>
    <div v-else class="list-loader">
      <BaseLoader></BaseLoader>
    </div>
  </ProtectedLayout>
</template>
