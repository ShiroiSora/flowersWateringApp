import {
    Flower
}
from '../models/Flower.js';

export function MainAppController($scope, $interval, utilService,localStorageService) {

    const SECONDS_TO_UPDATE = 30000;
    const FLOWERS_ARRAY = 'flowersArray';

    $scope.flowersArray = localStorageService.getFlowersFromLocalStrorage();
    $scope.$broadcast('flowersArrayChanged', $scope.flowersArray);


    $scope.$on('flowersArrayChanged', function(event, data) {
        $scope.flowersArray = data;
    });

    $interval(function() {
        utilService.checkFlowerStatuses($scope.flowersArray);
        $scope.$broadcast('flowersArrayChanged', $scope.flowersArray);
    }, SECONDS_TO_UPDATE);

  
}