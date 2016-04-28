'use strict';
angular.module('disneyApp')


        .controller('MovieDetailController', ['$scope', '$stateParams', 'moviesFactory', function($scope, $stateParams, moviesFactory) {
            $scope.showMovie = false;
            $scope.message="Loading ...";
            $scope.selectedIdx = $stateParams;

            $scope.movie = {};
            
            moviesFactory.getPictures()
            .then(
                function(response){
                    $scope.movies = response.data;

                    for(var i=0; i<$scope.movies.length; i++)
                    {
                        var slug = $scope.movies[i].slug;

                        if(slug === $stateParams.slug) {
                            $scope.movie = $scope.movies[i];
                            $scope.showMovie=true;
                            break;
                        }
                    }
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );
                        
        }])

        .controller('MoviesController', ['$scope', 'moviesFactory', 'watchlistFactory', function($scope, moviesFactory, watchlistFactory) {
                
              $scope.message="Loading ...";
              $scope.showPictures = false;

              $scope.pictures= [];
              $scope.selectedGender = "";
              $scope.sortKey = "title";


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

              $scope.setSortKey = function(sortKey) {
                $scope.sortKey = sortKey;
              }

              $scope.addWatchlist = function(slug) {
                watchlistFactory.addToWatchlist(slug.slug);
              }

              $scope.removeWatchlist = function(slug) {
                watchlistFactory.deleteFromWatchlist(slug.slug);
              }

              $scope.isInWatchlist = function(slug) {
                return watchlistFactory.isInWatchlist(slug.slug);
              }

              $scope.getMovieObj = function(slug) {
                for(var i=0; i<$scope.pictures.length; i++)
                {
                  var movieObj = $scope.pictures[i];
                  if(movieObj.slug == slug)
                      return movieObj;
                }
              }
        }])

        .filter('runtimeToTimeStr', function() {
            return function(runtime) {
                var minutes = Math.floor(runtime / 60);
                var hours = Math.floor(minutes / 60);
                var minsPlus = minutes % 60;
                var timeString = hours + 'hrs ';

                if(minsPlus)  timeString += minsPlus + 'mins';
                
                return timeString;
            }
        })

      .directive('errSrc', function() {
        return {
          link: function(scope, element, attrs) {
            element.bind('error', function() {
              if (attrs.src != attrs.errSrc) {
                attrs.$set('src', attrs.errSrc);
              }
            });
          }
        }
      });


