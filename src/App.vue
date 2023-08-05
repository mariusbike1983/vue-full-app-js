<script setup>
import NavView from './views/NavView.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <NavView/>
  </header>
  <RouterView />
</template>