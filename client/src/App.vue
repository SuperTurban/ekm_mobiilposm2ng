<template>
  <div id="app">
    <mainmenu></mainmenu>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import mainmenu from './components/mainmenu.vue';
export default {
  name: 'app',
  components : {
    mainmenu : mainmenu
  }
}
</script>

<style>

</style>
