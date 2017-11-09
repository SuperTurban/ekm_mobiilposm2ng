<template>
  <div id="app">

    <mainmenu v-if="state.loggedIn"></mainmenu>

    <div v-if="state.loggedIn" class="container">

      <router-view/>

    </div>

    <div class="login" v-else>
      <login></login>
    </div>


  </div>

</template>

<script>

let state = {
  loggedIn : false
}

import mainmenu from './components/mainmenu.vue';
import login from './components/Login.vue';

export default {
  name: 'app',
  data : function(){
    return {
     state 
    }
  },
  components : {
    mainmenu : mainmenu,
    login : login,
  }
}
</script>

<style>


</style>
