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
  name: "w-ui-${name}",
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
echo(tsxTemplate).toEnd(`${name}.${type}`)
echo(scssTemplate).toEnd(`${name}.scss`)
