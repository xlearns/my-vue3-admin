
import {
  defineComponent,
  getCurrentInstance,
  unref,
} from "vue";
import  "./button.scss";

const rootClass = "bd-components-button"; 

const props = {
  
}

export default defineComponent({
  name: "w-ui-button",
  props,
  emits: [],
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const clickFn = function(){
      alert(1)
    }
    return {
      clickFn
    }
  },
  render(){
    const { clickFn } = this
    return (
      <div class={rootClass}>
        <button onClick={clickFn}>hello</button>
      </div>
    )
  }
});

