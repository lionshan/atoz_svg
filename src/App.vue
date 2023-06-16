<template>
  <div id="app">
    <Atoz />
  </div>
</template>

<script>
import Atoz from "./components/Atoz.vue";
export default {
  name: "App",
  components: {
    Atoz,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
