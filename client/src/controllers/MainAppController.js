export function MainAppController($interval, utilService, flowerResource, FlowersArrayHolder) {

    const SECONDS_TO_UPDATE = 30000;
    var self = this;

activateFlowers();

 function activateFlowers(){return   flowerResource.getFlowers().$promise.then((response) => {
          FlowersArrayHolder.parseResponse(response);

            $interval(function() {
                utilService.checkFlowerStatuses(FlowersArrayHolder.getFlowersArray());
            }, SECONDS_TO_UPDATE);

        },
        function(errResponse) {
            console.error("Read flower list failed");
        });
 }

    $interval(function() {
        utilService.checkFlowerStatuses(FlowersArrayHolder.getFlowersArray());
    }, SECONDS_TO_UPDATE);

}