export function addFlowerController($scope, operationService, flowerResorce) {
    $scope.hideForm = true;

    $scope.addButtonHandler = () => {
        $scope.hideForm = false;
    }

    $scope.submitAddButtonHandler = () => {
        $scope.hideForm = true;

        let flower = operationService.addFlower($scope.flowersArray, localStorage, $scope.name,
            $scope.place, $scope.interval, $scope.minDivergence, $scope.maxDivergence);
            
        if (flower !== null) {
            flowerResorce.addFlower(flower);
            $scope.$emit('flowersArrayChanged', $scope.flowersArray);
        }
    }

    $scope.$on('flowersArrayChanged', function(event, data) {
        $scope.flowersArray = data;
    });
}