// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';

import * as VueGmaps from 'vue2-google-maps';

Vue.config.productionTip = false

let api = require('./util/ajaxAPI.js');
api.vue = Vue;

Vue.prototype.api = api.default;

Vue.use(VueGmaps, 
  {
    load : 
    {
    key : 'AIzaSyABVIIc4Ox0jUUV8UBqcrZ4ljfR0xqCuh4'
    }
  })

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


