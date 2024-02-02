<template>
  <h1>어플리케이션 트래픽 그래프</h1>
  <br>

  <iframe :src="kialiUrl" height="900" width="1200"></iframe>
</template>

<script setup>

const kialiUrl = `${import.meta.env.VITE_KIALI_URL}/graph/namespaces?namespaces=travel-agency&kiosk=true`;

</script>
