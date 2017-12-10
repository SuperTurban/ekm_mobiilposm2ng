<template>
    <div class="container">
        <h3 v-if="!isNewDestination">{{destination.name}}</h3>        
        <form>

    
            <div class="form-group">
                <label for="point_title">Punkti nimi:</label>
                <verror :msg = "validationErrors.name"></verror>
                <input v-model="destination.name" class="form-control" id="point_title"> 
            </div>

            <div class="form-group">
                <label for="point_description">Punkti kirjeldus:</label>
                <verror :msg = "validationErrors.description"></verror>
                <textarea v-model="destination.description" class="form-control" id="point_description" rows="3"></textarea>
            </div>

            <div class="form-group">
                <label for="point_info">Punkti informatsioon (näitamiseks peale punktis jõudmist): </label>
                <textarea v-model="destination.information" class="form-control" id="point_info" rows="3"></textarea>
            </div>

            <verror :msg = "validationErrors.lat"></verror>
            <label>Vali koordinaadid:</label>
            <gmap-map
                @click = "mapClickHandler"
                :center="getCenter()"
                :zoom="getZoom()"
                style="height:400px">
                <gmap-marker
                    :key = 1    
                    :position = "{lat : destination.coords.lat, lng : destination.coords.long}">
                </gmap-marker>
            </gmap-map>

            <label style="margin-top:10px">Meediafailid:</label>
            <div>
                <media :chosenFiles="destination.media">
                </media>
            </div>

            <div class="form-group">
                <label for="point_question">Küsimus punkti kohta: </label>
                <input type="text" class="form-control" v-model="destination.question.question">
                </input>
            </div>


            <div class="btn-group" data-toggle="buttons">
                <label class="btn btn-secondary" v-bind:class="answerStyle('single_answer')">
                    <input type="radio" value="single_answer" v-model="destination.question.type">Kindel vastus 
                </label>
                <label class="btn btn-secondary" v-bind:class="answerStyle('multiple_choice')">
                    <input type="radio" value="multiple_choice" v-model="destination.question.type">Valik vastused
                </label>
                <label class="btn btn-secondary" v-bind:class="answerStyle('creative_answer')">
                    <input type="radio" value="creative_answer" v-model="destination.question.type">Loominguline vastus
                </label>
            </div>
            <div class="form-group descended" v-if="destination.question.type=='multiple_choice'">
            <label for="choice1">Vastusevariant 1 <span class="btn-outline-dark btn-sm" @click="destination.question.answer = destination.question.choice1">Märgi õigeks</span></label>
            <input type="text" v-bind:class="choiceStyle(1)" id="choice1" class="form-control" v-model="destination.question.choice1">
            <label for="choice2">Vastusevariant 2 <span class="btn-outline-dark btn-sm" @click="destination.question.answer = destination.question.choice2">Märgi õigeks</span></label>
            <input type="text" v-bind:class="choiceStyle(2)" id="choice2" class="form-control" v-model="destination.question.choice2">
            <label for="choice3">Vastusevariant 3 <span class="btn-outline-dark btn-sm" @click="destination.question.answer = destination.question.choice3">Märgi õigeks</span></label>
            <input type="text" v-bind:class="choiceStyle(3)" id="choice3"class="form-control" v-model="destination.question.choice3">
            </div>

            <div class="form-group" v-if="destination.question.type!='creative_answer'">
                <label for="point_answer">Vastus küsimusele: </label>
                <input type="text" v-model="destination.question.answer" class="form-control" id="point_answer" rows="3"></textarea>
            </div>


            <div class="row action-buttons">
                <div class="col">
                <button class="btn btn-block btn-success btn-lg" v-on:click.stop.prevent="submit">
                    Salvesta
                </button>
                </div>
                <div class="col">
                <button class="btn btn-block btn-danger btn-lg tuhista" v-on:click.stop.prevent="cancel">
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
import MediaUpload from './Media.vue';

export default {
    name : 'SingleDestination',
    data : function(){
        return {
            destination : {
                name        : undefined,
                description : undefined,
                media       : [],
                question    : {
                    question : '',
                    type : 'multiple_choice',
                    choice1 : '',
                    choice2 : '',
                    choice3 : '',
                    answer : '',
                },
                information : undefined, 
                coords : {
                    lat  : undefined,
                    long : undefined,
                },
                def : 2 
            },
            validationErrors : {},
        }
    },
    computed : {
        isNewDestination : function(){
            return !this.$route.params.destinationId; 
        },
        destination_id : function(){
            return this.$route.params.destinationId || undefined;
        }
    },
    components :{
        Multiselect,
        verror : ValidationError,
        media : MediaUpload,
    },
    methods : {
        answerStyle : function(inp){
            if(this.destination.question.type == inp)
                return "btn-success"
            else 
                return "";
        },
        choiceStyle : function(inp){
            var inp = this.destination.question["choice" + inp];
            if(this.destination.question.answer == inp && inp !=='')
                return "rightchoice";
            else
                return "wrongchoice";
        },
        getCenter : function(){
            if(this.isNewDestination)
                return {lat: 58.64836904, lng: 25.510425}
            else
                return {lat : this.destination.coords.lat, lng: this.destination.coords.long}
        },
        getZoom : function(){
            if(this.isNewDestination)
                return 7;
            else
                return 12;
        },
        mapClickHandler : function(e){
            this.destination.coords.lat = e.latLng.lat();
            this.destination.coords.long = e.latLng.lng();
        },
        setValidationErrors : function(errors){
            for(var key in errors){
                if(errors.hasOwnProperty(key)){
                    var mkey = key.split('.')[key.split('.').length-1];
                    this.validationErrors[mkey] = errors[key].msg;
                }
            }
            this.$forceUpdate();
        },
        submit:function(){
            this.validationErrors = {};

            if(this.isNewDestination){
                this.api.newDestination(this.destination)
                    .then(function(response){
                        this.$router.push({name : 'singledestination', params : {destinationId : response.data.id}})
                    }.bind(this))
                    .catch(function(error){
                        this.setValidationErrors(error.response.data.errors);
                    }.bind(this));
            }
            else{
                this.api.editDestination(this.destination, this.$route.params.destinationId)
                    .then(function(response){
                        this.$router.push({name : 'singledestination', params : {destinationId : response.data.id}})
                    }.bind(this))
                    .catch(function(error){
                        this.setValidationErrors(error.response.data.errors);
                    }.bind(this));
            }
        },
        cancel : function(){
            this.$router.push({name : 'Destinations'});
        },
        reload : function(){
            if(!this.isNewDestination){
                console.log(this.$route.params.destinationId);
                this.api.destinationById(this.$route.params.destinationId)
                    .then(function(data){
                        if(typeof data.question == String)
                            delete data.question;
                        
                        for(var key in data){
                            if(data.hasOwnProperty(key)){
                                console.log(key);
                                this.destination[key] = data[key];
                            }
                        }

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
    .rightchoice{
        border-color:green !important;
    }
    .wrongchoice{
        border-color:red !important;
    }
    .action-buttons{
        margin-top:25px;
    }

    .btn-group{
        margin-bottom:10px;
    }
    .descended{
        padding-left:20px;
    }
</style>