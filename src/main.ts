import { createApp,Directive } from 'vue'
import App from './App.vue'
import { router } from '@/router';
import { setupStore } from "@/store";
import '@/utils/tailwind/index.css'

const app = createApp(App)


import * as directives from "@/directives";

Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string]: Directive })[key]);
});

setupStore(app);

app.use(router)

app.mount("#app")
