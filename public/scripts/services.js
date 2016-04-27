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
    }]);