describe('addFlowerController', function() {

    beforeEach(module('flowersApp'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    describe('addFlowerController', function() {
        var controller = $controller('addFlowerController', {});

        it('set variable to show form', function() {
            controller.hideForm = true;
            controller.addButtonHandler();
            expect(controller.hideForm).toEqual(false);
        });

        it('hides add form and add flower', function() {
            let flower = {
                name: "someFlower",
                place: "somePlace",
                interval: 10,
                minDivergence: 2,
                maxDivergence: 3,
                flowerImg: ''
            }

            controller.submitFlower(flower);
            expect(controller.hideForm).toEqual(true);
        });
    });
});