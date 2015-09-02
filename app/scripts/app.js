'use strict';

/**
 * @ngdoc overview
 * @name hwrChatApp
 * @description
 * # hwrChatApp
 *
 * Main module of the application.
 */
angular
  .module('hwrChatApp', [
    'ngCookies',
    'ui.router',
    'ngMaterial',
    'LocalStorageModule',
    'luegg.directives',
    'sun.scrollable',
    'pascalprecht.translate',
    'ngEmbed',
    'ngEmoticons',
    'lumx',
    'restangular'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $windowProvider, $mdThemingProvider, $translateProvider, $httpProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl('http://localhost:3000/api/');

    // Wenn Bildschirm Breite kleiner als 600px, dann mobile Ansicht
    $stateProvider
      .state('layout_small', {
        templateUrl: 'views/layout/' + ($windowProvider.$get().innerWidth < 600 ? 'mobile' : 'desktop') + '.html'
      })
      .state('layout_2screens', {
        templateUrl: 'views/layout/2screen_' + ($windowProvider.$get().innerWidth < 600 ? 'mobile' : 'desktop') + '.html'
      })
      .state('layout_small.login', {
        url: '/login',
        views: {
          content: {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
          },
          submenu: {
            templateUrl: 'views/subMenu.html'
          }
        }
      })
      .state('layout_small.register', {
        url: '/register',
        views: {
          content: {
            templateUrl: 'views/register.html',
            controller: 'RegisterCtrl'
          }
        }
      })
      .state('layout_small.newchat', {
        url: '/newchat',
        views: {
          content: {
            templateUrl: 'views/newChat.html',
            controller: 'NewChatCtrl'
          }
        }
      })
      .state('layout_small.newchatDialog', {
        url: '/newchatDialog',
        views: {
          content: {
            templateUrl: 'views/newChatDialog.html',
            controller: 'NewChatCtrl'
          }
        }
      })
      .state('layout_small.newgroup', {
        url: '/newgroup',
        views: {
          content: {
            templateUrl: 'views/newGroup.html',
            controller: 'NewGroupCtrl'
          }
        }
      })
      .state('layout_small.groupname', {
        url: '/groupname',
        views: {
          content: {
            templateUrl: 'views/groupname.html',
            controller: 'GroupnameCtrl'
          }
        }
      })
      .state('layout_2screens.contacts', {
        url: '/chat',
        views: {
          left: {
            templateUrl: 'views/contacts.html',
            controller: 'ContactsCtrl'
          },
          single: {
            templateUrl: 'views/contacts.html',
            controller: 'ContactsCtrl'
          }
        }
      })
      .state('layout_2screens.chat', {
        url: '/chat/:id',
        views: {
          left: {
            templateUrl: 'views/contacts.html',
            controller: 'ContactsCtrl'
          },
          right: {
            templateUrl: 'views/chat.html',
            controller: 'ChatCtrl'
          },
          single: {
            templateUrl: 'views/chat.html',
            controller: 'ChatCtrl'
          }
        }
      })
      .state('layout_small.forgotpassword', {
        url: '/password',
        views: {
          content: {
            templateUrl: 'views/forgotPassword.html',
            controller: 'ForgotPasswordCtrl'
          }
        }
      })
      .state('layout_small.info', {
        url: '/info',
        views: {
          content: {
            templateUrl: 'views/info.html',
            controller: 'InfoCtrl'
          }
        }
      })
      .state('layout_small.settings', {
        url: '/settings',
        views: {
          content: {
            templateUrl: 'views/settings.html',
            controller: 'SettingsCtrl'
          }
        }
      })
      .state('layout_small.confirm', {
        url: '/confirm',
        views: {
          content: {
            templateUrl: 'views/confirm.html',
            controller: 'ConfirmCtrl'
          }
        }
      })
      .state('layout_small.deleteaccount', {
        url: '/deleteaccount',
        views: {
          content: {
            templateUrl: 'views/deleteaccount.html',
            controller: 'DeleteaccountCtrl'
          }
        }
      })
      .state('layout_small.changepw', {
        url: '/changepw',
        views: {
          content: {
            templateUrl: 'views/changepw.html',
            controller: 'ChangepwCtrl'
          }
        }
      })
      .state('layout_small.renamechat', {
        url: '/renamechat',
        views: {
          content: {
            templateUrl: 'views/renamechat.html',
            controller: 'RenamechatCtrl'
          }
        }
      });



    // for any unmatched url:
    $urlRouterProvider.otherwise('/login');

    $translateProvider.useStaticFilesLoader({
      prefix: 'lang/',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('de_DE');

    $translateProvider.useLocalStorage();

    $mdThemingProvider.theme('default')
      .primaryPalette('red');
  })

  .run(function ($rootScope, $window, screenService, $mdDialog, scrollableConfig, userService) {
    userService.setHeader();
    scrollableConfig.template = '<div class="{nanoClass}" ><div class="{contentClass}" scroll-glue ng-transclude></div></div>';
    var dialogOpen = false;

    screenService.setMobileView(screenService.shouldMobileView());
    $rootScope.$watch(function () {
      return screenService.width();
    }, function (newWidth, oldWith) {
      if (!dialogOpen) {
        // Der letzte Screen hatte den richtigen Screen für seine Größe?
        if (screenService.isMobileView() === screenService.shouldMobileViewByWidth(oldWith)) {
          // Wenn der Screen aber nicht mehr passt, dann frage mal nach!
          if (screenService.isMobileView() !== screenService.shouldMobileView()) {
            var confirmChangeView = $mdDialog.confirm()
              .title('ansicht wechseln zu ' + (screenService.shouldMobileView() ? 'mobile' : 'desktop'))
              .ok('Ja')
              .cancel('nein');

            dialogOpen = true;
            $mdDialog.show(confirmChangeView).then(function () {
              dialogOpen = false;
              $window.location.reload();
            }, function () {
              dialogOpen = false;
            });
          }
        }
      }
    });
  })

