<script setup>
import { onMounted } from 'vue';
import { logout } from '../helpers/security';
import router from '../router';

onMounted(() => {
    logout();
    setTimeout(() => {
        router.push('/');
    }, 1000);
});
</script>

<template>
<h1>You have been logged-out! Goodbye!</h1>
</template>

<style scoped>

</style>
