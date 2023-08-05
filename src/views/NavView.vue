<script setup>
import { RouterLink } from 'vue-router';
import { securityStore } from '../helpers/security';

</script>

<template>
  <header>
    <nav>
      <div class="container1">
        <RouterLink to="/" 
          v-if="securityStore.isUserLoggedIn">Todo List</RouterLink>
        <RouterLink to="/manage"
          v-if="securityStore.isUserAdmin">Manage</RouterLink>
        <RouterLink to="/login"
          v-if="!securityStore.isUserLoggedIn">Login</RouterLink>
      </div>
      <div class="container2">
        <RouterLink to="/logout"
          v-if="securityStore.isUserLoggedIn">Logout</RouterLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>

nav {
    * {
        padding: 3px;
    }
    display: flex;
    background-color: lightgray;
}

.container1 {
  flex-grow: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container2 {
}

</style>
