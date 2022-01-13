
import {
  defineComponent,
  getCurrentInstance,
  unref,
  reactive,
  toRefs
} from "vue";

import classes from "./borderBox.module.scss";

const rootClass =classes['bd-components-borderBox']

const props = {
  
}

export default defineComponent({
  name: "w-ui-borderBox",
  props,
  emits: [],
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    let state = reactive({})
    const fn = function(){}
    return {
      fn,
      ...toRefs(state)
    }
  },
  render(){
    const {fn} = this;
    return (
      <div className={rootClass}>borderBox</div>
    )
  }
});

