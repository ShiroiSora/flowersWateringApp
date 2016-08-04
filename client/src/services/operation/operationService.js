import {
    Flower
}
from "../../models/Flower.js";

export function operationService(utilService) {

    let service = {
        addFlower: addFlower,
        water: water,
        waterFlower: waterFlower,
        deleteFlower: deleteFlower
    };

    return service;

    /*
     */
    function addFlower(flowersArray, name, place, intervalToWater, minDivergence, maxDivergence, flowerImg) {
        if (!utilService.isFlowerNotExists(flowersArray, name)) {

            let flower = new Flower(name, place, intervalToWater, minDivergence, maxDivergence,flowerImg);
            flowersArray.push(flower);
            return flower;
        }
        else {
            alert("Flower with name '" + name + "' already exists!");
            return null;
        }

    }

    /*
     * Change last watering date
     */
    function water(flowersArray, name) {
        if (utilService.isFlowerNotExists(flowersArray, name)) {
            let flower = waterFlower(flowersArray, name);

            alert(name + ' was watered!');
            return flower;
        }
        else {
            alert(name + ' was not found!');
            return null;
        }
    }


    /*
     * Update last watering date
     */
    function waterFlower(flowersArray, name) {
        let wateredFlower = {};
        flowersArray.forEach(function(item, i) {
            if (item.name === name) {

                item.state = "watered";

                if (utilService.isOverWatered(item)) {
                    item.state = "overWatered";
                }

                flowersArray[i].lastWateringDate = new Date();
                flowersArray[i].nextWateringDate = new Flower().getNextWateringDate(flowersArray[i].intervalToWater);
                wateredFlower = flowersArray[i];
            }
        });
        return wateredFlower || null;
    }


    /*
     * Delete flower from array and localstorage
     */

    function deleteFlower(flowersArray, name) {
        flowersArray.forEach(function(item, i) {
            if (item.name === name) {
                flowersArray.splice(flowersArray.indexOf(item), 1);
            }
        });
    }


}