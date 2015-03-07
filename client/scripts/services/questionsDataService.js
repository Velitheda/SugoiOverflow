angular.module('sugoiOverflow.services')
  .factory('questionsDataService',
  function($http, $q, mappingService){
    'use strict';

    var service = {
      getQuestionsList: function(){
        var deferred = $q.defer();
        $http.get('/api/questions/')
        .success(function(data){
          var questions = _.map(data, mappingService.mapQuestionForList);
          deferred.resolve(questions);
        })
        .error(function(error){
          deferred.reject(error);
        });
        return deferred.promise;
      },

      searchQuestions: function(terms){
        var deferred = $q.defer();
        $http.get('/api/questions/search/' + terms)
        .success(function(data){
          var questions = _.map(data, mapQuestionForList);
          deferred.resolve(questions);
        })
        .error(function(error){
          deferred.reject(error);
        });
        return deferred.promise;
      },

      getQuestion: function(id) {
        var deferred = $q.defer();
        $http.get(_.str.sprintf('/api/questions/%s', id))
        .success(function(data){
          var question = mappingService.mapQuestionForClient(data);
          deferred.resolve(question);
        })
        .error(function(error){
          deferred.reject(error);
        });

        return deferred.promise;
      },
      addQuestion: function(question){
        var deferred = $q.defer();
        var data = mappingService.mapQuestionForApi(question);
        $http.post('/api/questions/', data)
        .success(function(addedQuestion){
          deferred.resolve(addedQuestion);
        })
        .error(function(error){
          deferred.reject(error);
        });

        return deferred.promise;
      },
      addAnswer: function(questionId, answer){
        var deferred = $q.defer();
        var data = {
          body: answer
        };
        $http.post(_.str.sprintf('/api/questions/%s/answer', questionId), data)
        .success(function(data){
          var updatedQuestion = mappingService.mapQuestionForClient(data);
          deferred.resolve(updatedQuestion);
        })
        .error(function(error){
          deferred.reject(error);
        });

        return deferred.promise;
      }
    };
    return service;
  });


