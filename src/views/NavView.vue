<script setup>
import { RouterLink } from 'vue-router';
import { computed } from 'vue';
import { getCurrentUserId, getRoleForUser, isUserAuthenticated } from '../helpers/security';

const userHasPrivilegesForAdmin = computed(() => {
  const userId = getCurrentUserId();
  const role = getRoleForUser(userId);
  return "ADMIN" === role; 
});

const isUserLoggedIn = computed(() => {
  const userId = getCurrentUserId();
  return isUserAuthenticated(userId);
});

</script>

<template>
    <nav>
        <RouterLink to="/" 
          v-show="isUserLoggedIn">Todo List</RouterLink>
        <RouterLink to="/manage"
          v-show="userHasPrivilegesForAdmin">Manage</RouterLink>
        <RouterLink to="/login"
          v-show="!isUserLoggedIn">Login</RouterLink>
        <RouterLink to="/logout"
          v-show="isUserLoggedIn">Logout</RouterLink>
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
