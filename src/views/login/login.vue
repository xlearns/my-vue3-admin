<template>
	<div class="login">login</div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { initBackControlRouters } from "@/router/auto";
import { Session } from "@/utils/storage";
export default defineComponent({
	setup() {
		onMounted(() => {
			Session.set("token", {});
			initBackControlRouters();
		});
	},
});
</script>
<style scoped>
@import url(./login.scss);
</style>
