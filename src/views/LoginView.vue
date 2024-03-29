<script setup>
import { securityStore } from '../helpers/security';
import { useRouter } from 'vue-router';
import { ref, computed, watch } from 'vue';
import { getImageUrl } from '../helpers/helpers.js';

const router = useRouter();
const isError = ref("");
const username = ref("");
const password = ref("");

const showPassword = ref(false);
const passImg = computed(() => getImageUrl(showPassword.value ? "hide.svg" : "show.svg"));
const passFieldType = computed(() => showPassword.value ? "text" : "password");

function toggleShowPassword() {
    showPassword.value = !showPassword.value;
    passwordField.value.focus();
}

function doLogIn() {
    try {
        if (!username.value || !password.value) {
            isError.value="Username or password must be filled in!";
        } else {
            securityStore.logInUser(username.value, password.value);
            router.push("/");
        }
    } catch(err) {
        isError.value = err;
    }
}

const passwordField = ref(null);
const passwordFieldFocus = ref(false);
function focusPassword() {
    passwordFieldFocus.value = true;
}

function blurPassword() {
    passwordFieldFocus.value = false;
}

watch([username, password], () => {
    isError.value = "";
});

</script>

<template>
    <h1>Login</h1>
    <div class="login-page">
            <div class="container">
                <span class="element">Username</span> 
                <input 
                    class="form-element" 
                    v-model="username"
                    @keypress.enter="doLogIn">
                <span class="element">Password</span> 
                <div class="form-element" :class="{active: passwordFieldFocus}">
                    <input id="password" 
                        ref="passwordField"
                        :type="passFieldType" 
                        v-model="password" 
                        @keypress.enter="doLogIn"
                        @focus="focusPassword" 
                        @blur="blurPassword">
                    <span v-show="password"><img :src="passImg" @click="toggleShowPassword"></span>
                </div>
                <div class="error-container"> {{ isError }}</div>
                <div class="buttons-container">
                    <button @click="doLogIn">Log in</button>
                    <button @click="doRegister">Register</button>
                </div>
            </div>
        </div>
</template>

<style scoped>

#password {
    outline: none;
    border: none;
    width: 100%;
}

.form-element {
    display: flex;
    border: 2px solid var(--border-color);
    height: 20px;
}

.form-element.active {
    outline: none;
    border: 2px solid var(--selected);
    border-radius: 3px;
}
.form-element:focus {
    outline: none;
    border: 2px solid var(--selected);
    border-radius: 3px;
}

.container {
    display: grid;
    column-gap: 10px;
    row-gap: 10px;
    grid-template-columns: 70px 200px;
    padding-top: 20px;
    padding-bottom: 20px;
}

.buttons-container {
    display: flex;
    justify-content: center;
    gap: 10px;
    grid-column: span 2;
}

.login-page {
    display: flex;
    justify-content: center;
}

.error-container {
    min-height: 20px;
    padding-bottom: 10px;
    color: salmon;
    font-weight: bolder;
    grid-column: span 2;
}

</style>
