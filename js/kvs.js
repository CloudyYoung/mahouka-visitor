
$.global_degreeRatio = 1;
$.global_outstandRatioDefault = [0.1, 0.1, 0.1];
$.global_outstandRatio = $.global_outstandRatioDefault;

$.kv_x_stand = [0, 0, 0];
$.kv_stand_ratio = [0.33, 0.66, 1.0];

$.kv_chara_change_rate_x = 0.04;
$.kv_chara_change_rate_y = 0.06;

$.kv_bg_change_rate_x = 0.02;
$.kv_bg_change_rate_y = 0.02;


$('body').append(`<canvas class="kvs"></canvas>`);


$.width = window.screen.width;
$.height = window.screen.height;

$.kv_real_width = 2560;
$.kv_real_height = 2000;

$.kv_chara_height = $.height;
$.kv_chara_width = $.kv_real_width * ($.kv_chara_height / $.kv_real_height);

$.kv_chara = [];
$.kv_chara_tween = [];

$.kv_bg_width = $.width;
$.kv_bg_height = $.kv_real_height * ($.kv_bg_width / $.kv_real_width);

$.kv_bg = null;
$.kv_bg_tween = null;


$.stage = new Konva.Stage({
    container: $("body").get(0),
    width: $.width,
    height: $.height
});
$.kv_bg_layer = new Konva.Layer();
$.kv_chara_layer = new Konva.Layer();
$.stage.add($.kv_bg_layer, $.kv_chara_layer);

// kv chara
for (let t = 0; t < 3; t++) {
    let kv_chara_img = new Image();
    kv_chara_img.onload = function () {
        $.kv_chara[t] = new Konva.Image({
            image: kv_chara_img,
            zIndex: 900 + (t * 10),
        });
        $.kv_chara[t].attrs.index = t;
        $.kv_chara_layer.add($.kv_chara[t]);
        $.kvsDisplay();
    };
    kv_chara_img.src = `img/kv_chara_0${t + 1}.png`;
}

// kv bg
let kv_bg_img = new Image();
kv_bg_img.onload = function () {
    $.kv_bg = new Konva.Image({
        x: 0,
        y: 0,
        image: kv_bg_img,
        width: $.kv_bg_width,
        height: $.kv_bg_height,
        zIndex: -9999,
    });
    $.kv_bg_layer.add($.kv_bg);
    $.kvsDisplay();
};
kv_bg_img.src = `img/kv_bg.jpg`;


$.kvsDisplay = function () {
    let stand_cancellation = $.width * ($.kv_stand_ratio[2] - $.kv_stand_ratio[1]) * 0.1;
    let kv_chara_change_px_x = $.kv_chara_change_rate_x * $.width;
    let kv_chara_change_px_y = $.kv_chara_change_rate_y * $.height;
    let kv_chara_x = ($.width - $.kv_chara_width) + (kv_chara_change_px_x / 2) + stand_cancellation;
    let kv_chara_y = ($.height - $.kv_chara_height) + (kv_chara_change_px_y / 2);
    let kv_chara_width = $.kv_chara_width + (kv_chara_change_px_x / 2);
    let kv_chara_height = $.kv_chara_height + (kv_chara_change_px_y / 2);
    $.kv_chara.forEach(kv => {
        kv.x(kv_chara_x);
        kv.y(kv_chara_y);
        kv.width(kv_chara_width);
        kv.height(kv_chara_height);
    });

    let kv_bg_change_px_x = $.kv_bg_change_rate_x * $.width;
    let kv_bg_change_px_y = $.kv_bg_change_rate_y * $.height;
    let kv_bg_x = -kv_bg_change_px_x;
    let kv_bg_y = -kv_bg_change_px_y;
    let kv_bg_width = $.kv_bg_width + kv_bg_change_px_x;
    let kv_bg_height = $.kv_bg_height + kv_bg_change_px_y;
    $.kv_bg.x(kv_bg_x);
    $.kv_bg.y(kv_bg_y);
    $.kv_bg.width(kv_bg_width);
    $.kv_bg.height(kv_bg_height);

    $.kv_chara_layer.batchDraw();
    $.kv_bg_layer.batchDraw();
}


$.mouse = function (e) {

    let wr = e.clientX / $.width;
    let hr = e.clientY / $.height;

    let kv_xChangeRate = $.kv_chara_change_rate_x * 1.0;
    let kv_yChangeRate = $.kv_chara_change_rate_y * 1.0;

    if (wr <= $.kv_stand_ratio[0]) {
        let wr_rate = wr;
        $.kv_x_stand[0] = e.clientX * wr_rate * $.global_outstandRatio[0] * -1;
        $.kv_x_stand[1] = 0;
        $.kv_x_stand[2] = 0;
    } else if (wr <= $.kv_stand_ratio[1]) {
        let wr_rate = wr - $.kv_stand_ratio[0];
        $.kv_x_stand[0] = e.clientX * $.kv_stand_ratio[0] * $.global_outstandRatio[0] * -1;
        $.kv_x_stand[1] = e.clientX * wr_rate * $.global_outstandRatio[1] * -1;
        $.kv_x_stand[2] = 0;
    } else if (wr <= $.kv_stand_ratio[2]) {
        let wr_rate = wr - $.kv_stand_ratio[1];
        $.kv_x_stand[0] = e.clientX * $.kv_stand_ratio[0] * $.global_outstandRatio[0] * -1;
        $.kv_x_stand[1] = e.clientX * ($.kv_stand_ratio[1] - $.kv_stand_ratio[0]) * $.global_outstandRatio[1] * -1;
        $.kv_x_stand[2] = e.clientX * wr_rate * $.global_outstandRatio[2] * -1;
    }

    let kv_chara_x = e.clientX * kv_xChangeRate * -1;
    let kv_chara_y = e.clientY * kv_yChangeRate * -1;
    $.kv_chara.forEach(kv => {
        let kv_x_this = kv_chara_x + $.kv_x_stand[kv.attrs.index];
        let kv_y_this = kv_chara_y;

        // Finish previous existing tween
        if ($.kv_chara_tween[kv.attrs.index]) {
            $.kv_chara_tween[kv.attrs.index].finish();
        }

        // Spawn new tween
        $.kv_chara_tween[kv.attrs.index] = new Konva.Tween({
            node: kv,
            duration: 0.3,
            offsetX: -kv_x_this,
            offsetY: -kv_y_this,
            easing: Konva.Easings.StrongEaseOut,
        });
        $.kv_chara_tween[kv.attrs.index].play();
    });

    let kv_bg_x = e.clientX * $.kv_bg_change_rate_x;
    let kv_bg_y = e.clientY * $.kv_bg_change_rate_y;
    if ($.kv_bg_tween) {
        $.kv_bg_tween.finish();
    }
    $.kv_bg_tween = new Konva.Tween({
        node: $.kv_bg,
        duration: 0.3,
        offsetX: -kv_bg_x,
        offsetY: -kv_bg_y,
        easing: Konva.Easings.StrongEaseOut,
    });
    $.kv_bg_tween.play();
};
$(document).on('mousemove', $.mouse);

