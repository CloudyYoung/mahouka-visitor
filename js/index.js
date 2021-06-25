
let kv_stand_ratio = [0.33, 0.66, 0.99];

let kv_chara_change_rate = 0.04;
let kv_chara_stand_rate = 0.03;
let kv_chara_stand_range = 1;
let kv_bg_change_rate = 0.02;


$('body').append(`<div class="konva"></div>`);


let width = window.screen.width;
let height = window.screen.height;


// testing
if (window.location.hash && window.location.hash == "#debug") {
    // height = 500;
    // width = 1200;
}


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
let kv_bg_height = kv_real_height * (kv_bg_width / kv_real_width);

let kv_chara_change_px_x = kv_chara_change_rate * width;
let kv_chara_change_px_y = kv_chara_change_rate * height;

let kvs = {
    // bg
    "kv_bg": {
        origin: { zIndex: 0 },
        start: { scale: 1.6, delay: 150 }
    },

    // charas
    // x: the distance to the right side, y: default the bottom
    "kv_chara_01_crop": {
        origin: { width: 1121, height: 1390, x: 1189, zIndex: 1 },
        start: { x: kv_chara_width * -0.2, y: kv_chara_height * 0.1, delay: 400 },
        move: { stand: 0.0001 },
    },
    "kv_chara_02_crop": {
        origin: { width: 1650, height: 1750, x: 360, zIndex: 2 },
        start: { y: kv_chara_height * 0.15, delay: 600 },
        move: { stand: 0.3 },
    },
    "kv_chara_03_crop": {
        origin: { width: 1330, height: 1832, x: 0, zIndex: 3 },
        start: { x: kv_chara_width * 0.2, y: kv_chara_height * 0.1, delay: 800 },
        move: { stand: 0.6 },
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

    if (is_bg) {
        let kv_move_x = width * kv_chara_change_rate;
        let kv_move_y = height * (kv_move_x / kv_chara_width);
        kv_width = kv_bg_width + kv_move_x;
        kv_height = kv_bg_height + kv_move_y;
    } else {
        // kv_move_x and kv_move_y was originally both width * rate and height * rate
        // but then the image ratio is broken since width/height are different across device
        // so if kv_move_x has added, the same amount of ratio is increased to kv_move_y as well
        // but then the kv_move_y is always greater than height * rate, so the lower part of the image
        // will never be visible, thus we negate the invisible part to kv_y
        let kv_move_x = width * kv_chara_change_rate;
        let kv_move_y = height * (kv_move_x / kv_chara_width);
        let kv_move_y_original = height * kv_chara_change_rate;
        kv_y -= kv_move_y - kv_move_y_original;
        kv_width += kv_move_x;
        kv_height += kv_move_y;
    }

    // Cancel stand pixel
    if (attr.move && attr.move.stand) {
        kv_x += stand(attr);
    }

    attr.konva_kv = new Konva.Image({
        image: kv_img,
        width: kv_width,
        height: kv_height,
        opacity: attr.origin.opacity || 1,
        globalCompositeOperation: attr.origin.globalCompositeOperation || "",
        x: kv_x,
        y: kv_y,
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
    attr.tween_start1 = new Konva.Tween(Object.assign({}, konva_groups_tween, { node: attr.konva_group1, onFinish: () => attr.tween_start1.destroy() }));
    attr.tween_start2 = new Konva.Tween(Object.assign({}, konva_groups_tween, { node: attr.konva_group2, onFinish: () => attr.tween_start2.destroy() }));

    // Start opacity
    attr.tween_start0 = new Konva.Tween({
        node: attr.konva_group0,
        duration: attr.start.opacityDuration || 0.4,
        opacity: 1,
        easing: Konva.Easings.EaseInOut,
        onFinish: () => attr.tween_start0.destroy(),
    });
}

setTimeout(() => kvs_layer.batchDraw(), 1500);


function mahouka_bezier(t, b, c, d) {
    let a = bezier(0.01, 0.9, 0, 0.79);
    return b + a(t / d) / c;
}



// bg_dust initialize
let dust_group = new Konva.Group();
kvs_layer.add(dust_group);
dust_group.zIndex(1); // only above kv_bg
dust_group.opacity(0);

let dusts = {
    "bg_dust_01": {
        origin: { width: 160, height: 117 },
    },
    "bg_dust_02": {
        origin: { width: 134, height: 117 },
    },
    "bg_dust_03": {
        origin: { width: 131, height: 128 },
    },
    "bg_dust_04": {
        origin: { width: 168, height: 136 },
    },
};

for (let [dust, attr] of Object.entries(dusts)) {
    let kv_img = new Image();
    kv_img.src = `img/${dust}.png`;
    attr.image = kv_img;
    kv_img.onload = function () {
        attr.loaded = true;
    }
}

function generate_dust() {

    let rand = Math.floor(Math.random() * 10000 + 1000);
    let remainder = rand % 5;
    let dust = null;

    if (remainder == 0) {
        dust = dusts["bg_dust_01"];
    } else if (remainder == 1) {
        dust = dusts["bg_dust_02"];
    } else if (remainder == 2) {
        dust = dusts["bg_dust_03"];
    } else if (remainder == 3) {
        dust = dusts["bg_dust_04"];
    } else {
        return;
    }

    let duration = Math.random() * 10 + 8;
    let dust_height = dust.origin.height * (kv_chara_height / kv_real_height);
    let dust_width = dust.origin.width * (dust_height / dust.origin.height);
    let offset_x = Math.random() * width;
    let from_x = width;
    let from_y = -dust_height;
    let to_x = -dust_width;
    let to_y = (from_x - to_x) * 0.5;

    let konva_dust = new Konva.Image({
        image: dust.image,
        width: dust_width,
        height: dust_height,
        x: from_x,
        y: from_y,
        offsetX: offset_x,
        opacity: 0.8,
    });
    dust_group.add(konva_dust);

    konva_dust.to({
        duration: duration,
        x: to_x,
        y: to_y,
        onFinish: () => konva_dust.destroy(),
    });
}


// particles
let kv_particle = {};
kv_particle.image = new Image();
kv_particle.image.src = `img/particle.png`;
kv_particle.image.onload = function () {
    kv_particle.loaded = true;
}

let particle_group = new Konva.Group();
particle_group.opacity(0);
kvs_layer.add(particle_group);

function generate_particle() {
    let from_size = Math.random() * 10 % (height * 0.010) + (height * 0.002);
    let from_x = Math.random() * width;
    let from_y = Math.random() * 100 + height + from_size;
    let from_opacity = Math.random() % 0.5 + 0.2;

    let duration = Math.random() * 20 + 10;
    let to_size = from_size * Math.random() % 0.6;
    let factor = Math.floor(Math.random() * 10 % 2 - 0.5) == -1 ? -1 : 1;
    let to_x = (Math.random() * width) % (width * 0.2) * factor + from_x;
    let to_y = -from_size - Math.random() * 100;
    let to_opacity = from_opacity * (Math.random() % 0.6);

    let konva_particle = new Konva.Image({
        image: kv_particle.image,
        width: from_size,
        height: from_size,
        x: from_x,
        y: from_y,
        opacity: from_opacity,
    });
    particle_group.add(konva_particle);

    konva_particle.to({
        duration: duration,
        width: to_size,
        height: to_size,
        x: to_x,
        y: to_y,
        opacity: to_opacity,
        onFinish: () => konva_particle.destroy(),
    });
}


// All loaded starting
let all_loaded_detection = setInterval(() => {
    for (let [kv, attr] of Object.entries(Object.assign({}, kvs, dusts, { "particle": kv_particle }))) {
        if (!attr.loaded) {
            console.log("waiting on kv", kv);
            return;
        }
    }

    console.warn("kvs all loaded");
    clearInterval(all_loaded_detection);
    start();
}, 100);

function start() {
    // kvs start animation
    for (let [kv, attr] of Object.entries(kvs)) {
        setTimeout(() => {
            attr.tween_start1.play();
            attr.tween_start2.play();
        }, 3000 + (attr.start.delay || 0));
        setTimeout(() => attr.tween_start0.play(), 3050 + (attr.start.delay || 0));
        setTimeout(() => $(".bg_canvas").removeClass("transparent").fadeIn(1000), 3500 + (attr.start.delay || 0));
    }

    setTimeout(() => {
        dust_tween = new Konva.Tween({
            node: dust_group,
            duration: 3,
            opacity: 1,
            easing: mahouka_bezier,
            onFinish: () => dust_tween.destroy(),

        });
        particle_tween = new Konva.Tween({
            node: particle_group,
            duration: 3,
            opacity: 1,
            easing: mahouka_bezier,
            onFinish: () => particle_tween.destroy(),
        });
        dust_tween.play();
        particle_tween.play();
    }, 3400);

    setInterval(generate_dust, 3000);
    setInterval(generate_particle, 80);
}

// x: 0 ~ 1
// y: 0 ~ 1
// https://www.desmos.com/calculator/iho6ahbmg4
function g(x) {
    let y = Math.pow(x - 1, 3) + 1;
    return y;
}

function stand(attr, wr = 1) {
    let distance = wr - attr.move.stand;

    if (distance >= 0) {
        distance = Math.min(distance, kv_chara_stand_range);

        let x = distance / kv_chara_stand_range;
        let y = g(x);
        return y * kv_chara_width * kv_chara_stand_rate;
    } else {
        return 0;
    }
}


// Mouse
$.mouse = function (e) {

    let x = e.clientX * kv_chara_change_rate;
    let y = e.clientY * kv_chara_change_rate;

    let start_x = width - kv_chara_width;
    let wr = (e.clientX - start_x) / kv_chara_width;

    for (let [kv, attr] of Object.entries(kvs)) {
        let total_x = x;
        let total_y = y;

        // kv chara stand
        if (attr.move && attr.move.stand) {
            total_x += stand(attr, wr);
        }

        attr.konva_kv.offsetX(total_x * 0.55);
        attr.konva_kv.offsetY(total_y * 0.55);

        attr.konva_move.to({
            duration: 20,
            offsetX: total_x * 0.45,
            offsetY: total_y * 0.45,
            easing: mahouka_bezier,
        });
    }

    dust_group.offsetX(x * 0.2);
    dust_group.offsetY(y * 0.2);

    // TODO: Flare rotate
};
$(document).on('mousemove', $.mouse);


document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        console.warn("body loaded");
    }
};