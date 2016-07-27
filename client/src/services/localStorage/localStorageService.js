import {
    Flower
}
from "../../models/Flower.js";

export function localStorageService() {

    let storageService = {};

    const FLOWERS_ARRAY = 'flowersArray';

    storageService.saveToStorage = function(flowersArray) {
        localStorage.setItem(FLOWERS_ARRAY, JSON.stringify(flowersArray));
    };

    /*
     * Retrieve flowers array from local storage 
     */
    storageService.getFlowersFromLocalStrorage = function() {
        let arr = JSON.parse(localStorage.getItem("flowersArray")) || [];
        let parsedFlowers = [];
        for (let i = 0; i < arr.length; i++) {
            parsedFlowers.push(Flower.fromJson(arr[i]));
        }

        return parsedFlowers;
    }
    
  return  storageService;
}