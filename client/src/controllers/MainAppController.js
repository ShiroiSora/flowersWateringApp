export function MainAppController($interval, utilService, flowerResource, FlowersArrayHolder) {

    const SECONDS_TO_UPDATE = 30000;
    var self = this;
    
    let response = '[{"flowerImg": "http://cveti-mogilev.by/tovari/1424078017.jpg", "name":"rose1211111","place":"place","intervalToWater":17,"lastWateringDate":1469792602882,"minDivergence":8,"maxDivergence":1,"nextWateringDate":1469798020129,"state":"notWatered"},{"flowerImg": "http://www.green-street.ru/images/all_photo/img_10001.jpg","name":"gdfgdfg","place":"fdgfdgd","intervalToWater":12,"lastWateringDate":1469801137726,"minDivergence":1,"maxDivergence":1,"nextWateringDate":1469801857738,"state":"watered"},{"flowerImg": "http://cvetomania.by/images/stories/virtuemart/product/3---gerbera.jpg", "name":"gerbera","place":"fdgfdgd","intervalToWater":12,"lastWateringDate":"2016-07-29T14:05:37.726Z","minDivergence":1,"maxDivergence":1,"nextWateringDate":"2016-07-29T14:17:37.726Z","state":"watered"}]';
   
    FlowersArrayHolder.parseResponse(response);

// activateFlowers();
//  function activateFlowers(){return   flowerResource.getFlowers().$promise.then((response) => {

//           FlowersArrayHolder.parseResponse(response);

//             $interval(function() {
//                 utilService.checkFlowerStatuses(FlowersArrayHolder.getFlowersArray());
//             }, SECONDS_TO_UPDATE);

//         },
//         function(errResponse) {
//             console.error("Read flower list failed");
//         });
//  }

    $interval(function() {
        utilService.checkFlowerStatuses(FlowersArrayHolder.getFlowersArray());
    }, SECONDS_TO_UPDATE);

}