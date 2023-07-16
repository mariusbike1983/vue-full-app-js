<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Todo List</RouterLink>
        <RouterLink to="/manage">Manage</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  * {
    padding: 3px;
  }
  padding-bottom: 10px;
}
</style>
