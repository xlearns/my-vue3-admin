<template>
	<div class="go">{{ msg }}</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
	name: "bd-go",
	setup() {
		let state = reactive({
			msg: "go",
		});
		return {
			...toRefs(state),
		};
	},
});
</script>
<style scoped>
@import url(./go.scss);
</style>
