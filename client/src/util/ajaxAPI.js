import axios from 'axios';

var host;

if(process.env.NODE_ENV == "development" || process.env.NODE_ENV == "testing")
    var host = "//localhost:3000";
else
    var host = "";



let api = function(){
    this.vue = null;
    this.token = false;
    this.loggedIn = false;

    this.tokenize = function(data){
        data.token = this.token;
        return data;
    };

    this.mapMediaIds = function(media){
        return media.map(x => x._id);        
    };
    this.mapDestinationIds = function(destinations){
        return destinations.map(function(el){
            return el.id;
        })
    };

    this.createMedia = function(formData){

        return axios.post(host + "/app/media/", formData)
            .then(function(response){
                console.log(response);
            });
    };

    this.getMedia = function(){
        return axios.get(host + "/app/media")
            .then(function(response){
                if(response.data.status == 'ok')
                    return response.data.files;
                else throw 'error';
             });
    }

    this.authenticate = function(email, password){
        return axios
                .post(host + "/app/authenticate", {email: email, password : password})
                .then(function(response){
                    if(response.data.status == "ok"){
                        this.token = response.data.token;
                        return response.data;
                    }
                    else{
                        throw 'wrong password';
                    }
                }.bind(this));
    },

    this.listGames = function(){
        return axios
                .get(host + "/app/game")    
                .then(function(response){
                    let data = response.data.map(function(v){
                        return {
                            id : v._id,
                            name : v.name 
                        } 
                    });

                    return data;
                })
    };

    this.gameById = function(id){
          return axios
            .get(host + "/app/game/" + id)
            .then(function(response){
                return response.data;
            })
   };

    this.newGame = function(game){
        var data = {
            game : game,
        };
        data = this.tokenize(data);
        return axios.post(host + '/app/game', data);
    };

    this.editGame = function(id, game){
        var data = {
            game : game
        }
        data = this.tokenize(data);
        return axios.put(host + '/app/game/' + id, data);
    };

    this.deleteGame = function(id){
        var data = this.tokenize({});
        return axios.post(host + '/app/game/' + id + '/delete', data);
    };

    // DESTINATIONS
    this.listDestinations = function(id){
        return axios
            .get(host + "/app/destination")    
            .then(function(response){
                let data = response.data.map(function(v){
                    return {
                        id : v._id,
                        name : v.name 
                    } 
                });
                return data;
            })
    };


    this.deleteDestination = function(id){
        var data = this.tokenize({});
        return axios.post(host + '/app/destination/' + id + '/delete', data);
    };

    this.destinationById = function(id){
        return axios
            .get(host + "/app/destination/" + id)
            .then(function(response){
                return response.data;
            })
    };

    this.newDestination = function(destination){
        var ndestination = Object.assign({}, destination);
        ndestination.media = this.mapMediaIds(destination.media);
        let data = {
            destination  : ndestination,
        };
        
        data = this.tokenize(data);

        return axios.post(host + '/app/destination', data);
    };

    this.editDestination = function(destination, id){
        var ndestination = Object.assign({}, destination);
        ndestination.media = this.mapMediaIds(destination.media);
        let data = {
            destination : ndestination,
        }
        data = this.tokenize(data);
        return axios.put(host + '/app/destination/'+id, data);
    };
	
	this.getGameLeaderboard = function(game_id) {
		var uri;
		
		
		if (game_id == null) {
			uri = 'app/leaderboards/all';
		}
		else {
			uri = '/app/leaderboards/' + game_id;
		}

		return axios
			.get(host + uri)
			.then(function(response){
				let data = response.data.players.map(function(v){
					return {
						id : v._id,
						user : v.user,
						score : v.score
					} 
				});
				return response.data;
			})
	};
	
	this.listUsers = function() {
		return axios 
			.get(host + '/app/user/all')
			.then(function(response) {
				let data = response.data.users.map(function(v) {
					return {
						id : v._id,
						username : v.username,
						email : v.email
					}
				});
				console.log(response);
				return response.data;
			})
	};
	

}
let API = new api();

export default API; 
    
