<template>
  <h1>Test :)</h1>
  <br>
<!--  <iframe src="http://localhost:20001/kiali/console/namespaces/travel-agency/services/travels" height="900" width="1200"></iframe>-->
  <iframe :src="kialiUrl" height="900" width="1200"></iframe>
</template>

<script setup>
import { onMounted } from "vue";

const kialiUrl = `${import.meta.env.VITE_KIALI_URL}/namespaces/travel-agency/services/travels`;

onMounted(() => {
  console.log("test>List.vue onMounted()");
});

</script>
