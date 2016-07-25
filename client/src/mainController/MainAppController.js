import {
    Flower
}
from '../models/Flower.js';

export function MainAppController($scope, $interval, utilService) {

    const SECONDS_TO_UPDATE = 30000;
    const FLOWERS_ARRAY = 'flowersArray';

    $scope.flowersArray = getFlowersFromLocalStrorage();
    $scope.$broadcast('flowersArrayChanged', $scope.flowersArray);


    $scope.$on('flowersArrayChanged', function(event, data) {
        $scope.flowersArray = data;
    });

    $interval(function() {
        utilService.checkFlowerStatuses($scope.flowersArray);
        $scope.$broadcast('flowersArrayChanged', $scope.flowersArray);
    }, SECONDS_TO_UPDATE);

    /*
     * Retrieve flowers array from local storage 
     */
    function getFlowersFromLocalStrorage() {
        let arr = JSON.parse(localStorage.getItem("flowersArray")) || [];
        let parsedFlowers = [];
        for (let i = 0; i < arr.length; i++) {
            parsedFlowers.push(Flower.fromJson(arr[i]));
        }

        return parsedFlowers;
    }
}