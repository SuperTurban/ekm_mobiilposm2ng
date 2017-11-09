<template>
    <div class="container">
        
        <h3 v-if="!isNewGame">{{game.name}}</h3>        
        <form>

            <div class="form-group">
                <label for="game_title">Raja nimi:</label>
                <verror :msg="validationErrors.name"></verror> 
                <input v-model="game.name" class="form-control" id="game_title"> 
            </div>

            <div class="form-group">
                <label for="game_description">Raja kirjeldus:</label>
                <textarea v-model="game.description" class="form-control" id="game_description" rows="3"></textarea>
            </div>

            <div class="form-group">
                <label for="game_active">Rada aktiivne:</label>
                <button id="game_active" class="btn" v-bind:class="{'btn-success' : game.active}" v-on:click="toggleActive">
                    <span v-if="game.active">
                        Aktiivne
                    </span>
                    <span v-else>
                        Mitteaktiivne
                    </span>
                </button>
            </div>

            <div>
                <label class="">Vali punktid: </label>
                <multiselect 
                    v-model="game.destinations" 
                    placeholder="Punktid:" 
                    :multiple="true" 
                    track-by="id" 
                    label="name" 
                    :options="destinations"
                    select-label='Vali punkt'
                    deselect-label='Eemalda punkt'
                    selected-label ='Valitud'
                    >
                </multiselect>
            </div>

            <div class="row action-buttons">
                <div class="col">
                <button id="submit-game" class="btn btn-block btn-success btn-lg" v-on:click.stop="submit">
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

import Multiselect from 'vue-multiselect'; 
import ValidationError from './ValidationError.vue';
export default {
    name : 'SingleGame',
    data : function(){
        return {
            labels : {
                selected : 'test'
            },
            game : {
                name : undefined,
                description : undefined,
                destinations : [],
                active : false,
            },
            destinations : [],
            validationErrors : {},
        }
    },
    computed : {
        isNewGame : function(){
            return !this.$route.params.id; 
        }
    },
    components :{
        Multiselect,
        verror : ValidationError
    },
    methods : {
        setValidationErrors : function(errors){
            for(var key in errors){
                if(errors.hasOwnProperty(key)){
                    var mkey = key.split('.')[1];
                    this.validationErrors[mkey] = errors[key].msg;
                }
            }
            this.$forceUpdate();
        },
        toggleActive : function(){
            this.game.active = !this.game.active;
            this.$forceUpdate();
            return;
        },
        submit:function(){
            this.validationErrors = {};
            var game_data = {
                name : this.game.name,
                description : this.game.description,
                destinations : this.api.mapDestinationIds(this.game.destinations),
                active : this.game.active,
            };

            if(this.isNewGame){
                this.api.newGame(game_data)
                    .then(function(response){
                        this.$router.push({name : 'singlegame', params : {id : response.data.id}})
                    }.bind(this))
                    .catch(function(error){
                        this.setValidationErrors(error.response.data.errors);
                    }.bind(this));
            }

            else{
                this.api.editGame(this.$route.params.id, game_data)
                    .then(function(response){
                        alert('muudetud');
                    }.bind(this))
                    .catch(function(error){
                        this.setValidationErrors(error.response.data.errors)
                    }.bind(this));
            }
        },
        reload : function(){
            if(!this.isNewGame){
                this.api.gameById(this.$route.params.id)
                    .then(function(data){
                        this.game = data;
                    }.bind(this));
            }

            this.api.listDestinations()
                .then(function(data){
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
    #game_active{
        display:block;
    }
</style>