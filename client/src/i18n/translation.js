export function translation($translateProvider) {

    $translateProvider.translations('en', {
        'APPLICATION_TITLE': 'Watering Nanny',
        'SWITCH_LANGUAGE': 'Switch language: ',
        'FLOWER_LIST': 'Flowers list',
        'ADD_NEW_FLOWER_LINK': 'Add new flower',
        'FLOWERS_LIST_LINK': 'Go to flowers',

        'ADD_NEW_FLOWER_TEXT': 'Add new flower:',
        'ADD_NEW_FLOWER_BUTTON_TEXT': 'Add',
        'ADD_FLOWER_NAME': 'Name:',
        'ADD_FLOWER_PLACE': 'Place, were plant is situated:',
        'ADD_FLOWER_WATERING_INTERVAL': 'Watering interval: ',
        'ADD_FLOWER_WATERING_DIVERGEANCE_MIN': 'Watering divergence (not less than):',
        'ADD_FLOWER_WATERING_DIVERGEANCE_MAX': 'Watering divergence (not more than):',
        'ADD_FLOWER_IMAGE': 'Add link to flower image:',
        'ADD_FLOWER_SUBMIT': 'Submit',


        'FILTER_BY_NAME': 'Filter by flower name:',
        'REMOVE_FLOWER': 'Remove flower',
        'WATER_FLOWER_BUTTON_TEXT': 'Press button to water a flower',
        'FLOWER_STATE': 'Flower state',
        'NEXT_WATERING_DATE': 'Planned next watering date',
        'WATERING_DIVERGEANCE_MIN': 'Allowed deviation not less than(min)',
        'WATERING_DIVERGEANCE_MAX': 'Allowed deviation not more than (min)',
        'LAST_WATERING_DATE': 'Last watering date',
        'WATERING_INTERVAL': 'Watering interval',
        'FLOWER_PLACE': 'Place',
        'FLOWER_NAME': 'Name',
        'FLOWER_IMAGE' : 'Flower photo'
    });

    $translateProvider.translations('ru', {
        'APPLICATION_TITLE': 'Система управления поливом цветов',
        'SWITCH_LANGUAGE': 'Поменять язык: ',
        'FLOWER_LIST': 'Список цветов',
        'ADD_NEW_FLOWER_LINK': 'Добавить цветок',
        'FLOWERS_LIST_LINK': 'Посмотреть список всех цветов',
        
        'ADD_NEW_FLOWER_TEXT': 'Добавить новый цветок:',
        'ADD_NEW_FLOWER_BUTTON_TEXT': 'Добавить',

        'ADD_FLOWER_NAME': 'Имя:',
        'ADD_FLOWER_PLACE': 'Введите место, где расположено растение:',
        'ADD_FLOWER_WATERING_INTERVAL': 'Интервал полива (мин): ',
        'ADD_FLOWER_WATERING_DIVERGEANCE_MIN': 'Можно полить раньше, чем след. дата полива за (мин):',
        'ADD_FLOWER_WATERING_DIVERGEANCE_MAX': 'Засохнет, если его не полить в течение х мин после назначеной даты полива:',
        'ADD_FLOWER_IMAGE': 'Ссылка на фото цветка:',
        'ADD_FLOWER_SUBMIT': 'Добавить ',


        'FILTER_BY_NAME': 'Отфильтровать по имени',
        'REMOVE_FLOWER': 'Удалить цветок',
        'WATER_FLOWER_BUTTON_TEXT': 'Нажмите, чтобы полить',
        'FLOWER_STATE': 'Состояние цветка',
        'NEXT_WATERING_DATE': 'Следующая дата полива',
        'WATERING_DIVERGEANCE_MIN': 'Можно полить раньше, чем след. дата полива за (мин)',
        'WATERING_DIVERGEANCE_MAX': 'Засохнет, если его не полить в течение х мин после назначеной даты полива',
        'LAST_WATERING_DATE': 'Дата последнего полива',
        'WATERING_INTERVAL': 'Интервал полива (мин):',
        'FLOWER_PLACE': 'Где расположен цветок',
        'FLOWER_NAME': 'Имя',
        'FLOWER_IMAGE' : 'Фото цветка'
        
    });

    $translateProvider.preferredLanguage('ru');
}