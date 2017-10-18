<template>
    <div class="container">
        
        <h3 v-if="!isNewGame">{{game.name}}</h3>        
        <form>

            <div class="form-group">
                <label for="game_title">Raja nimi:</label>
                <input v-model="game.name" class="form-control" id="game_title"> 
            </div>

            <div class="form-group">
                <label for="game_description">Raja kirjeldus:</label>
                <textarea v-model="game.description" class="form-control" id="game_description" rows="3"></textarea>
            </div>

            <div>
                <label class="typo__label"></label>
                <multiselect v-model="game.destinations" placeholder="Vali rajad:" :multiple="true" track-by="id" label="name" :options="destinations"></multiselect>
            </div>

            <div class="row action-buttons">
                <div class="col">
                <button class="btn btn-block btn-success btn-lg" v-on:click.stop="submit">
                    Salvesta
                </button>
                </div>
                <div class="col">
                <button class="btn btn-block btn-danger btn-lg tuhista">
                    Tühista
                </button>
                </div>
            </div>
        </form>
    </div>
</template>


<script>

import api from '../util/ajaxAPI.js';
import Multiselect from 'vue-multiselect'; 
export default {
    name : 'SingleGame',
    data : function(){
        return {
            game : {
                name : undefined,
                description : undefined,
                destinations : [],
            },
            destinations : []
        }
    },
    computed : {
        isNewGame : function(){
            return !this.$route.params.id; 
        }
    },
    components :{
        Multiselect
    },
    methods : {
        submit:function(){
            
            var game_data = {
                name : this.game.name,
                description : this.game.description,
                destinations : api.mapDestinationIds(this.game.destinations)
            };

            console.log(game_data);
            if(this.isNewGame){
                api.newGame(game_data)
                    .then(function(response){
                        this.$router.push({name : 'singlegame', params : {id : response.data.id}})
                     }.bind(this));
            }
            else{
                console.log('not new game');
            }
        },
        reload : function(){
            if(!this.isNewGame){
                api.gameById(this.$route.params.id)
                    .then(function(data){
                        console.log(data);
                        this.game = data;
                    }.bind(this));
            }

            api.listDestinations()
                .then(function(data){
                    console.log(data);
                    this.destinations = data;
                }.bind(this));
/*
            this.game.destinations = this.destinations.find(function(el){
                if(
                    this.game.destinations.find(function(el_gam){
                         return el_gam == el.id;
                }))
                return true;
                else return false;
            }.bind(this));
            */
        }

    },
    watch : {
        '$route.params.id' :function(id){
            this.reload();
        }
    },
    created : function(){
        this.reload();
    }
   
}

</script>


<style>
    .action-buttons{
        margin-top:25px;
    }
</style>