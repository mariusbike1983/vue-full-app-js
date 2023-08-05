import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { auth as authorizationStore} from './helpers/auth';
import { securityStore } from './helpers/security';

authorizationStore.initUserWithRoles();
securityStore.init();

const app = createApp(App)

app.use(router)

app.mount('#app')
