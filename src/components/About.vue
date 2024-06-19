<template>
  <div>
    <Home />
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from './HelloWorld.vue';
import Home from './Home.vue';

export default {
  name: 'AAbout',
  component: {
    HelloWorld,
    Home
  }
}
</script>

<style scoped></style>