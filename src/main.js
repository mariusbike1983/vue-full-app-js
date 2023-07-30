import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initUserWithRoles } from './helpers/security'

initUserWithRoles();

const app = createApp(App)

app.use(router)

app.mount('#app')
