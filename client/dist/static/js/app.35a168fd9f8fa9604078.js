webpackJsonp([1],{"/32H":function(t,n){},"/yRs":function(t,n,e){"use strict";function i(t){e("/32H")}Object.defineProperty(n,"__esModule",{value:!0});var a=e("diQi"),s=e.n(a),o=e("EuPz"),r=e("VU/8"),l=i,c=r(s.a,o.a,!1,l,null,null);n.default=c.exports},"2Nby":function(t,n,e){"use strict";n.a={name:"mainmenu",data:function(){return{}},methods:{logout:function(){this.$parent.state.loggedIn=!1,this.api.token=!1}}}},"2rB8":function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"container"},[t.isNewGame?t._e():e("h3",[t._v(t._s(t.game.name))]),t._v(" "),e("form",[e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"game_title"}},[t._v("Raja nimi:")]),t._v(" "),e("verror",{attrs:{msg:t.validationErrors.name}}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.game.name,expression:"game.name"}],staticClass:"form-control",attrs:{id:"game_title"},domProps:{value:t.game.name},on:{input:function(n){n.target.composing||t.$set(t.game,"name",n.target.value)}}})],1),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"game_description"}},[t._v("Raja kirjeldus:")]),t._v(" "),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.game.description,expression:"game.description"}],staticClass:"form-control",attrs:{id:"game_description",rows:"3"},domProps:{value:t.game.description},on:{input:function(n){n.target.composing||t.$set(t.game,"description",n.target.value)}}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"game_active"}},[t._v("Rada aktiivne:")]),t._v(" "),e("button",{staticClass:"btn",class:{"btn-success":t.game.active},attrs:{id:"game_active"},on:{click:t.toggleActive}},[t.game.active?e("span",[t._v("\n                    Aktiivne\n                ")]):e("span",[t._v("\n                    Mitteaktiivne\n                ")])])]),t._v(" "),e("div",[e("label",{},[t._v("Vali punktid: ")]),t._v(" "),e("multiselect",{attrs:{placeholder:"Punktid:",multiple:!0,"track-by":"id",label:"name",options:t.destinations,"select-label":"Vali punkt","deselect-label":"Eemalda punkt","selected-label":"Valitud"},model:{value:t.game.destinations,callback:function(n){t.$set(t.game,"destinations",n)},expression:"game.destinations"}})],1),t._v(" "),e("div",{staticClass:"row action-buttons"},[e("div",{staticClass:"col"},[e("button",{staticClass:"btn btn-block btn-success btn-lg",attrs:{id:"submit-game"},on:{click:function(n){n.stopPropagation(),n.preventDefault(),t.submit(n)}}},[t._v("\n                Salvesta\n            ")])]),t._v(" "),t._m(0)])])])},a=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"col"},[e("button",{staticClass:"btn btn-block btn-danger btn-lg tuhista"},[t._v("\n                Tühista\n            ")])])}],s={render:i,staticRenderFns:a};n.a=s},"3yYu":function(t,n,e){"use strict";n.a={name:"Games",data:function(){return{games:[]}},methods:{deleteGame:function(t){this.api.deleteGame(t).then(function(n){this.games=this.games.filter(function(n){return t!=n.id})}.bind(this))}},created:function(){this.api.listGames().then(function(t){this.games=t}.bind(this))}}},"5ZbH":function(t,n,e){"use strict";function i(t){e("uxWy")}Object.defineProperty(n,"__esModule",{value:!0});var a=e("kXiA"),s=e.n(a),o=e("81Fx"),r=e("VU/8"),l=i,c=r(s.a,o.a,!1,l,null,null);n.default=c.exports},"5cLx":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("Vj7G"),a=e.n(i),s=e("NFqy"),o=e("VU/8"),r=o(a.a,s.a,!1,null,null,null);n.default=r.exports},"6PPp":function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"container",attrs:{id:"games-container"}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-4 games-list"},[e("div",{staticClass:"game-name-wrapper"},[e("router-link",{staticClass:"btn btn-block btn-success",attrs:{to:"/create-destination"}},[t._v("\n                Uus punkt \n            ")])],1),t._v(" "),t._l(t.destinations,function(n){return e("div",{staticClass:"game-name-wrapper"},[e("router-link",{staticClass:"btn btn-outline-dark destlink",attrs:{to:"/destinations/"+n.id}},[t._v("\n              "+t._s(n.name)+"\n            ")]),t._v(" "),e("button",{staticClass:"btn btn-danger float-right",on:{click:function(e){e.preventDefault(),t.deleteDestination(n.id)}}},[t._v("X")])],1)})],2),t._v(" "),e("div",{staticClass:"cur-game-info col-8"},[e("router-view")],1)])])},a=[],s={render:i,staticRenderFns:a};n.a=s},"81Fx":function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"vue-map-container"},[e("div",{ref:"vue-map",staticClass:"vue-map"}),t._v(" "),e("div",{staticClass:"vue-map-hidden"},[t._t("default")],2),t._v(" "),t._t("visible")],2)},a=[],s={render:i,staticRenderFns:a};n.a=s},"96Ht":function(t,n,e){"use strict";var i=e("SvTV");n.a={name:"Games",created:function(){i.default.listDestinations().then(function(t){this.destinations=t}.bind(this))},data:function(){return{destinations:[]}},methods:{deleteDestination:function(t){this.api.deleteDestination(t).then(function(n){this.destinations=this.destinations.filter(function(n){return t!=n.id})}.bind(this))}}}},Ab7z:function(t,n,e){"use strict";var i=e("VU/8"),a=i(null,null,!1,null,null,null);a.exports},"DtT/":function(t,n,e){"use strict";function i(t){e("x3yE")}var a=e("2Nby"),s=e("zDrU"),o=e("VU/8"),r=i,l=o(a.a,s.a,!1,r,null,null);n.a=l.exports},EuPz:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"vue-street-view-pano-container"},[e("div",{ref:"vue-street-view-pano",staticClass:"vue-street-view-pano"}),t._v(" "),t._t("default")],2)},a=[],s={render:i,staticRenderFns:a};n.a=s},FX9o:function(t,n){},Gjim:function(t,n,e){"use strict";function i(t){e("yS8/")}var a=e("U2g2"),s=e("2rB8"),o=e("VU/8"),r=i,l=o(a.a,s.a,!1,r,null,null);n.a=l.exports},HyhT:function(t,n,e){"use strict";function i(t){e("pR5o")}var a=e("96Ht"),s=e("6PPp"),o=e("VU/8"),r=i,l=o(a.a,s.a,!1,r,null,null);n.a=l.exports},M93x:function(t,n,e){"use strict";function i(t){e("FX9o")}var a=e("xJD8"),s=e("MTSB"),o=e("VU/8"),r=i,l=o(a.a,s.a,!1,r,null,null);n.a=l.exports},MTSB:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"app"}},[t.state.loggedIn?e("mainmenu"):t._e(),t._v(" "),t.state.loggedIn?e("div",{staticClass:"container"},[e("router-view")],1):e("div",{staticClass:"login"},[e("login")],1)],1)},a=[],s={render:i,staticRenderFns:a};n.a=s},NFqy:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("div",{ref:"flyaway"},[t._t("default")],2)])},a=[],s={render:i,staticRenderFns:a};n.a=s},NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("7+uW"),a=e("M93x"),s=e("YaEn"),o=e("mtWM"),r=(e.n(o),e("sA6N"));e.n(r);i.a.config.productionTip=!1;var l=e("SvTV");l.vue=i.a,i.a.prototype.api=l.default,i.a.use(r,{load:{key:"AIzaSyABVIIc4Ox0jUUV8UBqcrZ4ljfR0xqCuh4"}}),new i.a({el:"#app",router:s.a,template:"<App/>",components:{App:a.a}})},PIoQ:function(t,n){},QC1R:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement;return(t._self._c||n)("input",{ref:"input",attrs:{type:"text",placeholder:t.placeholder},domProps:{value:t.value}})},a=[],s={render:i,staticRenderFns:a};n.a=s},SvTV:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i,i,a=e("mtWM"),s=e.n(a),i="//ekmweb.herokuapp.com",o=function(){this.vue=null,this.token=!1,this.loggedIn=!1,this.tokenize=function(t){return t.token=this.token,t},this.mapDestinationIds=function(t){return t.map(function(t){return t.id})},this.authenticate=function(t,n){return s.a.post(i+"/app/authenticate",{email:t,password:n}).then(function(t){if("ok"==t.data.status)return this.token=t.data.token,t.data;throw"wrong password"}.bind(this))},this.listGames=function(){return s.a.get(i+"/app/game").then(function(t){return t.data.map(function(t){return{id:t._id,name:t.name}})})},this.gameById=function(t){return s.a.get(i+"/app/game/"+t).then(function(t){return t.data})},this.newGame=function(t){var n={game:t};return n=this.tokenize(n),s.a.post(i+"/app/game",n)},this.editGame=function(t,n){var e={game:n};return e=this.tokenize(e),s.a.put(i+"/app/game/"+t,e)},this.deleteGame=function(t){var n=this.tokenize({});return s.a.post(i+"/app/game/"+t+"/delete",n)},this.listDestinations=function(t){return s.a.get(i+"/app/destination").then(function(t){return t.data.map(function(t){return{id:t._id,name:t.name}})})},this.deleteDestination=function(t){var n=this.tokenize({});return s.a.post(i+"/app/destination/"+t+"/delete",n)},this.destinationById=function(t){return s.a.get(i+"/app/destination/"+t).then(function(t){return t.data})},this.newDestination=function(t){var n={destination:t};return n=this.tokenize(n),s.a.post(i+"/app/destination",n)},this.editDestination=function(t,n){var e={destination:t};return e=this.tokenize(e),s.a.put(i+"/app/destination/"+n,e)}},r=new o;n.default=r},Svxx:function(t,n,e){"use strict";function i(t){e("YFn3")}var a=e("Zkz/"),s=e("zf6b"),o=e("VU/8"),r=i,l=o(a.a,s.a,!1,r,null,null);n.a=l.exports},"TKn+":function(t,n,e){"use strict";var i=e("VU/8"),a=i(null,null,!1,null,null,null);n.a=a.exports},U2g2:function(t,n,e){"use strict";var i=e("RUzx"),a=e.n(i),s=e("dMrR");n.a={name:"SingleGame",data:function(){return{labels:{selected:"test"},game:{name:void 0,description:void 0,destinations:[],active:!1},destinations:[],validationErrors:{}}},computed:{isNewGame:function(){return!this.$route.params.id}},components:{Multiselect:a.a,verror:s.a},methods:{setValidationErrors:function(t){for(var n in t)if(t.hasOwnProperty(n)){var e=n.split(".")[1];this.validationErrors[e]=t[n].msg}this.$forceUpdate()},toggleActive:function(){this.game.active=!this.game.active,this.$forceUpdate()},submit:function(){this.validationErrors={};var t={name:this.game.name,description:this.game.description,destinations:this.api.mapDestinationIds(this.game.destinations),active:this.game.active};this.isNewGame?this.api.newGame(t).then(function(t){this.$router.push({name:"singlegame",params:{id:t.data.id}})}.bind(this)).catch(function(t){this.setValidationErrors(t.response.data.errors)}.bind(this)):this.api.editGame(this.$route.params.id,t).then(function(t){alert("muudetud")}.bind(this)).catch(function(t){this.setValidationErrors(t.response.data.errors)}.bind(this))},reload:function(){this.isNewGame||this.api.gameById(this.$route.params.id).then(function(t){this.game=t}.bind(this)),this.api.listDestinations().then(function(t){this.destinations=t}.bind(this))}},watch:{"$route.params.id":function(t){this.reload()}},created:function(){this.reload()}}},Uhku:function(t,n,e){"use strict";n.a={name:"Main",data:function(){return{msg:"test"}}}},WZVU:function(t,n,e){"use strict";n.a={name:"verror",props:["msg"]}},YFn3:function(t,n){},YI6p:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("jIen"),a=e.n(i),s=e("noYe"),o=e("VU/8"),r=o(a.a,s.a,!1,null,null,null);n.default=r.exports},YaEn:function(t,n,e){"use strict";var i=e("7+uW"),a=e("/ocq"),s=e("s6+2"),o=e("kx66"),r=e("HyhT"),l=e("TKn+"),c=e("Gjim"),u=(e("Ab7z"),e("Svxx"));i.a.use(a.a),n.a=new a.a({routes:[{path:"/",name:"Main",component:s.a},{path:"/games",name:"Games",component:o.a,children:[{name:"singlegame",path:":id",component:c.a}]},{path:"/destinations",name:"Destinations",component:r.a,children:[{name:"singledestination",path:":destinationId",component:u.a}]},{path:"/users",name:"Users",component:l.a},{path:"/create-game",name:"NewGame",component:c.a},{path:"/create-destination",name:"NewDestination",component:u.a}]})},ZMFa:function(t,n){},"Zkz/":function(t,n,e){"use strict";var i=e("RUzx"),a=e.n(i),s=e("dMrR");n.a={name:"SingleDestination",data:function(){return{destination:{name:void 0,description:void 0,media:void 0,question:void 0,information:void 0,coords:{lat:void 0,long:void 0}},validationErrors:{}}},computed:{isNewDestination:function(){return!this.$route.params.destinationId}},components:{Multiselect:a.a,verror:s.a},methods:{getCenter:function(){return this.isNewDestination?{lat:58.64836904,lng:25.510425}:{lat:this.destination.coords.lat,lng:this.destination.coords.long}},getZoom:function(){return this.isNewDestination?7:12},mapClickHandler:function(t){this.destination.coords.lat=t.latLng.lat(),this.destination.coords.long=t.latLng.lng()},setValidationErrors:function(t){for(var n in t)if(t.hasOwnProperty(n)){var e=n.split(".")[n.split(".").length-1];this.validationErrors[e]=t[n].msg}this.$forceUpdate()},submit:function(){this.validationErrors={},this.isNewDestination?this.api.newDestination(this.destination).then(function(t){this.$router.push({name:"singledestination",params:{destinationId:t.data.id}})}.bind(this)).catch(function(t){this.setValidationErrors(t.response.data.errors)}.bind(this)):this.api.editDestination(this.destination,this.$route.params.destinationId).then(function(t){this.$router.push({name:"singledestination",params:{destinationId:t.data.id}})}.bind(this)).catch(function(t){this.setValidationErrors(t.response.data.errors)}.bind(this))},reload:function(){this.isNewDestination||(console.log(this.$route.params.destinationId),this.api.destinationById(this.$route.params.destinationId).then(function(t){console.log(t),this.destination=t}.bind(this)))}},watch:{"$route.params.destinationId":function(){this.reload()}},created:function(){this.reload(),this.api.listDestinations().then(function(t){console.log("tes"),this.destinations=t}.bind(this))}}},cIkp:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement;return(t._self._c||n)("div",{directives:[{name:"show",rawName:"v-show",value:t.msg,expression:"msg"}],staticClass:"alert alert-danger validation-error"},[t._v("\r\n    "+t._s(t.msg)+"\r\n")])},a=[],s={render:i,staticRenderFns:a};n.a=s},dMrR:function(t,n,e){"use strict";function i(t){e("eFfM")}var a=e("WZVU"),s=e("cIkp"),o=e("VU/8"),r=i,l=o(a.a,s.a,!1,r,null,null);n.a=l.exports},eFfM:function(t,n){},ebwX:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement;return(t._self._c||n)("div",{})},a=[],s={render:i,staticRenderFns:a};n.a=s},kx66:function(t,n,e){"use strict";function i(t){e("ZMFa")}var a=e("3yYu"),s=e("vG4w"),o=e("VU/8"),r=i,l=o(a.a,s.a,!1,r,null,null);n.a=l.exports},"n+RR":function(t,n){},"nKb+":function(t,n,e){"use strict";n.a={name:"login",data:function(){return{email:"",password:""}},methods:{login:function(){console.log(this.api),this.api.authenticate(this.email,this.password).then(function(){this.$router.push({name:"Games"}),this.$parent.state.loggedIn=!0}.bind(this)).catch(function(t){alert("vigane parool")})}}}},noYe:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("label",[e("span",{domProps:{textContent:t._s(t.label)}}),t._v(" "),e("input",{ref:"input",class:t.className,attrs:{type:"text",placeholder:t.placeholder}})])},a=[],s={render:i,staticRenderFns:a};n.a=s},otLb:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"container login-container"},[e("div",{staticClass:"row justify-content-md-center"},[e("div",{staticClass:"col-md-4"},[e("div",{},[t._m(0),t._v(" "),e("div",{},[e("form",{attrs:{"accept-charset":"UTF-8",role:"form"}},[e("fieldset",[e("div",{staticClass:"form-group"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",attrs:{placeholder:"E-mail",name:"email",type:"text"},domProps:{value:t.email},on:{input:function(n){n.target.composing||(t.email=n.target.value)}}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{placeholder:"Password",name:"password",type:"password",value:""},domProps:{value:t.password},on:{input:function(n){n.target.composing||(t.password=n.target.value)}}})]),t._v(" "),e("button",{staticClass:"btn btn-lg btn-success btn-block",attrs:{type:"submit"},on:{click:function(n){n.preventDefault(),t.login(n)}}},[t._v("Logi sisse")])])])])])])])])},a=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{},[e("h3",{staticClass:"panel-title"},[t._v("Palun logi sisse: ")])])}],s={render:i,staticRenderFns:a};n.a=s},pR5o:function(t,n){},preG:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("osty"),a=e.n(i),s=e("QC1R"),o=e("VU/8"),r=o(a.a,s.a,!1,null,null,null);n.default=r.exports},"s6+2":function(t,n,e){"use strict";function i(t){e("PIoQ")}var a=e("Uhku"),s=e("ebwX"),o=e("VU/8"),r=i,l=o(a.a,s.a,!1,r,"data-v-243bc551",null);n.a=l.exports},uxWy:function(t,n){},vG4w:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"container",attrs:{id:"games-container"}},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-4 games-list"},[e("div",{staticClass:"game-name-wrapper"},[e("router-link",{staticClass:"btn btn-block btn-success",attrs:{to:"/create-game"}},[t._v("\n                Uus rada\n            ")])],1),t._v(" "),t._l(t.games,function(n){return e("div",{staticClass:"game-name-wrapper"},[e("router-link",{staticClass:"btn btn-outline-dark btn gamelink",attrs:{to:"/games/"+n.id,"data-name":n.name}},[t._v("\n              "+t._s(n.name)+"\n            ")]),t._v(" "),e("button",{staticClass:"btn btn-danger float-right",attrs:{"data-deletename":n.name},on:{click:function(e){e.preventDefault(),t.deleteGame(n.id)}}},[t._v("X")])],1)})],2),t._v(" "),e("div",{staticClass:"cur-game-info col-8"},[e("router-view")],1)])])},a=[],s={render:i,staticRenderFns:a};n.a=s},x3yE:function(t,n){},xJD8:function(t,n,e){"use strict";var i=e("DtT/"),a=e("xJsL"),s={loggedIn:!1};n.a={name:"app",data:function(){return{state:s}},components:{mainmenu:i.a,login:a.a}}},xJsL:function(t,n,e){"use strict";function i(t){e("n+RR")}var a=e("nKb+"),s=e("otLb"),o=e("VU/8"),r=i,l=o(a.a,s.a,!1,r,null,null);n.a=l.exports},"yS8/":function(t,n){},zDrU:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"main-menu"}},[e("nav",{staticClass:"navbar navbar-light"},[e("ul",{staticClass:"nav nav-tabs nav-fill"},[e("li",{staticClass:"nav-item"},[e("router-link",{staticClass:"nav-link active",attrs:{to:"/games",href:"#"}},[t._v("Mängud")])],1),t._v(" "),e("li",{staticClass:"nav-item"},[e("router-link",{staticClass:"nav-link",attrs:{to:"/destinations"}},[t._v("Mängude sihtkohad")])],1),t._v(" "),e("li",{staticClass:"nav-item"},[e("router-link",{staticClass:"nav-link",attrs:{to:"/users",href:"#"}},[t._v("Kasutajad")])],1)]),t._v(" "),e("ul",{staticClass:"nav nav-pills justify-content-end"},[e("li",{staticClass:"nav navbar-nav navbar-right"},[e("a",{staticClass:"nav-link",attrs:{href:"#"},on:{click:t.logout}},[t._v("Logi välja")])])])])])},a=[],s={render:i,staticRenderFns:a};n.a=s},zf6b:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"container"},[t.isNewDestination?t._e():e("h3",[t._v(t._s(t.destination.name))]),t._v(" "),e("form",[e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"point_title"}},[t._v("Punkti nimi:")]),t._v(" "),e("verror",{attrs:{msg:t.validationErrors.name}}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.destination.name,expression:"destination.name"}],staticClass:"form-control",attrs:{id:"point_title"},domProps:{value:t.destination.name},on:{input:function(n){n.target.composing||t.$set(t.destination,"name",n.target.value)}}})],1),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"point_description"}},[t._v("Punkti kirjeldus:")]),t._v(" "),e("verror",{attrs:{msg:t.validationErrors.description}}),t._v(" "),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.destination.description,expression:"destination.description"}],staticClass:"form-control",attrs:{id:"point_description",rows:"3"},domProps:{value:t.destination.description},on:{input:function(n){n.target.composing||t.$set(t.destination,"description",n.target.value)}}})],1),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"point_info"}},[t._v("Punkti informatsioon (näitamiseks peale punktis jõudmist): ")]),t._v(" "),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.destination.information,expression:"destination.information"}],staticClass:"form-control",attrs:{id:"point_info",rows:"3"},domProps:{value:t.destination.information},on:{input:function(n){n.target.composing||t.$set(t.destination,"information",n.target.value)}}})]),t._v(" "),e("verror",{attrs:{msg:t.validationErrors.lat}}),t._v(" "),e("label",[t._v("Vali koordinaadid:")]),t._v(" "),e("gmap-map",{staticStyle:{height:"400px"},attrs:{center:t.getCenter(),zoom:t.getZoom()},on:{click:t.mapClickHandler}},[e("gmap-marker",{key:1,attrs:{position:{lat:t.destination.coords.lat,lng:t.destination.coords.long}}})],1),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"point_media"}},[t._v("Pilt või audio (praegu lihtsalt url:) ")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.destination.media,expression:"destination.media"}],staticClass:"form-control",attrs:{id:"point_media",rows:"3"},domProps:{value:t.destination.media},on:{input:function(n){n.target.composing||t.$set(t.destination,"media",n.target.value)}}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"point_question"}},[t._v("Küsimus punkti kohta: ")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.destination.question,expression:"destination.question"}],staticClass:"form-control",attrs:{id:"point_question",rows:"3"},domProps:{value:t.destination.question},on:{input:function(n){n.target.composing||t.$set(t.destination,"question",n.target.value)}}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",{attrs:{for:"point_answer"}},[t._v("Vastus küsimusele: ")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.destination.answer,expression:"destination.answer"}],staticClass:"form-control",attrs:{type:"text",id:"point_answer",rows:"3"},domProps:{value:t.destination.answer},on:{input:function(n){n.target.composing||t.$set(t.destination,"answer",n.target.value)}}})]),t._v(" "),e("div",{staticClass:"row action-buttons"},[e("div",{staticClass:"col"},[e("button",{staticClass:"btn btn-block btn-success btn-lg",on:{click:function(n){n.stopPropagation(),t.submit(n)}}},[t._v("\n                Salvesta\n            ")])]),t._v(" "),t._m(0)])],1)])},a=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"col"},[e("button",{staticClass:"btn btn-block btn-danger btn-lg tuhista"},[t._v("\n                Tühista\n            ")])])}],s={render:i,staticRenderFns:a};n.a=s}},["NHnr"]);
//# sourceMappingURL=app.35a168fd9f8fa9604078.js.map