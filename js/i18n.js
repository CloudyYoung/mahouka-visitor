
Object.defineProperty(Array.prototype, 'i18n', {
    value: function () { return (this && this.length == 3) ? `i18n jp="${this[0]}" zh="${this[1]}" en="${this[2]}"` : "" },
    writable: false,
});

$(() => {
    let lang = window.navigator.languages ? window.navigator.languages[0] : null;
    lang = lang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;

    let shortLang = lang;
    if (shortLang.indexOf('-') !== -1)
        shortLang = shortLang.split('-')[0];

    if (shortLang.indexOf('_') !== -1)
        shortLang = shortLang.split('_')[0];


    let tag = "";

    if (shortLang == 'ja' || shortLang == 'jp') {
        tag = "jp";
    } else if (shortLang == 'zh') {
        tag = "zh";
    } else {
        tag = "en";
    }

    $('[i18n]').each(function () {
        let html = $(this).attr(tag);
        $(this).html(html);
    });
});