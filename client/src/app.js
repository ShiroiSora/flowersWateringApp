
import * as angular from 'angular';

import {
    MainAppController
}
from "./mainController/mainController.js";

import {
    addFlowerComponent
}
from "./components/addFlower/addFlowerComponent.js";

import {
    flowersTableComponent
}
from "./components/flowersTable/flowersTableComponent.js";


angular.module('flowersApp', [

    ]).controller('MainAppController', MainAppController)
     .directive('flowersTableComponent', flowersTableComponent)
     .directive('addFlowerComponent', addFlowerComponent)

    
