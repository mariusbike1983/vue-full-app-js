<script setup>
import { RouterLink } from 'vue-router';
import { securityStore } from '../helpers/security';
import UserButton from '../components/UserButton.vue';

</script>

<template>
  <header>
    <nav>
      <div class="container1">
        <RouterLink to="/" 
          v-if="securityStore.isUserLoggedIn">Todo List</RouterLink>
        <RouterLink to="/manage"
          v-if="securityStore.isUserAdmin">Manage</RouterLink>
        <RouterLink to="/grid"
          v-if="securityStore.isUserLoggedIn">Grid</RouterLink>
        <RouterLink to="/login"
          v-if="!securityStore.isUserLoggedIn">Login</RouterLink>
      </div>
      <div class="container2">
        <!-- <RouterLink to="/logout"
          v-if="securityStore.isUserLoggedIn">Logout</RouterLink> -->
        <UserButton v-if="securityStore.isUserLoggedIn"/>
      </div>
    </nav>
  </header>
</template>

<style scoped>

nav {
    padding: 3px;
    display: flex;
    background-color: lightgray;
    border-radius: 5px;;
}

.container1 {
  flex-grow: 2;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
}

.container2 {
  display: flex;
  padding-right: 5px;
}

a {
  text-decoration: unset;
  border: 2px solid transparent;
}

a.router-link-active.router-link-exact-active {
  border-bottom: 4px solid var(--selected-active);
}

a:active{
  border-bottom: 4px solid var(--selected-active);
}

a:hover {
  border-bottom: 2px solid var(--selected);

}

</style>
