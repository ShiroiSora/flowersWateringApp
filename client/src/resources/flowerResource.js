export function flowerResource(FlowerEntry, URL) {

    let service = {
        addFlower: addFlower,
        waterFlower: waterFlower,
        getFlowers: getFlowers,
        deleteFlower: deleteFlower
    };
    return service;


    function addFlower(flower) {
        let entry = new FlowerEntry();

        entry.name = flower.name;
        entry.place = flower.place;
        entry.intervalToWater = flower.intervalToWater;
        entry.lastWateringDate = flower.lastWateringDate;
        entry.minDivergence = flower.minDivergence;
        entry.maxDivergence = flower.maxDivergence;
        entry.nextWateringDate = flower.nextWateringDate;
        entry.state = flower.state;

        entry.$save();
    }

    function waterFlower(name, lastWateringDate, nextWateringDate, state) {
        FlowerEntry.update({
            name: name,
            lastWateringDate: lastWateringDate,
            nextWateringDate: nextWateringDate,
            state: state
        });
    }

    function getFlowers() {
        return FlowerEntry.query();
    }


    function deleteFlower(name) {
        return FlowerEntry.delete({
            name: name
        });
    }

}