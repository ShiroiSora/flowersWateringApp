export function addFlowerController( $scope, operationService) {
    $scope.hideForm = true;

    $scope.addButtonHandler = () => {
        $scope.hideForm = false;
    }

    $scope.submitAddButtonHandler = () => {
        $scope.hideForm = true;

        operationService.addFlower($scope.flowersArray, localStorage, $scope.name,
            $scope.place, $scope.interval, $scope.minDivergence, $scope.maxDivergence);

        $scope.$emit('flowersArrayChanged', $scope.flowersArray);
    }

    $scope.$on('flowersArrayChanged', function(event, data) {
        $scope.flowersArray = data;
    });
}