<template>
	<div class="login">login</div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { store } from "@/store";
import { useRouter } from "vue-router";
import { storageSession } from "@/utils/storages";
import { initBackControlRouters } from "@/router";
export default defineComponent({
	setup() {
		let router = useRouter();
		onMounted(() => {
			if (storageSession.getItem("token")) {
				// return router.push("/");
			} else {
				storageSession.setItem("token", {});
			}
			initBackControlRouters();
		});
	},
});
</script>
<style scoped>
@import url(./login.scss);
</style>
