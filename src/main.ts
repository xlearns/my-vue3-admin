import { createApp } from 'vue'
import App from './App.vue'
// import { router, setupRouter } from '@/router';

import { router } from '@/router/auto';
const app = createApp(App)
// setupRouter(app);
app.use(router)

app.mount("#app")
