export function routing($stateProvider) {

    $stateProvider
        .state('addFlower', {
            url: 'add',
            templateUrl: './client/src/viewTemplates/addFlowerTemplate.html'
        })
        .state('flowerList', {
            url: '/',
            templateUrl: './client/src/viewTemplates/flowersTemplate.html'
        })

}