<template>
    <div class="container">
        <h3 v-if="!isNewDestination">{{destination.name}}</h3>        
        <form>

    
            <div class="form-group">
                <label for="point_title">Punkti nimi:</label>
                <input v-model="destination.name" class="form-control" id="point_title"> 
            </div>

            <div class="form-group">
                <label for="point_description">Punkti kirjeldus:</label>
                <textarea v-model="destination.description" class="form-control" id="point_description" rows="3"></textarea>
            </div>

            <div class="form-group">
                <label for="point_info">Punkti informatsioon (näitamiseks peale punktis jõudmist): </label>
                <textarea v-model="destination.information" class="form-control" id="point_info" rows="3"></textarea>
            </div>

            <div class="form-group">
                <label for="coordsx">Koordinaat lat: </label>
                <input v-model="destination.coords.lat" class="form-control" id="coordsx" rows="3">
            </div>
            
            <div class="form-group">
                <label for="coordsy">Koordinaat long: </label>
                <input v-model="destination.coords.long" class="form-control" id="coordsy" rows="3">
            </div>

            <div class="form-group">
                <label for="point_media">Pilt või audio (praegu lihtsalt url:) </label>
                <input v-model="destination.media" class="form-control" id="point_media" rows="3">
            </div>

            <div class="form-group">
                <label for="point_question">Küsimus punkti kohta: </label>
                <input v-model="destination.question" class="form-control" id="point_question" rows="3">
            </div>

            <div class="form-group">
                <label for="point_answer">Vastus küsimusele: </label>
                <input type="text" v-model="destination.answer" class="form-control" id="point_answer" rows="3"></textarea>
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
    name : 'SingleDestination',
    data : function(){
        return {
            destination : {
                name        : undefined,
                description : undefined,
                media       : undefined,
                question    : undefined,
                information : undefined, 
                coords : {
                    lat  : 123,
                    long : 123,
                } 
            },
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
                api.newDestination(this.destination)
                    .then(function(response){
                        this.$router.push({name : 'singledestination', params : {destinationId : response.data.id}})
                    }.bind(this));
            }
            else{
                console.log('not new game');
            }
        },
        reload : function(){
            if(!this.isNewDestination){
                console.log(this.$route.params.destinationId);
                this.api.destinationById(this.$route.params.destinationId)
                    .then(function(data){
                        console.log(data);
                        this.destination = data;
                    }.bind(this));
            }
        },
    },
    watch : {
        '$route.params.destinationId' : function(){
            this.reload();
        }
    },
    created : function(){
        this.reload();

        this.api.listDestinations()
            .then(function(data){
                console.log('tes');
                this.destinations = data;
            }.bind(this));
    }
}

</script>


<style>
    .action-buttons{
        margin-top:25px;
    }
</style>