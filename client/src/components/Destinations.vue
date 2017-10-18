<template>
    <div class="container" id="games-container">
       <div class="row">
         <div class="col-4 games-list">
            <div class="game-name-wrapper">
                <router-link to="/create-destination" class="btn btn-block btn-success">
                    Uus punkt 
                </router-link>
            </div>   
            <div v-for="destination in destinations" class="game-name-wrapper">
                <router-link :to="'/destinations/'+destination.id" class="btn btn-outline-dark btn-block">
                  {{destination.name}}
                </router-link>
            </div>
         </div>
       <div class="cur-game-info col-8">
           <router-view></router-view>
       </div>

       </div>
    </div>
</template>

<script>
import api from '../util/ajaxAPI.js';
export default {
  name: 'Games',  
  created : function(){
      api.listDestinations()
            .then(function(data){
                this.destinations = data;
            }.bind(this));
  },
  data () {
    return {
      destinations : []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.game-name-wrapper{
    margin-top:10px;
}
.games-list{
    border-right:1px solid #dadada;
}
#games-container{
    max-width:1000px;
}
</style>
