<template>
	<div class="home">
		home
		<router-view />
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
	setup() {
		const router = useRouter();
	},
});
</script>
<style scoped>
@import url(./home.scss);
</style>
