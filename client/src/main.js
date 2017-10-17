// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';

Vue.config.productionTip = false

axios.get('http://localhost:3000/')
  .then(function(data){
    console.log(data);
  });


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


