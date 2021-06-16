
$.global_degreeRatio = 1;
$.global_outstandRatioDefault = [0.1, 0.1, 0.1];
$.global_outstandRatio = $.global_outstandRatioDefault;
$.global_smooth_movement = true;

$.kv_x_stand = [0, 0, 0];
$.kv_stand_ratio = [0.33, 0.66, 1.0];

$.kv_chara_change_rate_x = 0.04;
$.kv_chara_change_rate_y = 0.06;

$.kv_bg_change_rate_x = 0.02;
$.kv_bg_change_rate_y = 0.02;


$('body').append(`<div class="konva"></div>`);


let width = window.screen.width;
let height = window.screen.height;


// let kv_bg_width = width;
// let kv_bg_height = kv_real_height * (kv_bg_width / kv_real_width);


// Initialization - Stage
let stage = new Konva.Stage({
    container: $(".konva").get(0),
    width: width,
    height: height,
});
let kvs_layer = new Konva.Layer({ listening: false });
stage.add(kvs_layer);



// Initialization - Character kv_chara
let kv_real_width = 2560;
let kv_real_height = 2000;

let kv_chara_height = height;
let kv_chara_width = kv_real_width * (kv_chara_height / kv_real_height);

let kv_bg_width = width;
let kv_bg_height = kv_real_height * (kv_chara_width / kv_real_width);

let stand_cancellation = width * ($.kv_stand_ratio[2] - $.kv_stand_ratio[1]) * 0.1;
let kv_chara_change_px_x = $.kv_chara_change_rate_x * width;
let kv_chara_change_px_y = $.kv_chara_change_rate_y * height;

let kvs = {
    // bg
    "kv_bg": {
        origin: { zIndex: 0 },
        start: { scale: 1.3, delay: 0 }
    },

    // charas
    // x: the distance to the right side, y: default the bottom
    "kv_chara_01_crop": {
        origin: { width: 1121, height: 1390, x: 1189, zIndex: 1 },
        start: { x: kv_chara_width * -0.2, y: kv_chara_height * 0.1, delay: 400 },
    },
    "kv_chara_02_crop": {
        origin: { width: 1650, height: 1750, x: 360, zIndex: 2 },
        start: { y: kv_chara_height * 0.2, delay: 600 },
    },
    "kv_chara_03_crop": {
        origin: { width: 1330, height: 1832, x: 0, zIndex: 3 },
        start: { x: kv_chara_width * 0.2, y: kv_chara_height * 0.1, delay: 800 },
    },

    // flare
    "kv_flare": {
        origin: { opacity: 0.9, globalCompositeOperation: "screen", zIndex: 4 },
        start: { opacityDuration: 1, rotate: 20, scale: 1.3, delay: 600 },
    },
};

// kv_charas initialize
for (let [kv, attr] of Object.entries(kvs)) {

    let is_bg = kv == "kv_bg";
    let is_flare = kv == "kv_flare";

    let kv_img = new Image();
    kv_img.src = is_bg ? `img/kv_bg.jpg` : `img/${kv}.png`;
    kv_img.onload = function () {
        attr.loaded = true;
    }

    attr.offset = is_flare ? {
        x: kv_chara_width,
        y: 0,
    } : {
        x: kv_chara_width / 2,
        y: kv_chara_height / 2,
    };
    attr.position = attr.offset;

    // kv Group 1 & Group 2 & Move
    // Group 0: kvs - right bottom aligned with offset
    let konva_group0_initialize = {
        offsetX: is_bg ? 0 : -(width - kv_chara_width),
        offsetY: is_bg ? 0 : -(height - kv_chara_height),
        opacity: attr.start.opacity || 0,
    }
    let konva_groups_intialize = {
        width: kv_chara_width,
        height: kv_chara_height,
        x: attr.position.x + (attr.start.x / 2 || 0),
        y: attr.position.y + (attr.start.y / 2 || 0),
        offsetX: attr.offset.x,
        offsetY: attr.offset.y,
        scaleX: Math.sqrt(attr.start.scale) || 1,
        scaleY: Math.sqrt(attr.start.scale) || 1,
        rotation: (attr.start.rotate / 2) || 0,
    };
    attr.konva_group0 = new Konva.Group(konva_group0_initialize);
    attr.konva_group1 = new Konva.Group(konva_groups_intialize);
    attr.konva_group2 = new Konva.Group(konva_groups_intialize);
    attr.konva_move = new Konva.Group();


    // kv chara
    let kv_width = attr.origin.width ? kv_chara_width * (attr.origin.width / kv_real_width) : kv_chara_width;
    let kv_height = attr.origin.height ? kv_chara_height * (attr.origin.height / kv_real_height) : kv_chara_height;
    let kv_x = kv_chara_width - kv_width - (attr.origin.x || 0) * (kv_chara_width / kv_real_width);
    let kv_y = kv_chara_height - kv_height;

    attr.konva_kv = new Konva.Image({
        image: kv_img,
        width: is_bg ? kv_bg_width : kv_width,
        height: is_bg ? kv_bg_height : kv_height,
        opacity: attr.origin.opacity || 1,
        globalCompositeOperation: attr.origin.globalCompositeOperation || "",
        x: kv_x,
        y: kv_y,
        scaleX: attr.origin.scale,
        scaleY: attr.origin.scale,
    });


    // Add to layers: Group 0 -> Group1 -> Group 2 -> Move -> Image
    kvs_layer.add(attr.konva_group0);
    attr.konva_group0.add(attr.konva_group1);
    attr.konva_group1.add(attr.konva_group2);
    attr.konva_group2.add(attr.konva_move);
    attr.konva_move.add(attr.konva_kv);


    // Start animation
    let konva_groups_tween = {
        duration: 20,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        x: attr.position.x,
        y: attr.position.y,
        easing: mahouka_bezier,
    };
    attr.tween_start1 = new Konva.Tween(Object.assign({}, konva_groups_tween, { node: attr.konva_group1 }));
    attr.tween_start2 = new Konva.Tween(Object.assign({}, konva_groups_tween, { node: attr.konva_group2 }));

    // Start opacity
    attr.tween_start0 = new Konva.Tween({
        node: attr.konva_group0,
        duration: attr.start.opacityDuration || 0.4,
        opacity: 1,
        easing: Konva.Easings.EaseInOut,
    });
}

