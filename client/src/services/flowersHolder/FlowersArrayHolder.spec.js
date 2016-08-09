import {
    FlowersArrayHolder
}
from "./FlowersArrayHolder.js";

import {
    Flower
}
from "../../models/Flower.js";

describe('FlowersArrayHolder', () => {

    beforeEach(function() {
        this.testService = new FlowersArrayHolder();
    });

    describe('should parseResponse correctly', () => {
        it('should return parsed array', function() {
            let response = JSON.parse('[{"flowerImg": "","name":"rose1211111","place":"place","intervalToWater":17,"lastWateringDate":1469792602882,"minDivergence":8,"maxDivergence":1,"nextWateringDate":1469798020129,"state":"notWatered"}]');

            let parsedFlower = new Flower(
                'rose1211111',
                'place',
                17,
                8,
                1,
                ""
            );
            parsedFlower.lastWateringDate = new Date(1469792602882);
            parsedFlower.nextWateringDate = new Date(1469798020129);
            parsedFlower.state = 'watered';

            expect((this.testService.parseResponse(response))).toEqual(parsedFlower);
        });

    });

});