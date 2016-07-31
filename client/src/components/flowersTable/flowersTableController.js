export function flowersTableController($scope, operationService, $filter, flowerResorce) {

    $scope.waterButtonHandler = (name) => {
        let flower = operationService.water($scope.flowersArray, name);
        flowerResorce.waterFlower(flower.name, flower.lastWateringDate, flower.nextWateringDate, flower.state);

        $scope.$emit('flowersArrayChanged', $scope.flowersArray);
    }

    $scope.removeButtonHandler = (name) => {
        operationService.deleteFlower($scope.flowersArray, name);
        flowerResorce.deleteFlower(name);

        $scope.$emit('flowersArrayChanged', $scope.flowersArray);
    }


    $scope.propertyName = 'name';
    $scope.reverse = true;
    $scope.flowersArray = $filter('orderBy')($scope.flowersArray, $scope.propertyName, $scope.reverse);

    $scope.sortBy = function(propertyName) {
        $scope.reverse = (propertyName !== null && $scope.propertyName === propertyName) ?
            !$scope.reverse : false;
        $scope.propertyName = propertyName;
        $scope.flowersArray = $filter('orderBy')($scope.flowersArray, $scope.propertyName, $scope.reverse);
    };


    $scope.$on('flowersArrayChanged', function(event, data) {
        $scope.flowersArray = data;
    });

}