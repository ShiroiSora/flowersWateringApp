export function utilService() {

    const DRIED_FLOWER_TEXT = 'Flower is dried up!! ';
    const RED_COLOR_BUTTON = 'red';

    let util = {
        isFlowerNotExists: isFlowerNotExists,
        getMinutesBetweenDates: getMinutesBetweenDates,
        isDriedUp: isDriedUp,
        isOverWatered: isOverWatered,
        checkFlowerStatuses: checkFlowerStatuses,
    };
    return util;


    /*
     * Check if flower exists in array
     */
    function isFlowerNotExists(flowersArray, name) {
        if (flowersArray) {
            for (let i = 0; i < flowersArray.length; i++) {
                if (flowersArray[i].name === name) {
                    return true;
                }
            }
        }
        return false;
    }

    function getMinutesBetweenDates(startDate, endDate) {
        let difference = startDate.getTime() - endDate.getTime();
        return Math.abs(difference / 60000);
    }

    /*
     * Check if flower is not dried up yet
     */
    function isDriedUp(item) {
        let isLate = false;

        if (new Date() > (item.nextWateringDate.getTime() + (item.maxDivergence * 60000))) {
            isLate = true;
        }
        return isLate;
    }

    /*
     * Check if flower is not over watered
     */
    function isOverWatered (item){
        let isOften = false;
        if (util.getMinutesBetweenDates(new Date(), new Date(item.lastWateringDate)) < (item.intervalToWater - item.minDivergence)) {
            isOften = true;
        }
        return isOften;
    }

    function checkFlowerStatuses(flowersArray) {
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

}