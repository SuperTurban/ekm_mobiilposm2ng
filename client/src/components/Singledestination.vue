<template>
    <div class="container">
        <h3 v-if="!isNewDestination">{{name}}</h3>        
        <form>

            <div class="form-group">
                <label for="point_title">Punkti nimi:</label>
                <input v-model="name" class="form-control" id="point_title"> 
            </div>

            <div class="form-group">
                <label for="point_description">Punkti kirjeldus:</label>
                <textarea v-model="description" class="form-control" id="point_description" rows="3"></textarea>
            </div>

            <div class="form-group">
                <label for="point_info">Punkti informatsioon (näitamiseks peale punktis jõudmist): </label>
                <textarea v-model="information" class="form-control" id="point_info" rows="3"></textarea>
            </div>

            <div class="form-group">
                <label for="point_media">Pilt või audio (praegu lihtsalt url:) </label>
                <input v-model="media" class="form-control" id="point_media" rows="3">
            </div>

            <div class="form-group">
                <label for="point_question">Küsimus punkti kohta: </label>
                <input v-model="question" class="form-control" id="point_question" rows="3">
            </div>

            <div class="form-group">
                <label for="point_answer">Vastus küsimusele: </label>
                <input type="text" v-model="answer" class="form-control" id="point_answer" rows="3"></textarea>
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

        <h1 v-if="isNewGame">
        test
        </h1>
    </div>
</template>


<script>

import api from '../util/ajaxAPI.js';
import Multiselect from 'vue-multiselect'; 
api.listGames();
export default {
    name : 'SingleGame',
    data : function(){
        console.log(Vue.config);
        return {
            name : '',
            description : '',
        }
    },
    computed : {
        isNewDestination : function(){
            return !this.$route.params.destinationId; 
        }
    },
    components :{
        Multiselect
    },
    methods : {
        submit:function(){
            if(this.isNewDestination){
                console.log('new_game');
            }
            else{
                console.log('not new game');
            }
        }
    }
}

</script>


<style>
    .action-buttons{
        margin-top:25px;
    }
</style>