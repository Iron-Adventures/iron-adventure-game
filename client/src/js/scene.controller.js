(function() {
  'use strict';

  // create new Angular Controller
  angular.module('adventure')
    .controller('SceneController', SceneController);

  // inject the angular service that handles data calls for scene data
  SceneController.$inject = ['$state', '$stateParams', 'SceneService'];

  /**
   * SceneController creates a new scene Controller
   * @param {Object} SceneService Service singleton
   */
  function SceneController($state, $stateParams, SceneService) {
    let vm = this;

    vm.playerEmail = '';  // store the current player's email

    vm.currentScene = {};  // store the scene to be displayed in the View

    vm.toggle = true;      // used toggle a CSS class based on a click event

    /**
     * Function getScene() returns current scene data for a player
     * @param  {String} inputEmail Player email address
     * @return {void}
     */
    vm.getScene = function getScene(inputEmail) {
      if (!inputEmail || inputEmail.length === 0 ||
        typeof(inputEmail) !== 'string') {
        console.info('Valid email required to get a scene');
        return;
      }

      SceneService.getScene(inputEmail)
        .then(function handleResponse(responseObj) {
          vm.currentScene = responseObj;
        })
        .catch(function handleError(error) {
          if (error.status === 401) {
            vm.hasError = true;
            vm.errorMessage = 'Scene not found';
          } else if (error.status === 404) {
            vm.hasError = true;
            vm.errorMessage = 'Could not find that scene by the id provided';
          } else {
            vm.hasError = true;
            vm.errorMessage = 'Unknown error from server';
          }
        });
    };

    /**
     * Function loadScene() will load the current scene, or the next scene
     * @param  {String} inputId    Current scene ID provided to advance,
     *                             or 0 if we need to go to the next scene
     * @param  {String} inputText  Player choice
     * @param  {String} inputEmail Player email
     * @return {Object}            Scene data
     */
    vm.loadScene = function loadScene(inputId, inputText, inputEmail) {
      console.log('input variables to scene.router:', inputId, inputText, inputEmail);
      if (!inputId || inputId.length === 0 || typeof(inputId) !== 'string') {
        console.info('Valid id required to load a scene');
        return;
      }

      if (!inputText || inputText.length === 0 ||
        typeof(inputText) !== 'string') {
        console.info('Valid choice text required to load a scene');
        return;
      }

      if (!inputEmail || inputEmail.length === 0 ||
        typeof(inputEmail) !== 'string') {
        console.info('Valid email required to load a scene');
        return;
      }

      SceneService.loadScene(inputId, inputText, inputEmail)
        .then(function handleResponse(responseObj) {
          vm.currentScene = responseObj;
        })
        .catch(function handleError(error) {
          if (error.status === 401) {
            vm.hasError = true;
            vm.errorMessage = 'Scene not found';
          } else if (error.status === 404) {
            vm.hasError = true;
            vm.errorMessage = 'Could not find that scene by the id provided';
          } else {
            vm.hasError = true;
            vm.errorMessage = 'Unknown error from server';
          }
        });
    };
  }
}());
