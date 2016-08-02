export function addFlowerController($scope, operationService, flowerResorce) {
    let self = this;
    self.hideForm = true;

    self.addButtonHandler = () => {
        self.hideForm = false;
    }

    self.submitFlower = (flower) => {
        self.hideForm = true;

        let newFlower = operationService.addFlower(self.flowersArray, flower.name,
            flower.place, flower.interval, flower.minDivergence, flower.maxDivergence);
 
         if (newFlower !== null) {
            flowerResorce.addFlower(newFlower);
            $scope.$emit('flowersArrayChanged', self.flowersArray);
        }
    }

    $scope.$on('flowersArrayChanged', function(event, data) {
        self.flowersArray = data;
    });
}