export function addFlowerController(operationService, flowerResource, FlowersArrayHolder) {

    let self = this;
    self.hideForm = true;

    self.addButtonHandler = addButtonHandler;
    self.submitFlower = submitFlower;

    function addButtonHandler() {
        self.hideForm = false;
    }

    function submitFlower(flower) {
        self.hideForm = true;

        let newFlower = operationService.addFlower(FlowersArrayHolder.getFlowersArray(), flower.name,
            flower.place, flower.interval, flower.minDivergence, flower.maxDivergence, flower.flowerImg);

        if (newFlower !== null) {
            flowerResource.addFlower(newFlower);
        }
    }

}