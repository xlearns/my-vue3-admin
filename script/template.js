let {exec,rm,cd,echo,touch,mkdir} = require('shelljs')
let name = process.argv[2] || 'default';
let baseUrl = './src/views'
let vueTemplate = `
<template>
	<div class="${name}">{{msg}}</div>
</template>
<script lang="ts">
import { defineComponent,reactive,toRefs } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name:"bd-${name}",
	setup() {
    let router = useRouter();
    let state = reactive({
      msg:"${name}"
    })
    return {
      ...toRefs(state)
    }
  },
});
</script>
<style scoped>
@import url(./${name}.module.scss);
</style>

`
let scssTemplate = `
  .${name}{
    height:100vh;
    width: 100%;
  }
`


cd(baseUrl)
rm('-rf',name)
mkdir(name)
cd(name)
mkdir('component')
touch(`${name}.vue`);
touch(`${name}.module.scss`);
touch(`${name}.ts`);
echo(vueTemplate).toEnd(`${name}.vue`)
echo(scssTemplate).toEnd(`${name}.module.scss`)
