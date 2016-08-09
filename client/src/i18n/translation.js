import {en} from './en.js';
import {ru} from './ru.js';

export function translation($translateProvider) {

    $translateProvider.translations('en', en);
    $translateProvider.translations('ru', ru);

    $translateProvider.preferredLanguage('ru');
}