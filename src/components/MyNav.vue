<script setup>
// import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();
// const { user } = storeToRefs(authStore);
</script>

<template>
  <nav v-show="authStore.user" class="navbar navbar-expand navbar-dark bg-dark">
    <div class="navbar-nav">
      <router-link to="/" class="nav-item nav-link">홈</router-link>
      <router-link to="/monitoring" class="nav-item nav-link">모니터링</router-link>
      <router-link to="/canary" class="nav-item nav-link">카나리 배포</router-link>
      <router-link to="/help" class="nav-item nav-link">도움말</router-link>
      <router-link to="/test" class="nav-item nav-link">Test</router-link>
    </div>
  </nav>
</template>
