<script setup>
import { ref, onMounted, nextTick } from 'vue';
import router from '../router';
import { securityStore } from '../helpers/security';
import ModalDialog from './ModalDialog.vue';

const fullname = ref("");
const userdetails = ref("");
const dropdownVisible = ref(false);
const dropdown = ref(null);
const modalDialog = ref(null);

function toggle(evt) {
    if (evt.target && 
        (evt.target.parentElement === dropdown.value || evt.target === dropdown.value)) {
        return;
    }
    dropdownVisible.value = !dropdownVisible.value;
}

async function logout() {
    dropdownVisible.value = false;
    await nextTick(() => {
        modalDialog.value.show("Confirm", 'You are about to log-out. Continue?', "QUESTION", async ev => {
            if (!ev.currentTarget.returnValue || ev.currentTarget.returnValue === "DISMISS") {
                return;
            }
            router.push('/logout');
        });
    });
}

async function myprofile() {
    dropdownVisible.value = false;
    await nextTick(() => {
        router.push('/profile');
    });
}

onMounted(() => {
    const obj = securityStore.getCurrentLoggedInUserDetails();
    fullname.value = obj.fullName;
    userdetails.value = obj.userDetails;
});
</script>

<template>
    <div class="user-menu-button" @click.stop.prevent="toggle($event)">
        <div class="title">{{ fullname }}</div>
        <div class="details"> {{ userdetails }}</div>
        <div v-show="dropdownVisible" 
            ref="dropdown" 
            class="dropdown">
            <div class="elem" @click="myprofile">My profile</div>
            <div class="elem">Change password</div>
            <div class="elem" @click="logout">Logout</div>
        </div>
        <ModalDialog ref="modalDialog"/>
    </div>
</template>

<style scoped>
    .user-menu-button {
        cursor: pointer;
        position: relative;
        padding-right: 5px;
    }

    .title {
        pointer-events: none;
        user-select: none;
    }
    .details {
        pointer-events: none;
        user-select: none;
        font-size: 11px;
        display: flex;
        justify-content: flex-end;
    }
    
    .dropdown {
        top: 45px;
        right: -8px;
        width: 150px;
        position: absolute;
        display: flex;
        padding-right: 5px;
        flex-direction: column;
        gap: 5px;
        background-color: var(--background-color);
    }
    .elem {        
        display: flex;
        justify-content: end;
        border-bottom: 2px solid transparent;
    }

    .elem:hover {
        border-bottom: 2px solid var(--selected);
    }
</style>