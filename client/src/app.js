import * as angular from 'angular';

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
    addFlowerComponent
}
from "./components/addFlower/addFlowerComponent.js";

import {
    flowersTableComponent
}
from "./components/flowersTable/flowersTableComponent.js";


angular.module('flowersApp', [

    ])
    .factory('utilService', utilService).factory('operationService', operationService)
    .controller('MainAppController', MainAppController)
    .component('addFlowerComponent', addFlowerComponent)
    .component('flowersTableComponent', flowersTableComponent);
