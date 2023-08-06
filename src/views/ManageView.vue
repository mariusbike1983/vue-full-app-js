<script setup>
import { ref } from 'vue';
import { auth } from '../helpers/auth';

const listOfUsers = ref(auth.getUsersData());
const newUser = ref(null);

function addUser() {
    newUser.value = {
        fullname: "",
        role: 'STANDARD',
        username: '',
        isNew: true
    };
    listOfUsers.value.push(newUser.value);
}

function changeRole(userData) {
    userData.role = userData.role === "ADMIN" ? "STANDARD" :"ADMIN";
}

function save() {
    newUser.value = null;
    delete listOfUsers.value[listOfUsers.value.length - 1].isNew;
    auth.insertUserData(listOfUsers.value[listOfUsers.value.length - 1]);
}

function discard() {
    listOfUsers.value.splice(listOfUsers.value.length - 1, 1);
    newUser.value = null;
}

</script>

<template>
<h1>Manage users</h1>
<header class="actions">
    <button @click="addUser" :disabled="newUser">Add</button>
</header>
<div class="ul">
    <div class="li" v-for="(userData, index) in listOfUsers" :key="index">
        <div class="user-title">
            <span>Full name:</span> 
            <input v-if="userData.isNew" v-model="userData.fullname">
            <span v-else> {{ userData.fullname }} </span>
        </div>
        <div class="user-manage">
            <span>Is admin</span>
            <input 
                type="checkbox" 
                :checked="userData.role === 'ADMIN'" 
                :disabled="!userData.isNew"
                @change="changeRole(userData)">
            <span>User name:</span>
            <input v-if="userData.isNew" v-model="userData.username">
            <span v-else>{{ userData.username }}</span>
        </div>
        <footer v-if="userData.isNew">
            <button @click="save">Save</button>
            <button @click="discard">Discard</button>
        </footer>
    </div>
</div>
</template>

<style scoped>

header {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
}

footer {
    display: flex;
    justify-content: center;
    padding-top: 10px;
}
.user-manage {
    display: grid;
    column-gap: 10px;
    grid-template-columns: 100px 200px;
    cursor: default;
    border: 2px solid var(--border-color);
}

.user-title {
    background-color: rgb(208, 194, 175);
}

.ul {
    display: flex;
    flex-direction: column;
    gap: 10px;   
    padding-inline-start: 0px;
    max-height: 300px;
    overflow: auto;
}
.li {
    cursor: pointer;
    border: 2px solid var(--border-color);
    border-radius: 5px;
    background-color: gray;
    opacity: 0.8;
}

input[type=checkbox] {
    display: flex;
    justify-self: flex-start;
}
</style>
