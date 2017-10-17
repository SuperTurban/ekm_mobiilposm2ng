<template>
    <div class="container">
        
        <h3 v-if="!isNewGame">{{name}}</h3>        
        <form>

            <div class="form-group">
                <label for="game_title">Raja nimi:</label>
                <input v-model="name" class="form-control" id="game_title"> 
            </div>

            <div class="form-group">
                <label for="game_description">Raja kirjeldus:</label>
                <textarea v-model="description" class="form-control" id="game_description" rows="3"></textarea>
            </div>

            <div>
                <label class="typo__label"></label>
                <multiselect v-model="selecteddestinations" placeholder="Vali rajad:" :multiple="true" track-by="name" label="name" :options="actions"></multiselect>
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

import Multiselect from 'vue-multiselect'; 
export default {
    name : 'SingleGame',
    data : function(){
        return {
            name : '',
            description : '',
            destinations : '',
            actions: [
            {
                name : "punkt 1",
                type : "test",
            },
            {
                name : 'punkt 2',
            },
            {
                name : 'punkt 3',
            },
            ],
            selecteddestinations : []
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
            if(this.isNewGame){
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