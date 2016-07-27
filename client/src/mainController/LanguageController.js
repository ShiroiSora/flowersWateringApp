export function LanguageController($scope, LANGUAGES, $translate) {
    const DEFAULT_LANGUAGE = 'ru';

    $scope.languages = LANGUAGES;
    $scope.selectedLanguage = DEFAULT_LANGUAGE;

    $scope.changeLanguage = function() {
        $translate.use($scope.selectedLanguage);
    };

}