import * as angular from 'angular';
import * as translate from 'angular-translate';

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
    LanguageController
}
from "./mainController/LanguageController.js";

let LANGUAGES = ['ru', 'en'];

angular.module('flowersApp', [
        'pascalprecht.translate'
    ])
    .factory('utilService', utilService)
    .factory('operationService', operationService)
    .factory('localStorageService', localStorageService)
    .factory('requestService', requestService)
    .controller('MainAppController', MainAppController)
    .controller('LanguageController', LanguageController)
    .component('addFlowerComponent', addFlowerComponent)
    .component('flowersTableComponent', flowersTableComponent)
    .constant('LANGUAGES', LANGUAGES)
    .constant('URL', 'https://js-classes-kucherenko.c9users.io')
    .config(['$translateProvider', translation]);