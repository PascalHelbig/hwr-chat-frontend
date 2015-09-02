'use strict';

/**
 * @ngdoc function
 * @name hwrChatApp.controller:ConfirmCtrl
 * @description
 * # ConfirmCtrl
 * Controller of the hwrChatApp
 */
angular.module('hwrChatApp')
  .controller('ConfirmCtrl', function ($scope, chatBuildRefactorService, httpService, $mdToast, $state) {

    $scope.deleteAccount = {pw: ''};


    /**
     * Nachgehaltene Daten aus settings.html per chatBuildRefactorService.getChangeUserData bereitstellen
     * und für Backendabfragen nutzen
     * ACHTUNG wenn Weiterleitung zeigt Fehler an sobald ein Wert nicht geändert wird
     * Die geänderten Daten werden aber Trotzdem geändert
     * Leider mit dem bestehenden backend nicht anders möglich
     */
    $scope.confirm = function () {
      var changedData = null;
      if ($scope.deleteAccount.pw === '1234'){
      changedData = chatBuildRefactorService.getChangeUserData();
        console.log(changedData);
      }

      if ($scope.deleteAccount.pw === '1234') {
        httpService('edit', {
          what: 'nachname',
          new: changedData.nachname
        });
        httpService('edit', {
          what: 'vorname',
          new: changedData.vorname
        });
        httpService('edit', {
          what: 'telefon',
          new: changedData.telefon
        });
        httpService('edit', {
          what: 'verhaeltnis',
          new: changedData.verhaeltnis
        }).then(function(){
          $mdToast.showSimple('Änderungen erfolgreich');
          $state.go('layout_small.settings');
        }, function () {
          $mdToast.showSimple('Fehler!');
          $state.go('layout_small.settings');
        });
      }
      else{
        $mdToast.showSimple('Passwort falsch!');
      }
    };
  });

