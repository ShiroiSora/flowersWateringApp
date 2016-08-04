export function flowersTableController(operationService, $filter, flowerResource, FlowersArrayHolder) {

    let self = this;

    self.propertyName = 'name';
    self.reverse = true;
    self.sortBy = sort;

    self.flowersArray = $filter('orderBy')(FlowersArrayHolder.getFlowersArray(), self.propertyName, self.reverse);

    self.waterButtonHandler = water;
    self.removeButtonHandler = remove;

    function water(name) {
        let flower = operationService.water( self.flowersArray, name);
        flowerResource.waterFlower(flower.name, flower.lastWateringDate, flower.nextWateringDate, flower.state);
    }

    function remove(name) {
        operationService.deleteFlower( self.flowersArray, name);
        flowerResource.deleteFlower(name);
    }

    function sort(propertyName) {
        self.reverse = (propertyName !== null && self.propertyName === propertyName) ?
            !self.reverse : false;
        self.propertyName = propertyName;
        self.flowersArray = $filter('orderBy')(self.flowersArray, self.propertyName, self.reverse);
    };

}