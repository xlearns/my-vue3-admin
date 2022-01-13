
import {
  defineComponent,
  getCurrentInstance,
  unref,
} from "vue";
import classes from "./button.module.scss";
import propsType from '@/utils/type'
const rootClass = classes['bd-components-button']

const props = {
  type: propsType.string(),
  size: propsType.string(),
  routerTo: propsType.string(),
  href: propsType.string(),
  icon: propsType.string(),
  round: propsType.bool(),
  disabled: propsType.bool(),
  nativeType: propsType.oneOfString(['', 'button', 'submit', 'reset']),
  width: propsType.string(),
  name: propsType.string(), 
  loading: propsType.bool() 
}

export default defineComponent({
  name: "w-ui-button",
  props,
  emits: ['click'],
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const disable = computed(()=>{
      if(props.loading){
        return true
      }else{
        return props.disabled
      }
    })
    const classStyle = computed(()=>{
      let size = props.size 
      return {
        [`btn`]: true,
        'is-round': props.round || groupConfig.round,
        [`btn-` + props.type]: props.type,
        'disabled': disable.value,
        [size]: size
      }
    })
    const handleClick = function(event){
      if (!disable.value) {
        emit('click', event)
      }
    }
    return {
      classStyle,
      handleClick
    }
  },
  render(){
    const { handleClick } = this
    return (
      <div className={rootClass}>
        <button className={classStyle} onClick={handleClick}> 
          <i></i>
         { this.$slots.default?.() }
        </button>
      </div>
    )
  }
});

