<template>
	<div class="home">home</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
	setup() {
		const router = useRouter();
		setTimeout(() => {
			router.push("/test");
		}, 3000);
	},
});
</script>
<style scoped>
@import url(./home.scss);
</style>
