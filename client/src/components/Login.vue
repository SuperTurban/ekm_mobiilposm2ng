<template>

<div class="container login-container">
    <div class="row justify-content-md-center">
		<div class="col-md-4">
    		<div class="">
			  	<div class="">
			    	<h3 class="panel-title">Palun logi sisse: </h3>
			 	</div>
			  	<div class="">
			    	<form accept-charset="UTF-8" role="form">

                    <fieldset>
			    	  	<div class="form-group">
			    		    <input class="form-control" placeholder="E-mail" name="email" v-model="email" type="text">
			    		</div>
			    		<div class="form-group">
			    			<input class="form-control" placeholder="Password" name="password" type="password" v-model="password" value="">
			    		</div>
			    		<button class="btn btn-lg btn-success btn-block" type="submit" @click.prevent="login">Logi sisse</button>
			    	</fieldset>

			      	</form>
			    </div>
			</div>
		</div>
	</div>
</div>
</template>


<script>
import api from './../util/ajaxAPI.js';

export default {
    name : 'login',
    data : function(){
        return {
            email : '',
            password : '',
        }
    },
    methods : {
        login : function(){
            api.authenticate(this.email, this.password)
                .then(function(){
                    this.$router.push({name : 'Games'});
                    this.$parent.state.loggedIn = true;
                 }.bind(this));

        }
    }

}
</script>


<style>
.login-container{
    margin-top:100px;
}
</style>