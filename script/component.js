let {exec,rm,cd,echo,touch,mkdir} = require('shelljs')
let name = process.argv[2] || 'default';
let type = process.argv[3] || 'jsx';
let baseUrl = './src/components'

let indexTemplate = `
import { App } from "vue";
import ${name} from "./src/${name}";

export const ${name}Component = Object.assign(${name}, {
  install(app: App) {
    app.component(${name}.name, ${name});
  }
});
export default ${name}Component;
`
let indexVueTemplate = `
import { App } from "vue";
import ${name} from "./src/${name}.vue";

export const ${name}Component = Object.assign(${name}, {
  install(app: App) {
    app.component(${name}.name, ${name});
  }
});
export default ${name}Component;
`

let vueTemplate = `
<template>
	<div class="bd-components-${name}"></div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, toRefs } from "vue";

const props = {}
export default defineComponent({
  props,
  name: "w-ui-${name}",
	setup() {
		const instance = getCurrentInstance();
		const state = reactive({});
		return {
			...toRefs(state),
		};
	},
});
</script>

<style scoped>
@import url(./${name}.module.scss);
</style>
`
let tsxTemplate = `
import {
  defineComponent,
  getCurrentInstance,
  unref,
  reactive,
  toRefs
} from "vue";

import classes from "./${name}.module.scss";

const rootClass =classes['bd-components-${name}']

const props = {
  
}

export default defineComponent({
  name: "w-ui-${name}",
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
      <div className={rootClass}>${name}</div>
    )
  }
});
`
let scssTemplate = `
  .bd-components-${name}{
    width: 100%;
  }
`


cd(baseUrl)
rm('-rf',name)
mkdir(name)
cd(name)
mkdir('src')
if(type!='vue'){
  echo(indexTemplate).toEnd(`index.ts`)
}else{
  echo(indexVueTemplate).toEnd(`index.ts`)
}

cd('src')
if(type!='vue'){
  echo(tsxTemplate).toEnd(`${name}.${type}`)
}else{
  echo(vueTemplate).toEnd(`${name}.${type}`)
}

echo(scssTemplate).toEnd(`${name}.module.scss`)
