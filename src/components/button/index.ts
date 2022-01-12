
import { App } from "vue";
import button from "./src/button";

export const buttonComponent = Object.assign(button, {
  install(app: App) {
    app.component(button.name, button);
  }
});
export default buttonComponent;

