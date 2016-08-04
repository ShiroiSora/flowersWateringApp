export function changeLanguageController(LANGUAGES, $translate) {
    const DEFAULT_LANGUAGE = 'ru';

    let self = this;
    self.languages = LANGUAGES;
    self.selectedLanguage = DEFAULT_LANGUAGE;

    self.changeLanguage = changeLanguage;

    function changeLanguage() {
        $translate.use(self.selectedLanguage);
    };
}