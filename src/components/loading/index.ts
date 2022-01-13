
import { App } from "vue";
import loading from "./src/loading";

export const loadingComponent = Object.assign(loading, {
  install(app: App) {
    app.component(loading.name, loading);
  }
});
export default loadingComponent;

