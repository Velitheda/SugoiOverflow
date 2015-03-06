'use strict';

angular.module('sugoiOverflow.profile')
  .controller('profileController',
    function($scope, $q, tagsDataService, currentUserService, eventAggregator){

      _.extend($scope, {
        user: {},
        tags: [],
        loadTags: function($query){return tagsDataService.getAvailableTags($query);},
        submit: function(){
          var ace = 1;
        }
      });

      var init = function(){
        $scope.user = currentUserService.user;
      };

      if (currentUserService.userId){
        init();
      } else {
        eventAggregator.bindEvent($scope, eventAggregator.events.currentUserServiceInitialised, init);
      }
    }
  );
