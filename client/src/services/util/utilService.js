export function utilService() {

    let util = {};

    const DRIED_FLOWER_TEXT = 'Flower is dried up!! ';
    const RED_COLOR_BUTTON = 'red';

    /*
     * Check if flower exists in array
     */
    util.isFlowerNotExists = function(flowersArray, name) {
        if(flowersArray) {
            for (let i = 0; i < flowersArray.length; i++) {
                if (flowersArray[i].name === name) {
                    return true;
                }
            };
        }
        return false;
    }

    util.getMinutesBetweenDates = function(startDate, endDate) {
        let difference = startDate.getTime() - endDate.getTime();
        return Math.abs(difference / 60000);
    }

    /*
     * Check if flower is not dried up yet
     */
    util.isDriedUp = function(item) {
        let isLate = false;

        if (new Date() > (item.nextWateringDate.getTime() + (item.maxDivergence * 60000))) {
            isLate = true;
        }
        return isLate;
    }

    /*
     * Check if flower is not over watered
     */
    util.isOverWatered = function(item) {
        let isOften = false;
        if (util.getMinutesBetweenDates(new Date(), new Date(item.lastWateringDate)) < (item.intervalToWater - item.minDivergence)) {
            isOften = true;
        }
        return isOften;
    }

    util.checkFlowerStatuses = function(flowersArray) {
        flowersArray.forEach(function(item, i) {
            let resultInMinutes = util.getMinutesBetweenDates(new Date(), new Date(item.lastWateringDate));

            if (resultInMinutes >= item.intervalToWater) {
                item.state = "notWatered";
            }
            if (util.isDriedUp(item)) {
                item.state = "driedUp";
            }
        });
    }

   return util;

}