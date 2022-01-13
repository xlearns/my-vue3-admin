
import { App } from "vue";
import borderBox from "./src/borderBox";

export const borderBoxComponent = Object.assign(borderBox, {
  install(app: App) {
    app.component(borderBox.name, borderBox);
  }
});
export default borderBoxComponent;

