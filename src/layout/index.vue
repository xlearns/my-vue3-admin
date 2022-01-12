<template>
	<div>
		layout
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
import navbar from "./components/navbar.vue";
import Vertical from "./components/sidebar/vertical.vue";
import Horizontal from "./components/sidebar/horizontal.vue";
import appMain from "./components/appMain.vue";
import { deviceDetection } from "@/utils/deviceDetection";

const isMobile = deviceDetection();

export default {
	setup() {
		return {};
	},
};
</script>

<style scoped></style>
