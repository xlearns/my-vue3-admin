
import {
  defineComponent,
  getCurrentInstance,
  unref,
  reactive,
  toRefs
} from "vue";

import classes from "./fullScreen.module.scss";

const rootClass =classes['bd-components-fullScreen']

const props = {
  width: {
    type: String,
    default: 1920,
  },
  height: {
    type: String,
    default: 969,
  },
}

export default defineComponent({
  name: "w-ui-fullScreen",
  props,
  emits: [],
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const state = reactive({
			style: {
				width: props.width + "px",
				height: props.height + "px",
				transform: "scale(1) translate(-50%, -50%)",
			}
		})
		
		const methods = {
			getScale() {
				const w = window.innerWidth / props.width;
				const h = window.innerHeight / props.height;
				return w < h ? w : h;
			},
			setScale() {
				state.style.transform =
					"scale(" + methods.getScale() + ") translate(-50%, -50%)";
			},
			Debounce: (fn, t) => {
				const delay = t || 500;
				let timer;
				return function () {
					const args = arguments;
					if (timer) {
						clearTimeout(timer);
					}
					const context = this;
					timer = setTimeout(() => {
						timer = null;
						fn.apply(context, args);
					}, delay);
				};
			}
		}

		window.onresize = methods.Debounce(methods.setScale, 100);
		onMounted(()=>{
			methods.setScale();
		})
		return {
			...toRefs(state),
			...methods
		}
  },
  render(){
    const {fn} = this;
    return (
      <div className={rootClass}>
       { this.$slots.default?.() }
      </div>
    )
  }
});

