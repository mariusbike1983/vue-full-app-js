<script setup>
import NavView from './views/NavView.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="wrapper">
      <NavView/>
    </div>
  </header>
  <RouterView />
</template>