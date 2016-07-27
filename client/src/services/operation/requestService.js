export function requestService($http, URL) {

    const APP_NAME = 'plantApp';
    const ID = 'Kalinichenko';
    const URL_WIRH_ID = URL + '/' + APP_NAME + '/Kalinichenko/';

    let requests = {};

    /**
     * Add flower
     * URL: https://js-classes-kucherenko.c9users.io/plantApp/Kalinichenko/flower
     **/
    requests.addNewFlower = (flower) => {
        let postUrl = URL_WIRH_ID + 'flower';

        $http({
            method: 'POST',
            url: postUrl,
            data: {
                flower: JSON.stringify(flower)
            }
        }).then(function successCallback(response) {
            console.log("Send new flower to server sucessfully")
        }, function errorCallback(response) {
            console.error("Failed to post data to server!")
        });
    }

    /**
     * Update flower watering date by flower name
     * URL: https://js-classes-kucherenko.c9users.io/plantApp/Kalinichenko/flower
     **/
    requests.waterFlower = (name, date) => {

        let putUrl = URL_WIRH_ID + 'flower';

        $http.put(putUrl, {
            name: name,
            date: date
        }).then(() => {
            console.log("Send data about watering flower sucessfully.")
        }, () => {
            console.error("Sending data about watering flower failded")
        });
    }

    /**
     * Delete flower by name
     * URL: https://js-classes-kucherenko.c9users.io/plantApp/Kalinichenko/flower/${name}
     **/
    requests.deleteFlower = (name) => {

        let deleteUrl = URL_WIRH_ID + 'flower/' + name;

        $http.delete(deleteUrl).then(() => {
            console.log("Deleted flower from server.")
        }, () => {
            console.error("Failed to delete flower from server.")
        });
    }

    /**
     * Get list of flowers by id
     * URL: https://js-classes-kucherenko.c9users.io/plantApp/Kalinichenko/flowers
     **/
    requests.getFlowers = () => {

        let getUrl = URL_WIRH_ID + 'flowers';

        return $http({
            method: 'GET',
            url: getUrl,
        });
    }

    /**
     * Get watering history (log) by id
     * URL: https://js-classes-kucherenko.c9users.io/plantApp/Kalinichenko/flower/history
     **/
    requests.getWateringHistory = () => {
        let historyUrl = URL_WIRH_ID + 'flower/history';

        return $http({
            method: 'GET',
            url: historyUrl,
        });
    }

    return requests;
}