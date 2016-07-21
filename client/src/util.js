const DRIED_FLOWER_TEXT = 'Flower is dried up!! ';
const RED_COLOR_BUTTON = 'red';

function showElement (classname) {
    document.getElementsByClassName(classname)[0].style.display = "block";
}

function hideElement (classname) {
    document.getElementsByClassName(classname)[0].style.display = "none";
}

 function createOperationButton (item, className, buttonText, markRed) {
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

 function deleteOldRows (parent) {
    let rows = document.getElementsByClassName('Row');

    while (rows[0]) {
        rows[0].parentNode.removeChild(rows[0]);
    }
}


/*
 * Check if flower exists in array
 */
function isFlowerNotExists(flowersArray, name) {
    for (let i = 0; i < flowersArray.length; i++) {
        if (flowersArray[i].name === name) {
            return true;
        }
    };
    return false;
}

function markWateringButton(rowToMark, text) {
    rowToMark.innerText = text;
    rowToMark.style.background = RED_COLOR_BUTTON;
}

function getMinutesBetweenDates (startDate, endDate) {
    let difference = startDate.getTime() - endDate.getTime();
    return Math.abs(difference / 60000);
}

/*
 * Check if flower is not dried up yet
 */
function isDriedUp (item) {
    let isLate = false;

    if (new Date() > (item.nextWateringDate.getTime() + (item.maxDivergence * 60000))) {
        isLate = true;
    }
    return isLate;
}

/*
 * Check if flower is not over watered
 */
 function isOverWatered (item) {
    let isOften = false;
    if (getMinutesBetweenDates(new Date(), new Date(item.lastWateringDate)) < (item.intervalToWater - item.minDivergence)) {
        isOften = true;
    }
    return isOften;
}


export {
    showElement,
    hideElement,
    createOperationButton,
    deleteOldRows,
    isFlowerNotExists,
    markWateringButton,
    getMinutesBetweenDates,
    isDriedUp,
    isOverWatered,
    DRIED_FLOWER_TEXT
}
