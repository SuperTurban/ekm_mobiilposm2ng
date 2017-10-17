<template>
    <div class="container" id="games-container">
       <div class="row">
         <div class="col-4 games-list">
            <div class="game-name-wrapper">
                <router-link to="/create-game" class="btn btn-block btn-success">
                    Uus rada
                </router-link>
            </div>   
            <div v-for="game in games" class="game-name-wrapper">
                <router-link :to="'/games/'+game.id" class="btn btn-outline-dark btn-block">
                  {{game.name}}
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
export default {
  name: 'Games',  
  data () {
    return {
      games : [{
          name : "Test 1",
          id : 1,
      },
      {   
          name : "Test 2",
          id : 2,
      },
      {   
          name : "Test 4",
          id : 3,
      },
      {
          name : "Test 3",
          id : 4,
      }
      ]
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
