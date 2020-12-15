let lang = window.navigator.languages ? window.navigator.languages[0] : null;
lang = lang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;

var shortLang = lang;
if (shortLang.indexOf('-') !== -1)
    shortLang = shortLang.split('-')[0];

if (shortLang.indexOf('_') !== -1)
    shortLang = shortLang.split('_')[0];


$(() => {
    // shortLang = 'zh';
    index = 0;

    if (shortLang == 'ja') {
        index = 0;
    } else if (shortLang == 'zh') {
        index = 1;
    } else {
        index = 2;
    }

    $('[i18n]').each(function () {
        $(this).attr('original-text', $(this).text());
        let arr = $(this).html().split("//");
        $(this).html(arr[index].trim());
    });
});