import * as angular from 'angular';
import * as translate from 'angular-translate';
import "angular-resource";
import "angular-ui-router";
import "angular-animate";

import {
    MainAppController
}
from "./controllers/MainAppController.js";

import {
    utilService
}
from './services/util/utilService.js';

import {
    FlowersArrayHolder
}
from './services/flowersHolder/FlowersArrayHolder.js';

import {
    operationService
}
from './services/operation/operationService.js';

import {
    flowerResource
}
from './resources/flowerResource.js';

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
    changeLanguageComponent
}
from "./components/changeLanguage/changeLanguageComponent.js";

import {
    translation
}
from "./i18n/translation.js";

import {
    routing
}
from "./routing/routing.js";

angular.module('flowersApp', [
        'pascalprecht.translate', 'ngResource', 'ui.router','ngAnimate'
    ])
    .factory('utilService', utilService)
    .factory('operationService', operationService)
    .factory('FlowerEntry', FlowerEntry)
    .factory('flowerResource', flowerResource)
    .factory('FlowersArrayHolder', FlowersArrayHolder)

    .controller('MainAppController', MainAppController)
    .component('addFlowerComponent', addFlowerComponent)
    .component('flowersTableComponent', flowersTableComponent)
    .component('changeLanguageComponent', changeLanguageComponent)

    .constant('LANGUAGES', ['ru', 'en'])
    .constant('URL', 'https://ide.c9.io/soraneko/flowerswateringapp')

    .config(['$translateProvider', translation])
    .config(['$stateProvider', routing]);
