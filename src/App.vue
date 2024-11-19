<template>
  <div id="app">
    <Header :appName="appName" />
    <router-view />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';

const appName = 'Olympic Report Application';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
