<script setup>
import { logInUser } from '../helpers/security';
import { useRouter } from 'vue-router';

const router = useRouter();
const dummyUserId = 1;

function doLogIn() {
    try {
        logInUser(dummyUserId);
        router.push("/");
    } catch(err) {
        alert(err);
    }
}

</script>

<template>
    <div>
        <h1>Login page</h1>
        <button @click="doLogIn">Dummy authenticate</button>
    </div>
</template>

<style scoped>

</style>
