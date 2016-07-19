module.exports = function() {

    const DRIED_FLOWER_TEXT = 'Flower is dried up!! ';
    const RED_COLOR_BUTTON = 'red';

    let showElement = function(classname) {
        document.getElementsByClassName(classname)[0].style.display = "block";
    }

    let hideElement = function(classname) {
        document.getElementsByClassName(classname)[0].style.display = "none";
    }

    let createOperationButton = function(item, className, buttonText, markRed) {
        let cellButton = document.createElement("div");
        cellButton.setAttribute("class", "Cell");

        let button = document.createElement("button");
        button.setAttribute("id", item.name);
        button.setAttribute("class", className);
        button.innerText = buttonText;

        if (markRed) {
            let resultInMinutes = getMinutesBetweenDates(new Date(), new Date(item.lastWateringDate));
            if (resultInMinutes >= item.intervalToWater) {
                button.style.background = RED_COLOR_BUTTON;
            }
            if (isDriedUp(item)) {
                markWateringButton(button, DRIED_FLOWER_TEXT);
            }
        }
        cellButton.appendChild(button);
        return cellButton;
    }

    let deleteOldRows = function(parent) {
        let rows = document.getElementsByClassName('Row');

        while (rows[0]) {
            rows[0].parentNode.removeChild(rows[0]);
        }
    }


    /*
     * Check if flower exists in array
     */
    let isFlowerNotExists = function(flowersArray, name) {
        for (let i = 0; i < flowersArray.length; i++) {
            if (flowersArray[i].name === name) {
                return true;
            }
        };
        return false;
    }

    let markWateringButton = function(rowToMark, text) {
        rowToMark.innerText = text;
        rowToMark.style.background = RED_COLOR_BUTTON;
    }

    let getMinutesBetweenDates = function(startDate, endDate) {
        let difference = startDate.getTime() - endDate.getTime();
        return Math.abs(difference / 60000);
    }

    /*
     * Check if flower is not dried up yet
     */
    let isDriedUp = function(item) {
        let isLate = false;

        if (new Date() > (item.nextWateringDate.getTime() + (item.maxDivergence * 60000))) {
            isLate = true;
        }
        return isLate;
    }

    /*
     * Check if flower is not over watered
     */
    let isOverWatered = function(item) {
        let isOften = false;
        if (getMinutesBetweenDates(new Date(), new Date(item.lastWateringDate)) < (item.intervalToWater - item.minDivergence)) {
            isOften = true;
        }
        return isOften;
    }


    return {
        showElement: showElement,
        hideElement: hideElement,
        createOperationButton: createOperationButton,
        deleteOldRows: deleteOldRows,
        isFlowerNotExists: isFlowerNotExists,
        markWateringButton: markWateringButton,
        getMinutesBetweenDates: getMinutesBetweenDates,
        isDriedUp: isDriedUp,
        isOverWatered: isOverWatered
    };

}