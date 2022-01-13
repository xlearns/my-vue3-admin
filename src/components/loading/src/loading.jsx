
import {
  defineComponent,
  getCurrentInstance,
  unref,
  reactive,
  toRefs
} from "vue";

import classes from "./loading.module.scss";

const rootClass =classes['bd-components-loading']

const props = {
  
}

export default defineComponent({
  name: "w-ui-loading",
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
      <div className={rootClass}>loading</div>
    )
  }
});

