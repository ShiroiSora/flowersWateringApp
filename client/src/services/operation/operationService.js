import {
    Flower
}
from "../../models/Flower.js";


export function operationService(utilService,localStorageService) {

    let operations = {};

    const FLOWERS_ARRAY = 'flowersArray';

    /*
     * Add new flower
     */
    operations.addFlower = function(flowersArray, localStorage, name, place, intervalToWater, minDivergence, maxDivergence) {
        if (!utilService.isFlowerNotExists(flowersArray, name)) {

            let flower = new Flower(name, place, intervalToWater, minDivergence, maxDivergence);
            flowersArray.push(flower);
            localStorageService.saveToStorage(flowersArray, localStorage);
        }
        else {
            alert("Flower with name '" + name + "' already exists!");
        }

    }

    /*
     * Change last watering date
     */
    operations.water = function(flowersArray, name) {
        if (utilService.isFlowerNotExists(flowersArray,name)) {
            operations.waterFlower(flowersArray, name);

            localStorageService.saveToStorage(flowersArray);
            alert(name + ' was watered!');
        }
        else {
            alert(name + ' was not found!');
        }
    }


    /*
     * Update last watering date
     */
    operations.waterFlower = function(flowersArray, name) {
        flowersArray.forEach(function(item, i) {
            if (item.name === name) {

                item.state = "watered";

                if (utilService.isOverWatered(item)) {
                    item.state = "overWatered";
                }

                flowersArray[i].lastWateringDate = new Date();
                flowersArray[i].nextWateringDate = new Flower().getNextWateringDate(flowersArray[i].intervalToWater);
            }
        });
    }


    /*
     * Delete flower from array and localstorage
     */

    operations.deleteFlower = function(flowersArray, name) {
        flowersArray.forEach(function(item, i) {
            if (item.name === name) {
                flowersArray.splice(flowersArray.indexOf(item), 1);
            }
        });
        localStorageService.saveToStorage(flowersArray);
    }

    return operations;

}