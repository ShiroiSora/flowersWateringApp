'use strict'

import {
    utilService
}
from './utilService';

describe('utilService', () => {

    beforeEach(function() {
        this.testService = new utilService();
    });

    describe('should check if flower exists or not', () => {
        it('should return false when flower does not exist in array', function() {
            let array = [{
                name: "rose"
            }, {
                name: "tulip"
            }, {
                name: "violet"
            }];
            expect(this.testService.isFlowerNotExists(array, "Anemone")).toBe(false);
        });
        it('should return true when flower exists in array', function() {
            let array = [{
                name: "rose"
            }, {
                name: "tulip"
            }, {
                name: "violet"
            }];
            expect(this.testService.isFlowerNotExists(array, "tulip")).toBe(true);
        });
    });

    describe('should return difference in minutes between two dates', () => {

        it('should return correct diff in min between dates', function() {

            let firstDate = new Date(2016, 7, 8, 12, 54, 0, 0);
            let secondDate = new Date(2016, 7, 8, 13, 4, 0, 0);
            let diffInMinutes = 10;

            expect(this.testService.getMinutesBetweenDates(firstDate, secondDate)).toBe(diffInMinutes);
        });
    });

    describe('should check if flower is dried up or not', () => {

        it('should return true when flower is dried up', function() {

            let maxDivergence = 3;
            let moreThanMaxDivergence = maxDivergence + 1;

            let nextWateringDate = new Date();
            nextWateringDate.setMinutes(nextWateringDate.getMinutes() - moreThanMaxDivergence);

            let flower = {
                name: "someFlower",
                place: "somePlace",
                intervalToWater: 10,
                minDivergence: 2,
                maxDivergence: maxDivergence,
                flowerImg: '',
                nextWateringDate: nextWateringDate
            }

            expect(this.testService.isDriedUp(flower)).toBe(true);
        });

        it('should return false when flower is not dried up yet', function() {
            let maxDivergence = 3;

            let nextWateringDate = new Date();
            nextWateringDate.setMinutes(nextWateringDate.getMinutes() + maxDivergence);

            let flower = {
                name: "someFlower",
                place: "somePlace",
                intervalToWater: 10,
                minDivergence: 2,
                maxDivergence: maxDivergence,
                flowerImg: '',
                nextWateringDate: nextWateringDate
            }

            expect(this.testService.isDriedUp(flower)).toBe(false);
        });
    });

    describe('should check if flower is over watered up or not', () => {

        it('should return true when flower is over watered', function() {

            let lastWateringDate = new Date();
            lastWateringDate.setMinutes(lastWateringDate.getMinutes() - 1);

            let flower = {
                name: "someFlower",
                place: "somePlace",
                intervalToWater: 10,
                minDivergence: 2,
                maxDivergence: 3,
                flowerImg: '',
                nextWateringDate: new Date(),
                lastWateringDate: lastWateringDate
            }

            expect(this.testService.isOverWatered(flower)).toBe(true);
        });


    });
});