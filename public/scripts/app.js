'use strict';

angular.module('disneyApp', ['ui.router','angularUtils.directives.dirPagination'])
.config(function($stateProvider, $urlRouterProvider) {
    
        $stateProvider
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html'
                    },
                    'content': {
                        templateUrl : 'views/movies.html',
                        controller  : 'MoviesController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html'
                    }
                }
            })
            // route for the movies page
            .state('app.movies', {
                url:'movies',
                views: {
                    'content@': {
                        templateUrl: 'views/movies.html',
                        controller: 'MoviesController'
                   }
                }
            })

            // route for the moviedetail page
            .state('app.moviedetails', {
                url: 'movies/:slug',
                views: {
                    'content@': {
                        templateUrl : 'views/moviedetail.html',
                        controller  : 'MovieDetailController'
                   }
                }
            });
            $urlRouterProvider.otherwise('/');
    });
