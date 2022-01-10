import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router';
// import {store,key} from './store'
// import { router } from '@/router/auto';
const app = createApp(App)
// setupRouter(app);
app.use(router)
// app.use(store,key)
app.mount("#app")
