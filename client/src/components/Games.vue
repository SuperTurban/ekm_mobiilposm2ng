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
                <router-link :to="'/games/'+game.id" class="btn btn-outline-dark btn gamelink">
                  {{game.name}}
                </router-link>
                <button class="btn btn-danger float-right" @click.prevent="deleteGame(game.id)">X</span></button>
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
      games : []
    }
  },
  methods : {
      deleteGame : function(id){
          this.api.deleteGame(id)
            .then(function(response){
                this.games = this.games.filter(el => id!=el.id);
            }.bind(this))
      }
  },
  created : function(){
      this.api.listGames()
        .then(function(data){
            this.games = data;
        }.bind(this))

  }
}
</script>

<style>
.game-name-wrapper{
    clear:both;
    margin-top:10px;
}
.gamelink{
    width:80%;
}
.games-list{
    border-right:1px solid #dadada;
}
#games-container{
    max-width:1000px;
}
button{
    cursor:pointer;
}
</style>
