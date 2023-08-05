import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { auth } from './helpers/auth';
import { securityStore } from './helpers/security';

auth.initUserWithRoles();
securityStore.init();

const app = createApp(App)

app.use(router)

app.mount('#app')
