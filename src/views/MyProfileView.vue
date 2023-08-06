<script setup>
import {ref} from 'vue';
import { securityStore } from '../helpers/security';
import router from '../router';
import ModalDialog from '../components/ModalDialog.vue';

const fullName = ref(securityStore.getCurrentLoggedInUserDetails().fullName);
const modalDialog = ref(null);

function save() {
    modalDialog.value.show("Confirm", 'This action will need a new login. Continue?', "QUESTION", async ev => {
        if (!ev.currentTarget.returnValue || ev.currentTarget.returnValue === "DISMISS") {
        return;
        }
        securityStore.setCurrentLoggedInUserDetails({
            fullName: fullName.value,
            isAdmin: isAdmin.value
        });
        router.push('/logout');
    });
}

</script>

<template>
    <h1>My Profile</h1>
    <div class="profile">
        <div class="container">
            <span>Username</span>
            <input disabled value="username">
            <span>Full name</span>
            <input v-model="fullName">
            <span>Is admin</span>
            <input type="checkbox" v-model="isAdmin" disabled>
            <div class="buttons-container">
                <button @click="save">Save</button>
            </div>

        </div>
    </div>
    <ModalDialog ref="modalDialog"/>
</template>

<style scoped>

.profile {
    display: flex;
    align-items: center;
    justify-content: center;
}

input[type=checkbox] {
    display: flex;
    justify-self: flex-start;
}

.container {
    display: grid;
    column-gap: 10px;
    row-gap: 10px;
    grid-template-columns: 70px 200px;    
}

.buttons-container {
    grid-column: span 2;
    display: flex;
    justify-content: center;
}
</style>