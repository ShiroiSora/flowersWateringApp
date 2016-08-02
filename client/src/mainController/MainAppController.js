import {
    Flower
}
from '../models/Flower.js';

export function MainAppController($scope, $interval, utilService, localStorageService, flowerResorce) {

    const SECONDS_TO_UPDATE = 30000;
    const FLOWERS_ARRAY = 'flowersArray';

    flowerResorce.getFlowers().$promise.then((response) => {
      
       $scope.flowersArray = response;
       if(!$scope.flowersArray) {
           $scope.flowersArray = [];
       }
        $scope.$broadcast('flowersArrayChanged', $scope.flowersArray);

        $interval(function() {
            utilService.checkFlowerStatuses($scope.flowersArray);
            $scope.$broadcast('flowersArrayChanged', $scope.flowersArray);
        }, SECONDS_TO_UPDATE);

    }, function(errResponse) {
        console.error("Read flower list failed")
    });

}