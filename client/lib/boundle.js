(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App = function () {

	return {
		init: function () {
			let wateringModule = require("./watering.js");
			wateringModule().init();
		}
	};
}();

//init the global module after DOM is loaded
document.onload = App.init();

},{"./watering.js":4}],2:[function(require,module,exports){
module.exports = class Flower {

    constructor(name, place, intervalToWater, minDivergence, maxDivergence) {
        this.name = name;
        this.place = place;
        this.intervalToWater = intervalToWater; //in minutes
        this.lastWateringDate = new Date();
        this.minDivergence = minDivergence;
        this.maxDivergence = maxDivergence;
        this.nextWateringDate = this.getNextWateringDate(intervalToWater);
    }

    getNextWateringDate(intervalToWater) {
        var nextWateringDate = new Date();
        nextWateringDate.setMinutes(+nextWateringDate.getMinutes() + +intervalToWater);
        return nextWateringDate;
    }

    toJSON() {
        return {
            name: this.name,
            place: this.place,
            intervalToWater: this.intervalToWater,
            lastWateringDate: this.lastWateringDate.getTime(),
            minDivergence: this.minDivergence,
            maxDivergence: this.maxDivergence,
            nextWateringDate: this.getNextWateringDate(this.intervalToWater).getTime()
        };
    }

    static fromJson(obj) {
        var flower = new Flower(obj.name, obj.place, obj.intervalToWater, obj.minDivergence, obj.maxDivergence);

        flower.lastWateringDate = new Date(obj.lastWateringDate);
        flower.nextWateringDate = new Date(obj.nextWateringDate);

        return flower;
    }
};

},{}],3:[function(require,module,exports){
module.exports = function () {

    const DRIED_FLOWER_TEXT = 'Flower is dried up!! ';
    const RED_COLOR_BUTTON = 'red';

    let showElement = function (classname) {
        document.getElementsByClassName(classname)[0].style.display = "block";
    };

    let hideElement = function (classname) {
        document.getElementsByClassName(classname)[0].style.display = "none";
    };

    let createOperationButton = function (item, className, buttonText, markRed) {
        var cellButton = document.createElement("div");
        cellButton.setAttribute("class", "Cell");

        var button = document.createElement("button");
        button.setAttribute("id", item.name);
        button.setAttribute("class", className);
        button.innerText = buttonText;

        if (markRed) {
            var resultInMinutes = getMinutesBetweenDates(new Date(), new Date(item.lastWateringDate));
            if (resultInMinutes >= item.intervalToWater) {
                button.style.background = RED_COLOR_BUTTON;
            }
            if (isDriedUp(item)) {
                markWateringButton(button, DRIED_FLOWER_TEXT);
            }
        }
        cellButton.appendChild(button);
        return cellButton;
    };

    function deleteOldRows(parent) {
        var rows = document.getElementsByClassName('Row');

        while (rows[0]) {
            rows[0].parentNode.removeChild(rows[0]);
        }
    }

    /*
     * Check if flower exists in array
     */
    let isFlowerNotExists = function (flowersArray, name) {
        for (var i = 0; i < flowersArray.length; i++) {
            if (flowersArray[i].name === name) {
                return true;
            }
        };
        return false;
    };

    let markWateringButton = function (rowToMark, text) {
        rowToMark.innerText = text;
        rowToMark.style.background = RED_COLOR_BUTTON;
    };

    let getMinutesBetweenDates = function (startDate, endDate) {
        var difference = startDate.getTime() - endDate.getTime();
        return Math.abs(difference / 60000);
    };

    /*
     * Check if flower is not dried up yet
     */
    let isDriedUp = function (item) {
        var isLate = false;

        if (new Date() > item.nextWateringDate.getTime() + item.maxDivergence * 60000) {
            isLate = true;
        }
        return isLate;
    };

    /*
     * Check if flower is not over watered
     */
    let isOverWatered = function (item) {
        var isOften = false;
        if (getMinutesBetweenDates(new Date(), new Date(item.lastWateringDate)) < item.intervalToWater - item.minDivergence) {
            isOften = true;
        }
        return isOften;
    };

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
};

},{}],4:[function(require,module,exports){
module.exports = function () {

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
    let getFlowersFromLocalStrorage = function () {
        let arr = JSON.parse(localStorage.getItem(FLOWERS_ARRAY)) || [];
        let parsedFlowers = [];
        for (let i = 0; i < arr.length; i++) {
            parsedFlowers.push(Flower.fromJson(arr[i]));
        }

        return parsedFlowers;
    };

    /*
     * Add new flower
     */
    let addFlower = function (name, place, intervalToWater, minDivergence, maxDivergence) {
        if (!utils.isFlowerNotExists(flowersArray, name)) {

            let flower = new Flower(name, place, intervalToWater, minDivergence, maxDivergence);
            flowersArray.push(flower);
            saveToStorage(flowersArray);

            print();
            registerEvents();
        } else {
            alert("Flower with name '" + name + "' already exists!");
        }
    };

    /*
     * Save flowers array to storage
     */
    let saveToStorage = function (flowersArray) {
        localStorage.setItem(FLOWERS_ARRAY, JSON.stringify(flowersArray));
    };

    /*
     * Print all flowers
     */
    let print = function () {
        let flowersDiv = document.getElementsByClassName('Table')[0];

        utils.deleteOldRows(flowersDiv);

        flowersArray.forEach(function (item, i, arr) {
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
    };

    /*
     * Check if flowers need no be watered
     */
    let checkFlowerStatuses = function () {
        flowersArray.forEach(function (item, i) {
            let resultInMinutes = utils.getMinutesBetweenDates(new Date(), new Date(item.lastWateringDate));

            let rowToMark = document.querySelector('#' + item.name);
            if (resultInMinutes >= item.intervalToWater) {
                rowToMark.style.background = RED_COLOR_BUTTON;
            }
            if (utils.isDriedUp(item)) {
                utils.markWateringButton(rowToMark, DRIED_FLOWER_TEXT);
            }
        });
    };

    /*
     * Change last watering date
     */
    let water = function (name) {
        if (utils.isFlowerNotExists(name)) {
            waterFlower(name);

            saveToStorage(flowersArray);
            alert(name + ' was watered!');
        } else {
            alert(name + ' was not found!');
        }
        registerEvents();
    };

    /*
     * Update last watering date
     */
    let waterFlower = function (name) {
        flowersArray.forEach(function (item, i) {
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
    };

    /*
     * Delete flower from array and localstorage
     */

    let deleteFlower = function (name) {
        flowersArray.forEach(function (item, i) {
            if (item.name === name) {
                flowersArray.splice(flowersArray.indexOf(item), 1);
            }
        });
        registerEvents();
        saveToStorage(flowersArray);
    };

    // --------------------------------Events ----------------------------------

    let setOnWaterClickEvent = function () {
        let waterButtons = document.querySelectorAll('button.water-button');

        for (let i = 0; i < waterButtons.length; i++) {
            waterButtons[i].addEventListener("click", function () {
                water(this.id);
                print();
                registerEvents();
            }, true);
        }
    };

    let setOnDeleteClickEvent = function () {
        let deleteButtons = document.querySelectorAll('button.delete-button');

        for (let i = 0; i < deleteButtons.length; i++) {
            deleteButtons[i].addEventListener("click", function () {
                deleteFlower(this.id);
                print();
                registerEvents();
            }, true);
        }
    };

    let setOnAddFlowerSubmitEvent = function () {
        let submitAddFlower = document.querySelector('button.submit-add-flower');

        submitAddFlower.addEventListener("click", function () {

            let name = document.getElementsByName("name")[0].value;
            let place = document.getElementsByName("place")[0].value;
            let interval = document.getElementsByName("interval")[0].value;
            let minDivergence = document.getElementsByName("minDivergence")[0].value;
            let maxDivergence = document.getElementsByName("maxDivergence")[0].value;

            addFlower(name, place, interval, minDivergence, maxDivergence);
            utils.hideElement("add-flower-form");
        }, true);
    };

    let registerAddFlowerListener = function () {
        let addFlowerButton = document.querySelector('button.add-flower');

        addFlowerButton.addEventListener("click", function () {
            utils.showElement("add-flower-form");
        }, true);
    };

    let registerEvents = function () {

        //water button
        setOnWaterClickEvent();
        //delete button
        setOnDeleteClickEvent();

        //add flowers
        registerAddFlowerListener();
        setOnAddFlowerSubmitEvent();
    };

    // --------------------------------Events ----------------------------------

    return {
        init: function () {
            //get flowers from localStorage
            flowersArray = getFlowersFromLocalStrorage();

            //print array
            print();

            //register click events
            registerEvents();

            //check flower statuses every 30 sec
            setInterval(checkFlowerStatuses, SECONDS_TO_UPDATE);
        }
    };
};

},{"./flower":2,"./util":3}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvc3JjL2FwcC5qcyIsImNsaWVudC9zcmMvZmxvd2VyLmpzIiwiY2xpZW50L3NyYy91dGlsLmpzIiwiY2xpZW50L3NyYy93YXRlcmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLElBQUksTUFBTyxZQUFXOztBQUVyQixRQUFPO0FBQ04sUUFBTSxZQUFXO0FBQ2hCLE9BQUksaUJBQWlCLFFBQVEsZUFBUixDQUFyQjtBQUNBLG9CQUFpQixJQUFqQjtBQUNBO0FBSkssRUFBUDtBQU1BLENBUlMsRUFBVjs7QUFVQTtBQUNBLFNBQVMsTUFBVCxHQUFrQixJQUFJLElBQUosRUFBbEI7OztBQ1hDLE9BQU8sT0FBUCxHQUFpQixNQUFNLE1BQU4sQ0FBYTs7QUFFMUIsZ0JBQVksSUFBWixFQUFrQixLQUFsQixFQUF5QixlQUF6QixFQUEwQyxhQUExQyxFQUF5RCxhQUF6RCxFQUF3RTtBQUNwRSxhQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsYUFBSyxLQUFMLEdBQWEsS0FBYjtBQUNBLGFBQUssZUFBTCxHQUF1QixlQUF2QixDQUF3QztBQUN4QyxhQUFLLGdCQUFMLEdBQXdCLElBQUksSUFBSixFQUF4QjtBQUNBLGFBQUssYUFBTCxHQUFxQixhQUFyQjtBQUNBLGFBQUssYUFBTCxHQUFxQixhQUFyQjtBQUNBLGFBQUssZ0JBQUwsR0FBd0IsS0FBSyxtQkFBTCxDQUF5QixlQUF6QixDQUF4QjtBQUNIOztBQUVELHdCQUFvQixlQUFwQixFQUFxQztBQUNqQyxZQUFJLG1CQUFtQixJQUFJLElBQUosRUFBdkI7QUFDQSx5QkFBaUIsVUFBakIsQ0FBOEIsQ0FBQyxpQkFBaUIsVUFBakIsRUFBSCxHQUFzQyxDQUFDLGVBQW5FO0FBQ0EsZUFBTyxnQkFBUDtBQUNIOztBQUVELGFBQVM7QUFDTCxlQUFPO0FBQ0gsa0JBQU0sS0FB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QUFDQTs7QUFFQTtBQUNBLHdCQUFZLG1CQUFaLEVBQWlDLGlCQUFqQztBQUNIO0FBYkUsS0FBUDtBQWVILENBN09EIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBBcHAgPSAoZnVuY3Rpb24oKSB7XG5cblx0cmV0dXJuIHtcblx0XHRpbml0OiBmdW5jdGlvbigpIHtcblx0XHRcdGxldCB3YXRlcmluZ01vZHVsZSA9IHJlcXVpcmUoXCIuL3dhdGVyaW5nLmpzXCIpO1xuXHRcdFx0d2F0ZXJpbmdNb2R1bGUoKS5pbml0KCk7XG5cdFx0fVxuXHR9XG59KSgpO1xuXG4vL2luaXQgdGhlIGdsb2JhbCBtb2R1bGUgYWZ0ZXIgRE9NIGlzIGxvYWRlZFxuZG9jdW1lbnQub25sb2FkID0gQXBwLmluaXQoKTtcbiIsIiBtb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEZsb3dlciB7XG5cbiAgICAgY29uc3RydWN0b3IobmFtZSwgcGxhY2UsIGludGVydmFsVG9XYXRlciwgbWluRGl2ZXJnZW5jZSwgbWF4RGl2ZXJnZW5jZSkge1xuICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgIHRoaXMucGxhY2UgPSBwbGFjZTtcbiAgICAgICAgIHRoaXMuaW50ZXJ2YWxUb1dhdGVyID0gaW50ZXJ2YWxUb1dhdGVyOyAvL2luIG1pbnV0ZXNcbiAgICAgICAgIHRoaXMubGFzdFdhdGVyaW5nRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICB0aGlzLm1pbkRpdmVyZ2VuY2UgPSBtaW5EaXZlcmdlbmNlO1xuICAgICAgICAgdGhpcy5tYXhEaXZlcmdlbmNlID0gbWF4RGl2ZXJnZW5jZTtcbiAgICAgICAgIHRoaXMubmV4dFdhdGVyaW5nRGF0ZSA9IHRoaXMuZ2V0TmV4dFdhdGVyaW5nRGF0ZShpbnRlcnZhbFRvV2F0ZXIpO1xuICAgICB9XG5cbiAgICAgZ2V0TmV4dFdhdGVyaW5nRGF0ZShpbnRlcnZhbFRvV2F0ZXIpIHtcbiAgICAgICAgIHZhciBuZXh0V2F0ZXJpbmdEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgIG5leHRXYXRlcmluZ0RhdGUuc2V0TWludXRlcygoKCtuZXh0V2F0ZXJpbmdEYXRlLmdldE1pbnV0ZXMoKSkpICsgKCtpbnRlcnZhbFRvV2F0ZXIpKTtcbiAgICAgICAgIHJldHVybiBuZXh0V2F0ZXJpbmdEYXRlO1xuICAgICB9XG5cbiAgICAgdG9KU09OKCkge1xuICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgcGxhY2U6IHRoaXMucGxhY2UsXG4gICAgICAgICAgICAgaW50ZXJ2YWxUb1dhdGVyOiB0aGlzLmludGVydmFsVG9XYXRlcixcbiAgICAgICAgICAgICBsYXN0V2F0ZXJpbmdEYXRlOiB0aGlzLmxhc3RXYXRlcmluZ0RhdGUuZ2V0VGltZSgpLFxuICAgICAgICAgICAgIG1pbkRpdmVyZ2VuY2U6IHRoaXMubWluRGl2ZXJnZW5jZSxcbiAgICAgICAgICAgICBtYXhEaXZlcmdlbmNlOiB0aGlzLm1heERpdmVyZ2VuY2UsXG4gICAgICAgICAgICAgbmV4dFdhdGVyaW5nRGF0ZTogdGhpcy5nZXROZXh0V2F0ZXJpbmdEYXRlKHRoaXMuaW50ZXJ2YWxUb1dhdGVyKS5nZXRUaW1lKClcbiAgICAgICAgIH07XG4gICAgIH1cblxuICAgICBzdGF0aWMgZnJvbUpzb24ob2JqKSB7XG4gICAgICAgICB2YXIgZmxvd2VyID0gbmV3IEZsb3dlcihvYmoubmFtZSwgb2JqLnBsYWNlLCBvYmouaW50ZXJ2YWxUb1dhdGVyLCBvYmoubWluRGl2ZXJnZW5jZSwgb2JqLm1heERpdmVyZ2VuY2UpO1xuXG4gICAgICAgICBmbG93ZXIubGFzdFdhdGVyaW5nRGF0ZSA9IG5ldyBEYXRlKG9iai5sYXN0V2F0ZXJpbmdEYXRlKTtcbiAgICAgICAgIGZsb3dlci5uZXh0V2F0ZXJpbmdEYXRlID0gbmV3IERhdGUob2JqLm5leHRXYXRlcmluZ0RhdGUpO1xuXG4gICAgICAgICByZXR1cm4gZmxvd2VyO1xuICAgICB9O1xuIH0iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgRFJJRURfRkxPV0VSX1RFWFQgPSAnRmxvd2VyIGlzIGRyaWVkIHVwISEgJztcbiAgICBjb25zdCBSRURfQ09MT1JfQlVUVE9OID0gJ3JlZCc7XG5cbiAgICBsZXQgc2hvd0VsZW1lbnQgPSBmdW5jdGlvbihjbGFzc25hbWUpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc25hbWUpWzBdLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgfVxuXG4gICAgbGV0IGhpZGVFbGVtZW50ID0gZnVuY3Rpb24oY2xhc3NuYW1lKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NuYW1lKVswXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuXG4gICAgbGV0IGNyZWF0ZU9wZXJhdGlvbkJ1dHRvbiA9IGZ1bmN0aW9uKGl0ZW0sIGNsYXNzTmFtZSwgYnV0dG9uVGV4dCwgbWFya1JlZCkge1xuICAgICAgICB2YXIgY2VsbEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNlbGxCdXR0b24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJDZWxsXCIpO1xuXG4gICAgICAgIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKFwiaWRcIiwgaXRlbS5uYW1lKTtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGNsYXNzTmFtZSk7XG4gICAgICAgIGJ1dHRvbi5pbm5lclRleHQgPSBidXR0b25UZXh0O1xuXG4gICAgICAgIGlmIChtYXJrUmVkKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0SW5NaW51dGVzID0gZ2V0TWludXRlc0JldHdlZW5EYXRlcyhuZXcgRGF0ZSgpLCBuZXcgRGF0ZShpdGVtLmxhc3RXYXRlcmluZ0RhdGUpKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHRJbk1pbnV0ZXMgPj0gaXRlbS5pbnRlcnZhbFRvV2F0ZXIpIHtcbiAgICAgICAgICAgICAgICBidXR0b24uc3R5bGUuYmFja2dyb3VuZCA9IFJFRF9DT0xPUl9CVVRUT047XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNEcmllZFVwKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgbWFya1dhdGVyaW5nQnV0dG9uKGJ1dHRvbiwgRFJJRURfRkxPV0VSX1RFWFQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNlbGxCdXR0b24uYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICAgICAgcmV0dXJuIGNlbGxCdXR0b247XG4gICAgfVxuXG4gIGZ1bmN0aW9uICAgZGVsZXRlT2xkUm93cyAocGFyZW50KSB7XG4gICAgICAgIHZhciByb3dzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnUm93Jyk7XG5cbiAgICAgICAgd2hpbGUgKHJvd3NbMF0pIHtcbiAgICAgICAgICAgIHJvd3NbMF0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyb3dzWzBdKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLypcbiAgICAgKiBDaGVjayBpZiBmbG93ZXIgZXhpc3RzIGluIGFycmF5XG4gICAgICovXG4gICAgbGV0IGlzRmxvd2VyTm90RXhpc3RzID0gZnVuY3Rpb24oZmxvd2Vyc0FycmF5LCBuYW1lKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmxvd2Vyc0FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZmxvd2Vyc0FycmF5W2ldLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGxldCBtYXJrV2F0ZXJpbmdCdXR0b24gPSBmdW5jdGlvbihyb3dUb01hcmssIHRleHQpIHtcbiAgICAgICAgcm93VG9NYXJrLmlubmVyVGV4dCA9IHRleHQ7XG4gICAgICAgIHJvd1RvTWFyay5zdHlsZS5iYWNrZ3JvdW5kID0gUkVEX0NPTE9SX0JVVFRPTjtcbiAgICB9XG5cbiAgICBsZXQgZ2V0TWludXRlc0JldHdlZW5EYXRlcyA9IGZ1bmN0aW9uKHN0YXJ0RGF0ZSwgZW5kRGF0ZSkge1xuICAgICAgICB2YXIgZGlmZmVyZW5jZSA9IHN0YXJ0RGF0ZS5nZXRUaW1lKCkgLSBlbmREYXRlLmdldFRpbWUoKTtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGRpZmZlcmVuY2UgLyA2MDAwMCk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBDaGVjayBpZiBmbG93ZXIgaXMgbm90IGRyaWVkIHVwIHlldFxuICAgICAqL1xuICAgIGxldCBpc0RyaWVkVXAgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHZhciBpc0xhdGUgPSBmYWxzZTtcblxuICAgICAgICBpZiAobmV3IERhdGUoKSA+IChpdGVtLm5leHRXYXRlcmluZ0RhdGUuZ2V0VGltZSgpICsgKGl0ZW0ubWF4RGl2ZXJnZW5jZSAqIDYwMDAwKSkpIHtcbiAgICAgICAgICAgIGlzTGF0ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzTGF0ZTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIENoZWNrIGlmIGZsb3dlciBpcyBub3Qgb3ZlciB3YXRlcmVkXG4gICAgICovXG4gICAgbGV0IGlzT3ZlcldhdGVyZWQgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHZhciBpc09mdGVuID0gZmFsc2U7XG4gICAgICAgIGlmIChnZXRNaW51dGVzQmV0d2VlbkRhdGVzKG5ldyBEYXRlKCksIG5ldyBEYXRlKGl0ZW0ubGFzdFdhdGVyaW5nRGF0ZSkpIDwgKGl0ZW0uaW50ZXJ2YWxUb1dhdGVyIC0gaXRlbS5taW5EaXZlcmdlbmNlKSkge1xuICAgICAgICAgICAgaXNPZnRlbiA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzT2Z0ZW47XG4gICAgfVxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzaG93RWxlbWVudDogc2hvd0VsZW1lbnQsXG4gICAgICAgIGhpZGVFbGVtZW50OiBoaWRlRWxlbWVudCxcbiAgICAgICAgY3JlYXRlT3BlcmF0aW9uQnV0dG9uOiBjcmVhdGVPcGVyYXRpb25CdXR0b24sXG4gICAgICAgIGRlbGV0ZU9sZFJvd3M6IGRlbGV0ZU9sZFJvd3MsXG4gICAgICAgIGlzRmxvd2VyTm90RXhpc3RzOiBpc0Zsb3dlck5vdEV4aXN0cyxcbiAgICAgICAgbWFya1dhdGVyaW5nQnV0dG9uOiBtYXJrV2F0ZXJpbmdCdXR0b24sXG4gICAgICAgIGdldE1pbnV0ZXNCZXR3ZWVuRGF0ZXM6IGdldE1pbnV0ZXNCZXR3ZWVuRGF0ZXMsXG4gICAgICAgIGlzRHJpZWRVcDogaXNEcmllZFVwLFxuICAgICAgICBpc092ZXJXYXRlcmVkOiBpc092ZXJXYXRlcmVkXG4gICAgfTtcblxufSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgdXRpbHMgPSByZXF1aXJlKFwiLi91dGlsXCIpKCk7XG4gICAgbGV0IEZsb3dlciA9IHJlcXVpcmUoJy4vZmxvd2VyJyk7XG5cbiAgICBsZXQgZmxvd2Vyc0FycmF5ID0gW107XG5cbiAgICBjb25zdCBTRUNPTkRTX1RPX1VQREFURSA9IDMwMDAwO1xuICAgIGNvbnN0IERSSUVEX0ZMT1dFUl9URVhUID0gJ0Zsb3dlciBpcyBkcmllZCB1cCEhICc7XG4gICAgY29uc3QgT1ZFUl9XQVRFUkVEX0ZMT1dFUl9URVhUID0gJ1lvdSBvdmVyIHdhdGVyZWQgdGhpcyBmbG93ZXIhJztcbiAgICBjb25zdCBHUkVZX0NPTE9SX0JVVFRPTiA9ICdMaWdodEdyZXknO1xuICAgIGNvbnN0IFJFRF9DT0xPUl9CVVRUT04gPSAncmVkJztcbiAgICBjb25zdCBGTE9XRVJTX0FSUkFZID0gJ2Zsb3dlcnNBcnJheSc7XG5cbiAgICAvKlxuICAgICAqIFJldHJpZXZlIGZsb3dlcnMgYXJyYXkgZnJvbSBsb2NhbCBzdG9yYWdlIFxuICAgICAqL1xuICAgIGxldCBnZXRGbG93ZXJzRnJvbUxvY2FsU3Ryb3JhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGFyciA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oRkxPV0VSU19BUlJBWSkpIHx8IFtdO1xuICAgICAgICBsZXQgcGFyc2VkRmxvd2VycyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcGFyc2VkRmxvd2Vycy5wdXNoKEZsb3dlci5mcm9tSnNvbihhcnJbaV0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwYXJzZWRGbG93ZXJzO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogQWRkIG5ldyBmbG93ZXJcbiAgICAgKi9cbiAgICBsZXQgYWRkRmxvd2VyID0gZnVuY3Rpb24obmFtZSwgcGxhY2UsIGludGVydmFsVG9XYXRlciwgbWluRGl2ZXJnZW5jZSwgbWF4RGl2ZXJnZW5jZSkge1xuICAgICAgICBpZiAoIXV0aWxzLmlzRmxvd2VyTm90RXhpc3RzKGZsb3dlcnNBcnJheSwgbmFtZSkpIHtcblxuICAgICAgICAgICAgbGV0IGZsb3dlciA9IG5ldyBGbG93ZXIobmFtZSwgcGxhY2UsIGludGVydmFsVG9XYXRlciwgbWluRGl2ZXJnZW5jZSwgbWF4RGl2ZXJnZW5jZSk7XG4gICAgICAgICAgICBmbG93ZXJzQXJyYXkucHVzaChmbG93ZXIpO1xuICAgICAgICAgICAgc2F2ZVRvU3RvcmFnZShmbG93ZXJzQXJyYXkpO1xuXG4gICAgICAgICAgICBwcmludCgpO1xuICAgICAgICAgICAgcmVnaXN0ZXJFdmVudHMoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFsZXJ0KFwiRmxvd2VyIHdpdGggbmFtZSAnXCIgKyBuYW1lICsgXCInIGFscmVhZHkgZXhpc3RzIVwiKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBTYXZlIGZsb3dlcnMgYXJyYXkgdG8gc3RvcmFnZVxuICAgICAqL1xuICAgIGxldCBzYXZlVG9TdG9yYWdlID0gZnVuY3Rpb24oZmxvd2Vyc0FycmF5KSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKEZMT1dFUlNfQVJSQVksIEpTT04uc3RyaW5naWZ5KGZsb3dlcnNBcnJheSkpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogUHJpbnQgYWxsIGZsb3dlcnNcbiAgICAgKi9cbiAgICBsZXQgcHJpbnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGZsb3dlcnNEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdUYWJsZScpWzBdO1xuXG4gICAgICAgIHV0aWxzLmRlbGV0ZU9sZFJvd3MoZmxvd2Vyc0Rpdik7XG5cbiAgICAgICAgZmxvd2Vyc0FycmF5LmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaSwgYXJyKSB7XG4gICAgICAgICAgICBsZXQgZmxvd2VyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBmbG93ZXJSb3cuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJSb3dcIik7XG5cblxuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmbG93ZXJDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgIGZsb3dlckNlbGwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJDZWxsXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZsb3dlckNlbGwuaW5uZXJUZXh0ID0gaXRlbVtrZXldO1xuICAgICAgICAgICAgICAgICAgICBmbG93ZXJSb3cuYXBwZW5kQ2hpbGQoZmxvd2VyQ2VsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgd2F0ZXJCdXR0b24gPSB1dGlscy5jcmVhdGVPcGVyYXRpb25CdXR0b24oaXRlbSwgXCJ3YXRlci1idXR0b25cIiwgXCJXYXRlciB0aGlzIGZsb3dlclwiLCB0cnVlKTtcbiAgICAgICAgICAgIGZsb3dlclJvdy5hcHBlbmRDaGlsZCh3YXRlckJ1dHRvbik7XG5cbiAgICAgICAgICAgIGxldCBkZWxldGVCdXR0b24gPSB1dGlscy5jcmVhdGVPcGVyYXRpb25CdXR0b24oaXRlbSwgXCJkZWxldGUtYnV0dG9uXCIsIFwiUmVtb3ZlIGZsb3dlclwiKTtcbiAgICAgICAgICAgIGZsb3dlclJvdy5hcHBlbmRDaGlsZChkZWxldGVCdXR0b24pO1xuXG4gICAgICAgICAgICBmbG93ZXJzRGl2LmFwcGVuZENoaWxkKGZsb3dlclJvdyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogQ2hlY2sgaWYgZmxvd2VycyBuZWVkIG5vIGJlIHdhdGVyZWRcbiAgICAgKi9cbiAgICBsZXQgY2hlY2tGbG93ZXJTdGF0dXNlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBmbG93ZXJzQXJyYXkuZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0SW5NaW51dGVzID0gdXRpbHMuZ2V0TWludXRlc0JldHdlZW5EYXRlcyhuZXcgRGF0ZSgpLCBuZXcgRGF0ZShpdGVtLmxhc3RXYXRlcmluZ0RhdGUpKTtcblxuICAgICAgICAgICAgbGV0IHJvd1RvTWFyayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgaXRlbS5uYW1lKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHRJbk1pbnV0ZXMgPj0gaXRlbS5pbnRlcnZhbFRvV2F0ZXIpIHtcbiAgICAgICAgICAgICAgICByb3dUb01hcmsuc3R5bGUuYmFja2dyb3VuZCA9IFJFRF9DT0xPUl9CVVRUT047XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodXRpbHMuaXNEcmllZFVwKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgdXRpbHMubWFya1dhdGVyaW5nQnV0dG9uKHJvd1RvTWFyaywgRFJJRURfRkxPV0VSX1RFWFQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIC8qXG4gICAgICogQ2hhbmdlIGxhc3Qgd2F0ZXJpbmcgZGF0ZVxuICAgICAqL1xuICAgIGxldCB3YXRlciA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRmxvd2VyTm90RXhpc3RzKG5hbWUpKSB7XG4gICAgICAgICAgICB3YXRlckZsb3dlcihuYW1lKTtcblxuICAgICAgICAgICAgc2F2ZVRvU3RvcmFnZShmbG93ZXJzQXJyYXkpO1xuICAgICAgICAgICAgYWxlcnQobmFtZSArICcgd2FzIHdhdGVyZWQhJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhbGVydChuYW1lICsgJyB3YXMgbm90IGZvdW5kIScpO1xuICAgICAgICB9XG4gICAgICAgIHJlZ2lzdGVyRXZlbnRzKCk7XG4gICAgfVxuXG5cbiAgICAvKlxuICAgICAqIFVwZGF0ZSBsYXN0IHdhdGVyaW5nIGRhdGVcbiAgICAgKi9cbiAgICBsZXQgd2F0ZXJGbG93ZXIgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIGZsb3dlcnNBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGkpIHtcbiAgICAgICAgICAgIGlmIChpdGVtLm5hbWUgPT09IG5hbWUpIHtcblxuICAgICAgICAgICAgICAgIGxldCByb3dUb01hcmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIGl0ZW0ubmFtZSk7XG4gICAgICAgICAgICAgICAgcm93VG9NYXJrLnN0eWxlLmJhY2tncm91bmQgPSBHUkVZX0NPTE9SX0JVVFRPTjtcblxuICAgICAgICAgICAgICAgIGlmICh1dGlscy5pc092ZXJXYXRlcmVkKGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLm1hcmtXYXRlcmluZ0J1dHRvbihyb3dUb01hcmssIE9WRVJfV0FURVJFRF9GTE9XRVJfVEVYVCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZmxvd2Vyc0FycmF5W2ldLmxhc3RXYXRlcmluZ0RhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgIGZsb3dlcnNBcnJheVtpXS5uZXh0V2F0ZXJpbmdEYXRlID0gbmV3IEZsb3dlcigpLmdldE5leHRXYXRlcmluZ0RhdGUoZmxvd2Vyc0FycmF5W2ldLmludGVydmFsVG9XYXRlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLypcbiAgICAgKiBEZWxldGUgZmxvd2VyIGZyb20gYXJyYXkgYW5kIGxvY2Fsc3RvcmFnZVxuICAgICAqL1xuXG4gICAgbGV0IGRlbGV0ZUZsb3dlciA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgZmxvd2Vyc0FycmF5LmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaSkge1xuICAgICAgICAgICAgaWYgKGl0ZW0ubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIGZsb3dlcnNBcnJheS5zcGxpY2UoZmxvd2Vyc0FycmF5LmluZGV4T2YoaXRlbSksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmVnaXN0ZXJFdmVudHMoKTtcbiAgICAgICAgc2F2ZVRvU3RvcmFnZShmbG93ZXJzQXJyYXkpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tRXZlbnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIGxldCBzZXRPbldhdGVyQ2xpY2tFdmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgd2F0ZXJCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYnV0dG9uLndhdGVyLWJ1dHRvbicpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2F0ZXJCdXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB3YXRlckJ1dHRvbnNbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHdhdGVyKHRoaXMuaWQpO1xuICAgICAgICAgICAgICAgIHByaW50KCk7XG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJFdmVudHMoKTtcbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHNldE9uRGVsZXRlQ2xpY2tFdmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgZGVsZXRlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbi5kZWxldGUtYnV0dG9uJyk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWxldGVCdXR0b25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkZWxldGVCdXR0b25zW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBkZWxldGVGbG93ZXIodGhpcy5pZCk7XG4gICAgICAgICAgICAgICAgcHJpbnQoKTtcbiAgICAgICAgICAgICAgICByZWdpc3RlckV2ZW50cygpO1xuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgc2V0T25BZGRGbG93ZXJTdWJtaXRFdmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgc3VibWl0QWRkRmxvd2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLnN1Ym1pdC1hZGQtZmxvd2VyJyk7XG5cbiAgICAgICAgc3VibWl0QWRkRmxvd2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgbGV0IG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShcIm5hbWVcIilbMF0udmFsdWU7XG4gICAgICAgICAgICBsZXQgcGxhY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShcInBsYWNlXCIpWzBdLnZhbHVlO1xuICAgICAgICAgICAgbGV0IGludGVydmFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoXCJpbnRlcnZhbFwiKVswXS52YWx1ZTtcbiAgICAgICAgICAgIGxldCBtaW5EaXZlcmdlbmNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoXCJtaW5EaXZlcmdlbmNlXCIpWzBdLnZhbHVlO1xuICAgICAgICAgICAgbGV0IG1heERpdmVyZ2VuY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShcIm1heERpdmVyZ2VuY2VcIilbMF0udmFsdWU7XG5cbiAgICAgICAgICAgIGFkZEZsb3dlcihuYW1lLCBwbGFjZSwgaW50ZXJ2YWwsIG1pbkRpdmVyZ2VuY2UsIG1heERpdmVyZ2VuY2UpO1xuICAgICAgICAgICAgdXRpbHMuaGlkZUVsZW1lbnQoXCJhZGQtZmxvd2VyLWZvcm1cIik7XG5cbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgbGV0IHJlZ2lzdGVyQWRkRmxvd2VyTGlzdGVuZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGFkZEZsb3dlckJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5hZGQtZmxvd2VyJyk7XG5cbiAgICAgICAgYWRkRmxvd2VyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHV0aWxzLnNob3dFbGVtZW50KFwiYWRkLWZsb3dlci1mb3JtXCIpO1xuICAgICAgICB9LCB0cnVlKTtcblxuICAgIH1cblxuICAgIGxldCByZWdpc3RlckV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIC8vd2F0ZXIgYnV0dG9uXG4gICAgICAgIHNldE9uV2F0ZXJDbGlja0V2ZW50KCk7XG4gICAgICAgIC8vZGVsZXRlIGJ1dHRvblxuICAgICAgICBzZXRPbkRlbGV0ZUNsaWNrRXZlbnQoKTtcblxuICAgICAgICAvL2FkZCBmbG93ZXJzXG4gICAgICAgIHJlZ2lzdGVyQWRkRmxvd2VyTGlzdGVuZXIoKTtcbiAgICAgICAgc2V0T25BZGRGbG93ZXJTdWJtaXRFdmVudCgpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tRXZlbnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy9nZXQgZmxvd2VycyBmcm9tIGxvY2FsU3RvcmFnZVxuICAgICAgICAgICAgZmxvd2Vyc0FycmF5ID0gZ2V0Rmxvd2Vyc0Zyb21Mb2NhbFN0cm9yYWdlKCk7XG5cbiAgICAgICAgICAgIC8vcHJpbnQgYXJyYXlcbiAgICAgICAgICAgIHByaW50KCk7XG5cbiAgICAgICAgICAgIC8vcmVnaXN0ZXIgY2xpY2sgZXZlbnRzXG4gICAgICAgICAgICByZWdpc3RlckV2ZW50cygpO1xuXG4gICAgICAgICAgICAvL2NoZWNrIGZsb3dlciBzdGF0dXNlcyBldmVyeSAzMCBzZWNcbiAgICAgICAgICAgIHNldEludGVydmFsKGNoZWNrRmxvd2VyU3RhdHVzZXMsIFNFQ09ORFNfVE9fVVBEQVRFKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=
