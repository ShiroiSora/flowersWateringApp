module.exports = function() {

    let utils = require("./util")();
    let Flower = require('./flower');

    let flowersArray = [];

    const SECONDS_TO_UPDATE = 30000;
    const DRIED_FLOWER_TEXT = 'Flower is dried up!! ';
    const OVER_WATERED_FLOWER_TEXT = 'You over watered this flower!';
    const GREY_COLOR_BUTTON = 'LightGrey';
    const RED_COLOR_BUTTON = 'red';
    const FLOWERS_ARRAY = 'flowersArray';

    /*
     * Retrieve flowers array from local storage 
     */
    let getFlowersFromLocalStrorage = () => {
        let arr = JSON.parse(localStorage.getItem(FLOWERS_ARRAY)) || [];
        let parsedFlowers = [];
        for (let i = 0; i < arr.length; i++) {
            parsedFlowers.push(Flower.fromJson(arr[i]));
        }

        return parsedFlowers;
    }

    /*
     * Add new flower
     */
    let addFlower = (name, place, intervalToWater, minDivergence, maxDivergence)=> {
        if (!utils.isFlowerNotExists(flowersArray, name)) {

            let flower = new Flower(name, place, intervalToWater, minDivergence, maxDivergence);
            flowersArray.push(flower);
            saveToStorage(flowersArray);

            print();
            registerEvents();
        }
        else {
            alert("Flower with name '" + name + "' already exists!");
        }

    }

    /*
     * Save flowers array to storage
     */
    let saveToStorage = function(flowersArray) {
        localStorage.setItem(FLOWERS_ARRAY, JSON.stringify(flowersArray));
    }

    /*
     * Print all flowers
     */
    let print = function() {
        let flowersDiv = document.getElementsByClassName('Table')[0];

        utils.deleteOldRows(flowersDiv);

        flowersArray.forEach(function(item, i, arr) {
            let flowerRow = document.createElement('div');
            flowerRow.setAttribute("class", "Row");


            for (let key in item) {
                if (item.hasOwnProperty(key)) {
                    let flowerCell = document.createElement('div');
                    flowerCell.setAttribute("class", "Cell");

                    flowerCell.innerText = item[key];
                    flowerRow.appendChild(flowerCell);
                }
            }

            let waterButton = utils.createOperationButton(item, "water-button", "Water this flower", true);
            flowerRow.appendChild(waterButton);

            let deleteButton = utils.createOperationButton(item, "delete-button", "Remove flower");
            flowerRow.appendChild(deleteButton);

            flowersDiv.appendChild(flowerRow);
        });
    }

    /*
     * Check if flowers need no be watered
     */
    let checkFlowerStatuses = function() {
        flowersArray.forEach(function(item, i) {
            let resultInMinutes = utils.getMinutesBetweenDates(new Date(), new Date(item.lastWateringDate));

            let rowToMark = document.querySelector('#' + item.name);
            if (resultInMinutes >= item.intervalToWater) {
                rowToMark.style.background = RED_COLOR_BUTTON;
            }
            if (utils.isDriedUp(item)) {
                utils.markWateringButton(rowToMark, DRIED_FLOWER_TEXT);
            }
        });
    }


    /*
     * Change last watering date
     */
    let water = function(name) {
        if (utils.isFlowerNotExists(name)) {
            waterFlower(name);

            saveToStorage(flowersArray);
            alert(name + ' was watered!');
        }
        else {
            alert(name + ' was not found!');
        }
        registerEvents();
    }


    /*
     * Update last watering date
     */
    let waterFlower = function(name) {
        flowersArray.forEach(function(item, i) {
            if (item.name === name) {

                let rowToMark = document.querySelector('#' + item.name);
                rowToMark.style.background = GREY_COLOR_BUTTON;

                if (utils.isOverWatered(item)) {
                    utils.markWateringButton(rowToMark, OVER_WATERED_FLOWER_TEXT);
                }

                flowersArray[i].lastWateringDate = new Date();
                flowersArray[i].nextWateringDate = new Flower().getNextWateringDate(flowersArray[i].intervalToWater);
            }
        });
    }


    /*
     * Delete flower from array and localstorage
     */

    let deleteFlower = function(name) {
        flowersArray.forEach(function(item, i) {
            if (item.name === name) {
                flowersArray.splice(flowersArray.indexOf(item), 1);
            }
        });
        registerEvents();
        saveToStorage(flowersArray);
    }

    // --------------------------------Events ----------------------------------

    let setOnWaterClickEvent = function() {
        let waterButtons = document.querySelectorAll('button.water-button');

        for (let i = 0; i < waterButtons.length; i++) {
            waterButtons[i].addEventListener("click", function() {
                water(this.id);
                print();
                registerEvents();
            }, true);
        }
    }

    let setOnDeleteClickEvent = function() {
        let deleteButtons = document.querySelectorAll('button.delete-button');

        for (let i = 0; i < deleteButtons.length; i++) {
            deleteButtons[i].addEventListener("click", function() {
                deleteFlower(this.id);
                print();
                registerEvents();
            }, true);
        }
    }

    let setOnAddFlowerSubmitEvent = function() {
        let submitAddFlower = document.querySelector('button.submit-add-flower');

        submitAddFlower.addEventListener("click", function() {

            let name = document.getElementsByName("name")[0].value;
            let place = document.getElementsByName("place")[0].value;
            let interval = document.getElementsByName("interval")[0].value;
            let minDivergence = document.getElementsByName("minDivergence")[0].value;
            let maxDivergence = document.getElementsByName("maxDivergence")[0].value;

            addFlower(name, place, interval, minDivergence, maxDivergence);
            utils.hideElement("add-flower-form");

        }, true);
    }

    let registerAddFlowerListener = function() {
        let addFlowerButton = document.querySelector('button.add-flower');

        addFlowerButton.addEventListener("click", function() {
            utils.showElement("add-flower-form");
        }, true);

    }

    let registerEvents = function() {

        //water button
        setOnWaterClickEvent();
        //delete button
        setOnDeleteClickEvent();

        //add flowers
        registerAddFlowerListener();
        setOnAddFlowerSubmitEvent();
    }

    // --------------------------------Events ----------------------------------

    return {
        init: function() {
            //get flowers from localStorage
            flowersArray = getFlowersFromLocalStrorage();

            //print array
            print();

            //register click events
            registerEvents();

            //check flower statuses every 30 sec
            setInterval(checkFlowerStatuses, SECONDS_TO_UPDATE);
        }
    }
}