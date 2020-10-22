
var global_degreeRatio = 1;
var global_outstandRatio = [0.1, 0.1, 0.1];
var kv_x_stand = [0, 0, 0];
var kv_stand_ratio = [0.4, 0.8, 1.0];

$('body').prepend(`
    <div class="bg"></div>
    <div class="kv kv_chara_01"></div>
    <div class="kv kv_chara_02"></div>
    <div class="kv kv_chara_03"></div>
    <div class="kv_flare"></div>
    <div class="logo"></div>
`);


// Dust
setInterval(function () {

    let rand = Math.floor(Math.random() * 10000 + 1000);
    let top = Math.random() * 1000;
    let dust = '';
    let id = (Date.now()).valueOf() + rand;
    if (rand % 5 == 0) {
        dust = `<div class="dust dust bg_dust_01" id="${id}"></div>`;
        top *= -1
    } else if (rand % 5 == 1) {
        dust = `<div class="dust dust bg_dust_02" id="${id}"></div>`;
        top *= -1
    } else if (rand % 5 == 2) {
        dust = `<div class="dust dust bg_dust_03" id="${id}"></div>`;
    } else if (rand % 5 == 3) {
        dust = `<div class="dust dust bg_dust_04" id="${id}"></div>`;
    } else {
        return;
    }

    $('body').append(dust);
    $(`#${id}`).css({ 'top': `${top}px` });
    $.console.dust(id, top, 10);

    setTimeout(function () {
        $(`#${id}`).remove();
    }, 1000 * 10);

}, 1500);


// Mouse
$.mouse = function (e) {

    let width = window.screen.width;
    let height = window.screen.height;

    $.console.screen(width, height);
    $.console.mouse(e.clientX, e.clientY);

    let wr = e.clientX / width;
    let hr = e.clientY / height;

    let kv_xChangeRate = $('.kv').css('--x-change-rate') * 1.0;
    let kv_yChangeRate = $('.kv').css('--y-change-rate') * 1.0;
    let kv_tolerancePixel = 1; // Unit: px, technically no need anymore

    if (wr <= kv_stand_ratio[0]) {
        let wr_rate = wr;
        kv_x_stand[0] = e.clientX * wr_rate * global_outstandRatio[0] * -1;
        kv_x_stand[1] = 0;
        kv_x_stand[2] = 0;
    } else if (wr <= kv_stand_ratio[1]) {
        let wr_rate = wr - kv_stand_ratio[0];
        kv_x_stand[0] = e.clientX * kv_stand_ratio[0] * global_outstandRatio[0] * -1;
        kv_x_stand[1] = e.clientX * wr_rate * global_outstandRatio[1] * -1;
        kv_x_stand[2] = 0;
    } else if (wr <= kv_stand_ratio[2]) {
        let wr_rate = wr - kv_stand_ratio[1];
        kv_x_stand[0] = e.clientX * kv_stand_ratio[0] * global_outstandRatio[0] * -1;
        kv_x_stand[1] = e.clientX * (kv_stand_ratio[1] - kv_stand_ratio[0]) * global_outstandRatio[1] * -1;
        kv_x_stand[2] = e.clientX * wr_rate * global_outstandRatio[2] * -1;
    }

    let kv_x = e.clientX * kv_xChangeRate * -1 + kv_tolerancePixel;
    let kv_y = e.clientY * kv_yChangeRate * -1 + kv_tolerancePixel;
    let stand_cancellation = width * (kv_stand_ratio[2] - kv_stand_ratio[1]) * 0.1;

    let kv_03_over = $(document).width() - $('.kv_chara_03').width(); // Make sure within screen
    let kv_y_over = $(document).height() - $('.kv').height();

    $('.kv').each(function (index, obj) {
        let kv_x_this = kv_x + kv_x_stand[index] + stand_cancellation;
        let kv_y_this = kv_y;

        if (kv_y_this < kv_y_over) kv_y_this = kv_y_over;
        if (index == 2 && kv_x_this < kv_03_over) kv_x_this = kv_03_over; // Make sure within screen

        $(obj).css({ "--x": `${kv_x_this}px`, "--y": `${kv_y_this}px` });
    });

    $.console.kv('01', $('.kv_chara_01').css('--x'), $('.kv_chara_01').css('--y'));
    $.console.kv('02', $('.kv_chara_02').css('--x'), $('.kv_chara_02').css('--y'));
    $.console.kv('03', $('.kv_chara_03').css('--x'), $('.kv_chara_03').css('--y'));

    let bg_xChangeRate = $('.bg').css('--x-change-rate');
    let bg_yChangeRate = $('.bg').css('--y-change-rate');

    $('.bg').css({ '--x': `${e.clientX * bg_xChangeRate}px`, '--y': `${e.clientY * bg_yChangeRate}px` });
    $.console.bg($('.bg').css('--x'), $('.bg').css('--y'));

    let flare_degreeChangeRate = $('.kv_flare').css('--degree-change-rate') * global_degreeRatio;
    let flare_degree = Math.atan2(e.clientY, width - e.clientX) * (180 / Math.PI) * flare_degreeChangeRate;
    $('.kv_flare').css('--degree', `${flare_degree}deg`);
    $.console.flare(flare_degree);

}

$.mouse({ "clientX": 0, "clientY": 0 });
$(document).on('mousemove', $.mouse);
