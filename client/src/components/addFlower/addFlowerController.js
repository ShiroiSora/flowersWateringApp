import {
    operations
}
from "../../services/operation/operations.js";

export function addFlowerController($scope) {
    $scope.hideForm = true;
    $scope.addButtonHandler = () => {
        $scope.hideForm = false;

    }

    $scope.submitAddButtonHandler = () => {
        $scope.hideForm = true;

        operations.addFlower($scope.flowersArray, localStorage, $scope.name, 
           $scope.place, $scope.interval, $scope.minDivergence, $scope.maxDivergence);
    }
}