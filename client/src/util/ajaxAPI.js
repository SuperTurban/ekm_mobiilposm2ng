import axios from 'axios';

var host;

if(process.env.NODE_ENV == "development")
    var host = "//localhost:3000";
else
    var host = "//ekmweb.herokuapp.com";

let api = {
    token : false,
    tokenize : function(data){
        data.token = api.token;
        return data;
    },
    mapDestinationIds : function(destinations){
        return destinations.map(function(el){
            return el.id;
        })
    },

    authenticate : function(email, password){
        return axios
                .post(host + "/app/game")
                .then(function(response){
                    api.token = response.data;
                });
    },

    listGames : function(){
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
    },

    gameById : function(id){
          return axios
            .get(host + "/app/game/" + id)
            .then(function(response){
                return response.data;
            })
   },

    newGame : function(game){
        var data = {
            game : game,
        };
        data = api.tokenize(data);
        return axios.post(host + '/app/game', data);
    },

    editGame : function(id, game){
        var data = {
            game : game
        }
        data = api.tokenize(data);
        return axios.put(host + '/app/game/' + id, data);
    },

    deleteGame : function(id){
        var data = api.tokenize({});
        return axios.delete(host + '/app/game/' + id, data);
    },

    // DESTINATIONS
    listDestinations : function(id){
        return axios
            .get(host + "/app/destination")    
            .then(function(response){
                let data = response.data.map(function(v){
                    console
                    return {
                        id : v._id,
                        name : v.name 
                    } 
                });
                return data;
            })
    },

    destinationById : function(id){
        return axios
            .get(host + "/app/destination/" + id)
            .then(function(response){
                return response.data;
            })
    },

    newDestination : function(destination){
        let data = {
            destination  : destination,
        };
        
        data = api.tokenize(data);

        return axios.post(host + '/app/destination', data);
    },

    editDestination : function(destination){

    },
}

export default api;