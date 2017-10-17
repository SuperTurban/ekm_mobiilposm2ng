<template>
<div id = "main-menu">
<nav class="navbar navbar-light">
<ul class="nav nav-tabs nav-fill">
  <li class="nav-item">
    <router-link to="/games" class="nav-link active" href="#">Mängud</router-link>
  </li>
  <li class="nav-item">
    <router-link  class="nav-link" to="/destinations">Mängude sihtkohad</router-link>
  </li>
  <li class="nav-item">
    <router-link to="/users" class="nav-link" href="#">Kasutajad</router-link>
  </li>
</ul>
<ul class="nav nav-pills justify-content-end">
  <li class="nav navbar-nav navbar-right">
    <a class="nav-link" href="#">Logi välja</a>
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