import {
    Flower
}
from "../../models/flower.js";

import util from '../util/util.js';


export default function() {
    const FLOWERS_ARRAY = 'flowersArray';

    this.saveToStorage = function(flowersArray, localStorage) {
        localStorage.setItem(FLOWERS_ARRAY, JSON.stringify(flowersArray));
    };


    /*
     * Add new flower
     */
    this.addFlower = function(flowersArray, localStorage, name, place, intervalToWater, minDivergence, maxDivergence) {
        if (!util.isFlowerNotExists(flowersArray, name)) {

            let flower = new Flower(name, place, intervalToWater, minDivergence, maxDivergence);
            flowersArray.push(flower);
            this.saveToStorage(flowersArray, localStorage);
        }
        else {
            alert("Flower with name '" + name + "' already exists!");
        }

    }

    /*
     * Change last watering date
     */
    this.water = function(flowersArray, name) {
        if (util.isFlowerNotExists(name)) {
            this.waterFlower(flowersArray, name);

            this.saveToStorage(flowersArray);
            alert(name + ' was watered!');
        }
        else {
            alert(name + ' was not found!');
        }
    }


    /*
     * Update last watering date
     */
    this.waterFlower = function(flowersArray, name) {
        flowersArray.forEach(function(item, i) {
            if (item.name === name) {

                item.state = "watered";

                if (util.isOverWatered(item)) {
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

    this.deleteFlower = function(flowersArray, name) {
        flowersArray.forEach(function(item, i) {
            if (item.name === name) {
                flowersArray.splice(flowersArray.indexOf(item), 1);
            }
        });
        this.saveToStorage(flowersArray);
    }

}