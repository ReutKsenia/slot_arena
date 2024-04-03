<script setup lang="ts">
const props = defineProps({
  img: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  gameId: {
    type: String,
    required: true
  },

  loading: {
    type: Boolean,
    default: false
  }
})

const modifiers = computed(() => [
  props.loading ? 'game-card--loading' : '',
]);
</script>

<template>
    <div class="game-card" :class="modifiers" @click.stop="$emit('open-game', gameId)">
      <div class="game-card__image" :style="{ backgroundImage: 'url(' + img + ')' }">
      </div>
      <div class="game-card__game-title">{{ title }}</div>
    </div>
  </template>
  
  
  <style lang="scss" src="./GameCard.scss"></style>
  