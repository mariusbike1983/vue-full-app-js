<script setup>
import { onMounted } from 'vue';
import { securityStore } from '../helpers/security';
import router from '../router';

onMounted(() => {
    securityStore.logOut();
    setTimeout(() => {
        router.push('/login');
    }, 1000);
});
</script>

<template>
<h1>You have been logged-out! Goodbye!</h1>
</template>

<style scoped>

</style>
