let {exec,rm,cd,echo,touch,mkdir} = require('shelljs')
let name = process.argv[2] || 'default';
let baseUrl = './src/components'

let indexTemplate = `
import { App } from "vue";
import ${name} from "./src";

export const ${name} = Object.assign(${name}, {
  install(app: App) {
    app.component(${name}.name, ${name});
  }
});
export default ${name};
`

let tsxTemplate = `
import {
  defineComponent,
  getCurrentInstance,
  unref
} from "vue";
import "./${name}.scss";

const rootClass = "bd-components-${name}"; 

const props = {
  
}

export default defineComponent({
  name: "${name}",
  props,
  emits: [],
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    return () => (
      <>
      <div  class={rootClass}></div>
      </>
    );
  }
});
`
let scssTemplate = `
  .bd-components-${name}{
   
  }
`


cd(baseUrl)
rm('-rf',name)
mkdir(name)
cd(name)
mkdir('src')
echo(indexTemplate).toEnd(`index.ts`)
cd('src')
echo(tsxTemplate).toEnd(`${name}.vue`)
echo(scssTemplate).toEnd(`${name}.scss`)
