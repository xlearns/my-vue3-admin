
import { App } from "vue";
import fullScreen from "./src/fullScreen";

export const fullScreenComponent = Object.assign(fullScreen, {
  install(app: App) {
    app.component(fullScreen.name, fullScreen);
  }
});
export default fullScreenComponent;

