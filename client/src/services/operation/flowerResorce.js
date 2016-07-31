export function flowerResorce(FlowerEntry, URL) {

    let flowerRes = {};

    flowerRes.addFlower = (flower) => {
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

    flowerRes.waterFlower = (name, lastWateringDate, nextWateringDate, state) => {
        FlowerEntry.update({
            name: name,
            lastWateringDate: lastWateringDate,
            nextWateringDate: nextWateringDate,
            state: state
        });
    }

    flowerRes.getFlowers = () => {
        return FlowerEntry.query();
    }


    flowerRes.deleteFlower = (name) => {
        return FlowerEntry.delete({
            name: name
        });
    }

    return flowerRes;
}