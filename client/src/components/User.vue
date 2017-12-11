<template>
    <div class="container">
        <h3>{{user.username}}</h3>        
        <form>

            <div class="form-group">
                <label for="point_title">Username</label>
                <input v-model="user.username" class="form-control" id="user_title" value="user.username"> 
            </div>

            


            <div class="row action-buttons">
                <div class="col">
                <button class="btn btn-block btn-success btn-lg" v-on:click.stop.prevent="sendEmail">
                    Send email
                </button>
                </div>
            </div>
        </form>
    </div>
</template>

export default {
    name : 'User',
	data () {
		return {
			user : [],
		}
	},
	created : function(){
		this.reload();
	},
	watch : {
		'$route.params.userId' : function(id) {
			this.reload();
		}
	},
	methods : {
			reload : function() {
				this.api.getUserData(this.$route.params.userId)
                .then(function(data){
                    this.user = data;
                }.bind(this));
			}
		}
}
</script>