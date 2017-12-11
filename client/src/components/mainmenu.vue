<template>
<div id = "main-menu">
<nav class="navbar navbar-light">
<ul class="nav nav-tabs nav-fill">
  <li class="nav-item" @click="clicked(0)">
    <router-link to="/games" class="nav-link" v-bind:class="{ 'active' : activeEl == 0}" href="#">Mängud</router-link>
  </li>
  <li class="nav-item" @click="clicked(1)">
    <router-link  class="nav-link" v-bind:class="{ 'active' : activeEl == 1}" to="/destinations">Mängude sihtkohad</router-link>
  </li>
  <li class="nav-item" @click="clicked(2)">
    <router-link to="/users" class="nav-link" v-bind:class="{ 'active' : activeEl == 2}" href="#">Kasutajad</router-link>
  </li>
  <li class="nav-item" @click="clicked(3)">
    <router-link to="/leaderboards/all" class="nav-link" v-bind:class="{ 'active' : activeEl == 3}" href="#">Edetabelid</router-link>
  </li>
</ul>
<ul class="nav nav-pills justify-content-end">
  <li class="nav navbar-nav navbar-right">
    <a class="nav-link" href="#" @click="logout">Logi välja</a>
  </li>  
</ul>
</nav>
</div>
</template>

<script>
export default {
  name: 'mainmenu',  
  data () {
    return {
	  activeEl : 0
    }
  },
  methods : {
    logout : function(event){
      this.$parent.state.loggedIn = false;
      this.api.token = false;
    },
	clicked : function(el) {
	  this.activeEl = el;
	}
  }
}

</script>
<style>
#main-menu{
  margin:10px auto;
  max-width:1000px;
  border-bottom:1px solid #dadada;
}


</style>