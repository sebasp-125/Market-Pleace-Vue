<template>
  <div id="app">
    <HeaderPageVue/>
    <router-view></router-view>
    <PiePageVue/>
x  </div>
</template>

<script>
import PiePageVue from '../src/modules/PiePage.vue'
import HeaderPageVue from './modules/HeaderPage.vue'

export default {
  name: 'App',
  components: {
    PiePageVue,
    HeaderPageVue
  }
}
</script>

<style></style>
