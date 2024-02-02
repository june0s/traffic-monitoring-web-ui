<template>
  <h1>
    참고 사이트
  </h1>
  <ul>
    <li><a href="https://istio.io/">Istio - Service mesh platform that manages communication between microservices</a></li>
    <li><a href="https://kiali.io/">Kiali - The Console for Istio Service Mesh</a></li>
  </ul>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log("help>List.vue onMounted()");
});

</script>
