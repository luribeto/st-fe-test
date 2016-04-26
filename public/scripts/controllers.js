'use strict';
angular.module('disneyApp')


        .controller('MovieDetailController', ['$scope', '$stateParams', 'moviesFactory', function($scope, $stateParams, moviesFactory) {

            $scope.showMovie = false;
            $scope.message="Loading ...";

            $scope.movie = {};
            
            moviesFactory.getPicture($stateParams.slug)
            .then(
                function(response){
                    $scope.movie = response.data;
                    $scope.showMovie=true;
                }
            );
                        
        }])

        .controller('MoviesController', ['$scope', 'moviesFactory', function($scope, moviesFactory) {
                
              $scope.message="Loading ...";
              $scope.showPictures = false;

              $scope.pictures= [];
              $scope.selectedGender = "";
              $scope.sortKey = "name";


              $scope.pictures = moviesFactory.getPictures()
              .then(
                  function(response){
                      $scope.pictures = response.data;
                      $scope.showPictures= true;
                  },
                  function(response) {
                      $scope.message = "Error: "+response.status + " " + response.statusText;
                  }
              );

        }]);


