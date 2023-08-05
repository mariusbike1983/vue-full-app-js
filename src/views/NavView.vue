<script setup>
import { RouterLink } from 'vue-router';
import { securityStore } from '../helpers/security';

</script>

<template>
    <nav>
      <RouterLink to="/" 
        v-show="securityStore.isUserLoggedIn">Todo List</RouterLink>
      <RouterLink to="/manage"
        v-show="securityStore.isUserAdmin">Manage</RouterLink>
      <RouterLink to="/login"
        v-show="!securityStore.isUserLoggedIn">Login</RouterLink>
      <RouterLink to="/logout"
        v-show="securityStore.isUserLoggedIn">Logout</RouterLink>
    </nav>
</template>

<style scoped>

nav {
    * {
        padding: 3px;
    }
    padding-bottom: 10px;
}

</style>
