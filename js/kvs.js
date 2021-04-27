
$.global_degreeRatio = 1;
$.global_outstandRatioDefault = [0.1, 0.1, 0.1];
$.global_outstandRatio = $.global_outstandRatioDefault;
$.kv_x_stand = [0, 0, 0];
$.kv_stand_ratio = [0.33, 0.66, 1.0];
$.kv_change_rate_x = 0.04;
$.kv_change_rate_y = 0.06;


$('body').append(`
    <canvas class="kvs"></canvas>
`);


$.width = window.screen.width;
$.height = window.screen.height;
$.kv_real_width = 2560;
$.kv_real_height = 2000;
$.kv_height = $.height;
$.kv_width = $.kv_real_width * ($.kv_height / $.kv_real_height);
$.kvs = [];
$.stage = null;
$.kv_chara_layer = null;



$.stage = new Konva.Stage({
    container: $("body").get(0),
    width: $.width,
    height: $.height
});

$.kv_chara_layer = new Konva.Layer();
$.stage.add($.kv_chara_layer);


for (let t = 0; t < 3; t++) {
    let image = new Image();
    image.onload = function () {
        $.kvs[t] = new Konva.Image({
            image: image,
        });
        $.kv_chara_layer.add($.kvs[t]);
        $.kvsDisplay();
    };
    image.src = `img/kv_chara_0${t + 1}.png`;
}


$.kvsDisplay = function () {
    let stand_cancellation = $.width * ($.kv_stand_ratio[2] - $.kv_stand_ratio[1]) * 0.1;
    let kv_canvas_x = ($.width - $.kv_width) + ($.kv_change_rate_x / 2 * $.width) + stand_cancellation;
    let kv_canvas_y = ($.height - $.kv_height) + ($.kv_change_rate_y / 2 * $.height);
    let kv_canvas_width = $.kv_change_rate_x / 2 * $.width + $.kv_width;
    let kv_canvas_height = $.kv_change_rate_y / 2 * $.height + $.kv_height;

    $.kvs.forEach(kv => {
        kv.x(kv_canvas_x);
        kv.y(kv_canvas_y);
        kv.width(kv_canvas_width);
        kv.height(kv_canvas_height);
    });
    $.kv_chara_layer.batchDraw();
}


$.mouse = function (e) {

    let wr = e.clientX / $.width;
    let hr = e.clientY / $.height;

    let kv_xChangeRate = $.kv_change_rate_x * 1.0;
    let kv_yChangeRate = $.kv_change_rate_y * 1.0;

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

    let kv_x = e.clientX * kv_xChangeRate * -1;
    let kv_y = e.clientY * kv_yChangeRate * -1;

    $.kvs.forEach(kv => {
        let kv_x_this = kv_x + $.kv_x_stand[kv.index];
        let kv_y_this = kv_y;

        kv.offsetX(-kv_x_this);
        kv.offsetY(-kv_y_this);
    });

    $.kv_chara_layer.batchDraw();
};
$.mouse({ clientX: 0, clientY: 0 });
$(document).on('mousemove', $.mouse);