setTimeout(() => kvs_layer.batchDraw(), 1500);


function mahouka_bezier(t, b, c, d) {
    let a = bezier(0.01, 0.9, 0, 0.79);
    return b + a(t / d) / c;
}

let all_loaded_detection = setInterval(() => {
    let all_loaded = true;
    for (let [kv, attr] of Object.entries(kvs)) {
        if (!attr.loaded) {
            all_loaded = false;
            break;
        }
    }

    if (all_loaded) {
        console.warn("kvs all loaded");
        clearInterval(all_loaded_detection);
        start();
    }
}, 100);

function start() {
    // kvs start animation
    for (let [kv, attr] of Object.entries(kvs)) {
        setTimeout(() => {
            attr.tween_start1.play();
            attr.tween_start2.play();
        }, 1000 + (attr.start.delay || 0));
        setTimeout(() => attr.tween_start0.play(), 1050 + (attr.start.delay || 0));
    }
}

// // Mouse
// $.mouse = function (e) {

//     let wr = e.clientX / width;
//     let hr = e.clientY / height;

//     let kv_xChangeRate = $.kv_chara_change_rate_x * 1.0;
//     let kv_yChangeRate = $.kv_chara_change_rate_y * 1.0;

//     if (wr <= $.kv_stand_ratio[0]) {
//         let wr_rate = wr;
//         $.kv_x_stand[0] = e.clientX * wr_rate * $.global_outstandRatio[0] * -1;
//         $.kv_x_stand[1] = 0;
//         $.kv_x_stand[2] = 0;
//     } else if (wr <= $.kv_stand_ratio[1]) {
//         let wr_rate = wr - $.kv_stand_ratio[0];
//         $.kv_x_stand[0] = e.clientX * $.kv_stand_ratio[0] * $.global_outstandRatio[0] * -1;
//         $.kv_x_stand[1] = e.clientX * wr_rate * $.global_outstandRatio[1] * -1;
//         $.kv_x_stand[2] = 0;
//     } else if (wr <= $.kv_stand_ratio[2]) {
//         let wr_rate = wr - $.kv_stand_ratio[1];
//         $.kv_x_stand[0] = e.clientX * $.kv_stand_ratio[0] * $.global_outstandRatio[0] * -1;
//         $.kv_x_stand[1] = e.clientX * ($.kv_stand_ratio[1] - $.kv_stand_ratio[0]) * $.global_outstandRatio[1] * -1;
//         $.kv_x_stand[2] = e.clientX * wr_rate * $.global_outstandRatio[2] * -1;
//     }

//     let kv_charas_x = e.clientX * kv_xChangeRate * -1;
//     let kv_charas_y = e.clientY * kv_yChangeRate * -1;
//     $.kv_chara.forEach(kv => {
//         let kv_chara_x = (kv_charas_x + $.kv_x_stand[kv.attrs.index]) * -1;
//         let kv_chara_y = kv_charas_y * -1;

//         if ($.global_smooth_movement) {
//             if ($.kv_chara_tween[kv.attrs.index]) {
//                 $.kv_chara_tween[kv.attrs.index].finish();
//             }
//             $.kv_chara_tween[kv.attrs.index] = new Konva.Tween({
//                 node: kv,
//                 duration: 3,
//                 offsetX: kv_chara_x,
//                 offsetY: kv_chara_y,
//                 easing: Konva.Easings.StrongEaseOut,
//             });
//             $.kv_chara_tween[kv.attrs.index].play();
//         } else {
//             kv.offsetX(kv_chara_x);
//             kv.offsetY(kv_chara_y);
//             kvs_layer.batchDraw();
//         }
//     });

//     let kv_bg_x = e.clientX * $.kv_bg_change_rate_x * -1;
//     let kv_bg_y = e.clientY * $.kv_bg_change_rate_y * -1;
//     if ($.global_smooth_movement) {
//         if ($.kv_bg_tween) {
//             $.kv_bg_tween.finish();
//         }
//         $.kv_bg_tween = new Konva.Tween({
//             node: $.kv_bg,
//             duration: 3,
//             offsetX: kv_bg_x,
//             offsetY: kv_bg_y,
//             easing: Konva.Easings.StrongEaseOut,
//         });
//         $.kv_bg_tween.play();
//     } else {
//         $.kv_bg.offsetX(kv_bg_x);
//         $.kv_bg.offsetY(kv_bg_y);
//         kv_bg_layer.batchDraw();
//     }

// };
// $(document).on('mousemove', $.mouse);

