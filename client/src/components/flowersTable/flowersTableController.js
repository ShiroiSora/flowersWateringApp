import {
    operations
}
from "../../services/operation/operations.js";

export function flowersTableController($scope) {

    $scope.waterButtonHandler = (name) => {
        operations.water($scope.flowersArray, name);
    }

    $scope.removeButtonHandler = (name) => {
        operations.deleteFlower($scope.flowersArray, name);
    }
}