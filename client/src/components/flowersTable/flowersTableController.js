export function flowersTableController($scope, operationService, $filter) {

    $scope.waterButtonHandler = (name) => {
        operationService.water($scope.flowersArray, name); //root
        $scope.$emit('flowersArrayChanged', $scope.flowersArray);
    }

    $scope.removeButtonHandler = (name) => {
        operationService.deleteFlower($scope.flowersArray, name); //root
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