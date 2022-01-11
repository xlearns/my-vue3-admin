<template>
	<div class="home">
		home
		<button @click="change">change</button>
		<p v-auth="'v-admin'">只有admin可看</p>
		<p v-auth="'v-test'">只有test可看</p>
		<router-view />
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import { userApi } from "@/api/user";
export default defineComponent({
	setup() {
		const router = useRouter();
		const change = function () {
			window.location.reload();
		};
		const init = async function () {
			let param = {
				admin_name: "admin",
				admin_password: "admin",
			};
			let res = await userApi(param);
			console.log("res", res);
		};
		onMounted(() => {
			init();
		});
		return {
			change,
		};
	},
});
</script>
<style scoped>
@import url(./home.scss);
</style>
