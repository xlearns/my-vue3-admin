<template>
	<div class="login">
		<WUiButton />
		<div class="bg-black w-1/5 h-1/5 mt-10 hover:mt-20">test</div>
		login
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { store } from "@/store";
import { useRouter } from "vue-router";
import { storageSession } from "@/utils/storages";
import { initBackControlRouters } from "@/router";
import WUiButton from "@/components/button"
export default defineComponent({
	components:{
		WUiButton
	},
	setup() {
		let router = useRouter();
		onMounted(() => {
			if (storageSession.getItem("token")) {
				// return router.push("/");
			} else {
				// storageSession.setItem("token", {});
			}
			initBackControlRouters();
		});
	},
});
</script>
<style scoped>
@import url(./login.scss);
</style>
