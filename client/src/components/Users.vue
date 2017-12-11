<template>
    <div class="container" id="users-container">
       <div class="row">
         <div class="col-4 users-list">
            <div v-for="(user, index) in users" class="user-name-wrapper" @click="clicked(index+1)">
                <router-link :to="'/users/'+user.id" :data-name="user.username" class="btn btn-outline-dark btn userlink" v-bind:class="{ 'active' : activeEl == index+1}">
                  {{user.username}}
                </router-link>
            </div>
         </div>
       <div class="cur-user-profile col-8">
           <router-view></router-view>
       </div>

       </div>
    </div>
</template>

<script>
export default {
  name: 'Users',  
  data () {
    return {
      users : [],
	  activeEl : 0,
    }
  },
  created : function(){
      this.api.listUsers()
        .then(function(data){
            this.users = data;
        }.bind(this))

  },
  methods : {
  	clicked : function(el) {
	  this.activeEl = el;
	}
  }
}
</script>

<style>

</style>