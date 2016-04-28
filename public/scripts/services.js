'use strict';

//The baseURL should be changed to 
angular.module('disneyApp')
    //.constant("baseURL","http://test.dma.com/")
    .constant("baseURL","http://localhost:3000/")
    .factory('moviesFactory', ['$http', 'baseURL', function($http,baseURL) {

        var picfac = {};

        picfac.getPictures=function(){
          //return $resource(baseURL + "pictures/:id", null, {'update':{method:'PUT'}});
          return $http.get(baseURL + "items");
        };

        /*picfac.getPicture=function(slug){
          return $http.get(baseURL + "items/:slug");
        };*/

        return picfac;
    }])

    .factory('watchlistFactory', ['$localStorage', 'baseURL', function ($localStorage, baseURL) {

        var watchlistFac = {};
        //var favorites = [];
        var watchlist = $localStorage.getObject('watchlist','[]');

        watchlistFac.addToWatchlist = function(slug) {
            debugger;
            for (var i = 0; i < watchlist.length; i++) {
                if (watchlist[i].slug == slug)
                    return;
            }
            watchlist.push({slug:slug});
            $localStorage.storeObject('watchlist', watchlist);
        };

        watchlistFac.deleteFromWatchlist = function(slug) {
            for (var i = 0; i < watchlist.length; i++) {
                if (watchlist[i].slug == slug) {
                    watchlist.splice(i, 1);
                }
            }
            $localStorage.storeObject('watchlist', watchlist);
        }

        watchlistFac.getWatchlist = function() {
            return watchlist;
        };

        watchlistFac.isInWatchlist = function(slug) {

            for(var i=0; i<watchlist.length; i++)
            {
                var item = watchlist[i];
                if(item.slug == slug)
                    return true;
            }

            return false;
        }

        return watchlistFac;
    }])

    .factory('$localStorage', ['$window', function($window) {
        
        return {
            store: function(key, value) {
              $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
              return $window.localStorage[key] || defaultValue;
            },
            storeObject: function(key, value) {
              $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key,defaultValue) {
              return JSON.parse($window.localStorage[key] || defaultValue);
            }
        }
    }]);