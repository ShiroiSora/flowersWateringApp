import * as angular from 'angular';
import * as translate from 'angular-translate';
import "angular-resource";
import "angular-ui-router";

import {
    MainAppController
}
from "./mainController/MainAppController.js";

import {
    utilService
}
from './services/util/utilService.js';

import {
    operationService
}
from './services/operation/operationService.js';

import {
    localStorageService
}
from './services/localStorage/localStorageService.js';

import {
    requestService
}
from './services/operation/requestService.js';

import {
    flowerResorce
}
from './services/operation/flowerResorce.js';

import {
    FlowerEntry
}

from './services/entries/FlowerEntry.js';

import {
    addFlowerComponent
}
from "./components/addFlower/addFlowerComponent.js";

import {
    flowersTableComponent
}
from "./components/flowersTable/flowersTableComponent.js";

import {
    translation
}
from "./i18n/translation.js";

import {
    routing
}
from "./routing/routing.js";

import {
    LanguageController
}
from "./mainController/LanguageController.js";

let LANGUAGES = ['ru', 'en'];

angular.module('flowersApp', [
        'pascalprecht.translate', 'ngResource', 'ui.router'
    ])
    .factory('utilService', utilService)
    .factory('operationService', operationService)
    .factory('localStorageService', localStorageService)
    .factory('requestService', requestService)
    .factory('FlowerEntry', FlowerEntry)
    .factory('flowerResorce', flowerResorce)
    
    .controller('MainAppController', MainAppController)
    .controller('LanguageController', LanguageController)
    .component('addFlowerComponent', addFlowerComponent)
    .component('flowersTableComponent', flowersTableComponent)
    
    .constant('LANGUAGES', LANGUAGES)
    .constant('URL', 'https://nodejs-soraneko.c9users.io')
    
    .config(['$translateProvider', translation])
    .config(['$stateProvider', routing]);
