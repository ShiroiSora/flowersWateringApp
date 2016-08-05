import {
    Flower
}
from "../../models/Flower.js";

export function FlowersArrayHolder() {

    const FLOWERS_ARRAY = 'flowersArray';
    let array = [];

    let holder = {
        getFlowersArray: getFlowersArray,
        parseResponse: parseResponse
    };
    return holder;
    

    function getFlowersArray() {
        return array;
    }

    function parseResponse(response) {
        for (let i = 0; i < response.length; i++) {
            array.push(Flower.fromJson(response[i]));
        }
        return array;
    }

}