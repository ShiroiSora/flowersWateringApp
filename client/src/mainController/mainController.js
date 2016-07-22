import Flower from '../models/flower.js';
import * as util from '../services/util/util.js';

export function MainAppController($scope,$interval) {

    const SECONDS_TO_UPDATE = 30000;
    const FLOWERS_ARRAY = 'flowersArray';

    $scope.flowersArray = getFlowersFromLocalStrorage();

    $interval(util.checkFlowerStatuses($scope.flowersArray), SECONDS_TO_UPDATE);

    /*
     * Retrieve flowers array from local storage 
     */
    function getFlowersFromLocalStrorage() {
        let arr = JSON.parse(localStorage.getItem("flowersArray")) || [];
        let parsedFlowers = [];
        for (let i = 0; i < arr.length; i++) {
            parsedFlowers.push(Flower.fromJson(arr[i]));
        }

        return parsedFlowers;
    }
}