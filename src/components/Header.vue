<template>
  <header class="app-header" @click="toHome">
    <img src="@/assets/olympic_logo.png" alt="Olympic Logo" />
    <h1>{{ appName }}</h1>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
defineProps({
  appName: String,
});
const router = useRouter();
const toHome = () => router.push("/");
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #8dd5f6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-header img {
  width: 132px;
  height: 64px;
  margin-right: 1rem;
}

.app-header h1 {
  font-size: 1.5rem;
  margin: 0;
}
</style>
