
$('body').append(`<div class="special event"></div>`);

$.events = [
    {
        "key": "story-1",
        "type": "illust",
        "display": "idle",
        "charatype": "story",
        "charaface": ["miyuki", "tatsuya", "angie"],
        "show": false
    }, {
        "key": "story-2",
        "type": "illust",
        "display": "idle",
        "charatype": "story",
        "charaface": ["erika", "mikihiko"],
        "show": false
    }, {
        "key": "story-3",
        "type": "illust",
        "display": "idle",
        "charatype": "story",
        "charaface": ["shizuku"],
        "show": false
    }, {
        "key": "story-4",
        "type": "illust",
        "display": "idle",
        "charatype": "story",
        "charaface": ["mikihiko", "mizuki"],
        "show": false
    }, {
        "key": "story-5",
        "type": "illust",
        "display": "idle",
        "charatype": "story",
        "charaface": ["miyuki", "lina-kimono", "honoka"],
        "show": false
    }, {
        "key": "story-6",
        "type": "illust",
        "display": "idle",
        "charatype": "story",
        "charaface": ["tatsuya", "angie"],
        "show": false
    }, {
        "key": "story-7",
        "display": "idle",
        "charatype": "story",
        "charaface": [["miyuki", "tatsuya"], ["lina-kimono", "lina", "angie"], ["erika", "leo"], ["mizuki", "mikihiko"], ["honoka", "shizuku"]],
        "text": ["シーズン 2 終了おめでとうございます!", "来访者篇 动画完结撒花！", "Congrats on the End of Season!"],
        "show": false,
    }, {
        "key": "miyuki",
        "type": "birthday",
        "month": 3,
        "day": 25,
        "name": [["司波", "深雪"], ["司波", "深雪"], ["Shiba", "Miyuki"]]
    }, {
        "key": "tatsuya",
        "type": "birthday",
        "month": 4,
        "day": 24,
        "name": [["司波", "達也"], ["司波", "达也"], ["Shiba", "Tatsuya"]]
    }, {
        "key": "mayumi",
        "type": "birthday",
        "month": 6,
        "day": 26,
        "name": [["七草", "真由美"], ["七草", "真由美"], ["Saegusa", "Mayumi"]]
    }, {
        "key": "erika",
        "type": "birthday",
        "month": 8,
        "day": 28,
        "name": [["千葉", "エリカ"], ["千叶", "艾莉卡"], ["Chiba", "Erika"]]
    }, {
        "key": "leo",
        "type": "birthday",
        "month": 8,
        "day": 1,
        "name": [["西城", "レオンハルト"], ["西城", "雷欧赫特"], ["Saijo", "Leonhard"]]
    }, {
        "key": "mikihiko",
        "type": "birthday",
        "month": 9,
        "day": 10,
        "name": [["吉田", "幹比古"], ["吉田", "干比古"], ["Yoshida", "Mikihiko"]]
    }, {
        "key": "mizuki",
        "type": "birthday",
        "month": 9,
        "day": 25,
        "name": [["柴田", "美月"], ["柴田", "美月"], ["Shibata", "Mizuki"]]
    }, {
        "key": "halloween-8",
        "month": 10,
        "day": 24,
        "charatype": "halloween",
        "charaface": "azusa",
        "text": ["ハッピーハロウィンウィーク！", "万圣周快乐！", "Happy Halloween Week!"]
    }, {
        "key": "halloween-7",
        "month": 10,
        "day": 25,
        "charatype": "halloween",
        "charaface": "honoka",
        "text": ["ハッピーハロウィンウィーク！", "万圣周快乐！", "Happy Halloween Week!"]
    }, {
        "key": "halloween-6",
        "month": 10,
        "day": 26,
        "charatype": "halloween",
        "charaface": "mari",
        "text": ["ハッピーハロウィンウィーク！", "万圣周快乐！", "Happy Halloween Week!"]
    }, {
        "key": "halloween-5",
        "month": 10,
        "day": 27,
        "charatype": "halloween",
        "charaface": "shizuku",
        "text": ["ハッピーハロウィンウィーク！", "万圣周快乐！", "Happy Halloween Week!"]
    }, {
        "key": "halloween-4",
        "month": 10,
        "day": 28,
        "charatype": "halloween",
        "charaface": "erika",
        "text": ["ハッピーハロウィンウィーク！", "万圣周快乐！", "Happy Halloween Week!"]
    }, {
        "key": "halloween-3",
        "month": 10,
        "day": 29,
        "charatype": "halloween",
        "charaface": "lina",
        "text": ["ハッピーハロウィンウィーク！", "万圣周快乐！", "Happy Halloween Week!"]
    }, {
        "key": "halloween-2",
        "month": 10,
        "day": 30,
        "charatype": "halloween",
        "charaface": "miyuki",
        "text": ["ハッピーハロウィンウィーク！", "万圣周快乐！", "Happy Halloween Week!"]
    }, {
        "key": "halloween-1",
        "year": 2095,
        "month": 10,
        "day": 31,
        "showDate": true,
        "charatype": "halloween",
        "charaface": "tatsuya",
        "text": ["灼熱のハロウィン", "烧焦的万圣节", "Scorched Halloween"]
    }, {
        "key": "enrollment-day",
        "year": 2095,
        "month": 4,
        "day": 3,
        "showDate": true,
        "name": "enrollment-day",
        "charatype": "charaface",
        "charaface": "miyuki",
        "text": ["シブリングスクールの日", "兄妹入学日", "Enrollment Day"]
    }, {
        "key": "first-meet-lina",
        "year": 2096,
        "month": 1,
        "day": 1,
        "showDate": true,
        "charatype": "story",
        "charaface": "lina-kimono",
        "text": ["初対面のレナ。", "初见莉娜", "First meet, Lina"]
    }, {
        "key": "succession",
        "year": 2096,
        "month": 12,
        "day": 31,
        "showDate": true,
        "charatype": "story",
        "charaface": ["miyuki", "tatsuya"],
        "text": ["相続。婚約。", "继承。婚约。", "Succession. Engagement."]
    }, {
        "key": "graduation-class-2096",
        "display": "idle",
        "charatype": "uniform",
        "charaface": [["mari", "mayumi"], ["katsuto", "suzune"]],
        "text": ["<span class='date'>2 0 9 6 年</span>卒業おめでとう！", "<span class='date'>第 2096 届</span>恭喜毕业！", "<span class='date'>Class 2096</span>Congrats on Graduation!"],
        "show": false,
    }, {
        "key": "anniversary",
        "type": "illust",
        "display": "idle",
        "charatype": "10th-anniversary",
        "charaface": "10th-anniversary",
        "show": false,
    }
];

$.months = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
];



$.events.makeCard = function (each) {
    let date = `${each.year ? each.year + "年" : ""}${each.month}月${each.day}日 // ${each.year ? each.year + "年" : ""}${each.month}月${each.day}日 // ${$.months[each.month - 1]} ${each.day}${each.year ? ", " + each.year : ""}`;
    return `
    <div class="${each.type} ${each.key} card ${each.hasSideChara && !each.hasIllust ? "has-side-chara" : ""}">
        <div class="card-body">
            <span class="chara ${each.charatype}" style="background-image: url('chara/${each.charatype}/${each.charaface}.png')" ></span>
            <span class="date ${each.showDate ? `` : `hide`}" i18n>${date}</span>
            <span class="text" i18n>${each.text.join("//")}</span>
        </div>
    </div>`;
}

$.events.makeEvent = function (each) {
    let html = ``;
    each.type = "event";
    if (Array.isArray(each.charaface) && each.charaface.length > 0) {
        each.hasIllust = true;
        each.hasIllustGroup = false;
        each.hasSideChara = false;
        html += $.events.makeIllust(each);
    } else if (each.charatype == "charaface") {
        each.hasIllust = false;
        each.hasIllustGroup = false;
        each.illustGroupAmount = 1;
        each.hasSideChara = true;
    } else if (each.charaface) {
        each.hasIllust = true;
        each.hasIllustGroup = false;
        each.illustGroupAmount = 1;
        each.hasSideChara = true;
        html += $.events.makeIllust(each);
    } else {
        each.hasIllust = false;
        each.hasIllustGroup = false;
        each.illustGroupAmount = 1;
        each.hasSideChara = false;
    }
    html += $.events.makeCard(each);
    return html;
}

$.events.makeBirthday = function (each) {
    each.charatype = "charaface";
    each.showDate = true;
    each.charaface = each.key;
    each.hasSideChara = true;
    each.hasIllust = false;
    each.hasIllustGroup = false;
    each.illustGroupAmount = 1;
    each.text = [`${each.name[0][1]}の誕生日おめでとう！`, `${each.name[1][1]}生日快乐！`, `Happy ${each.name[2][1]} Day!`];
    return $.events.makeCard(each);
}

$.events.makeIllust = function (each) {
    let charaGroups = [];
    if (Array.isArray(each.charaface) && each.charaface.length > 0 && Array.isArray(each.charaface[0])) {
        charaGroups = each.charaface;
        each.hasIllustGroup = true;
        each.illustGroupAmount = each.charaface.length;
    } else if (Array.isArray(each.charaface)) {
        each.hasIllustGroup = false;
        each.illustGroupAmount = 1;
        charaGroups = [each.charaface];
    } else if (each.charaface) {
        each.hasIllustGroup = false;
        each.illustGroupAmount = 1;
        charaGroups = [[each.charaface]];
    }

    let groupIndex = 0;
    let html = "";
    charaGroups.forEach(charaGroup => {
        html += `<div class="illust ${each.key} ${each.charatype} ${groupIndex}">`;
        charaGroup.forEach(chara => {
            html += `<span class="charaface ${chara}" style="background-image: url('chara/${each.charatype}/${chara}.png');"></span>`
        });
        html += `</div>`;

        groupIndex++;
    })

    return html;
}


// Contruct all events
$.events.forEach(each => {
    if ((each.month && each.day) || (each.month && each.day && each.year)) {
        each.display = "force";
    }

    if (each.type == "birthday") {
        each.html = $.events.makeBirthday(each);
    } else if (each.type == "illust") {
        each.html = $.events.makeIllust(each);
    } else {
        each.html = $.events.makeEvent(each);
    }

    if (each.type == "illust") {
        each.priority = 500;
    } else if (each.hasIllust && !each.hasSideChara && each.display != "idle") {
        each.priority = 900;
    } else if (each.hasIllust && each.hasSideChara && each.display != "idle") {
        each.priority = 700;
    } else {
        each.priority = 100;
    }
});

// Sort events by priority
$.events.sort((a, b) => {
    return b.priority - a.priority;
});

// Append to html
$.events.forEach(each => {
    $('.special.event').append(each.html);
});

$.events.date = function () {
    let today = new Date();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // month = 12, day = 31;
    return [month, day];
}

$.events.on = []

// Current displaying events and their arrangement
$.events.onIndex = 0;
$.events.onTimeTick = -1;

$.events.listEventsOn = function (kickIdle = false) {
    let [month, day] = $.events.date();

    $.events.forEach(each => {
        if ((each.month == month && each.day == day) || (each.show)) {
            if (kickIdle && each.display == "force") {
                $.events.on.push(each);
            } else if (!kickIdle) {
                $.events.on.push(each);
            }
        }
    });
}

$.events.interval = function () {

    // List all events
    $.events.on = []
    $.events.listEventsOn(true);
    if ($.events.on.length == 0) {
        $.events.listEventsOn(false);
    }

    // Display specials
    $.events.onTimeTick++;
    let switchSecond = 30; // amount of seconds to switch specials
    if ($.events.onTimeTick % switchSecond == 0) {
        $.events.onTimeTick = 0;

        let majorIndex = Math.floor($.events.onIndex);
        let current = $.events.on[majorIndex];

        let minorIndex = Math.floor(($.events.onIndex - majorIndex) * 100) / 100;
        minorIndex = Math.ceil(minorIndex * current.illustGroupAmount);

        let newMinor = (minorIndex + 1) / current.illustGroupAmount;
        $.events.onIndex = majorIndex + newMinor;
        $.events.onIndex %= $.events.on.length;

        let id = `.special.event .${current.type}.${current.key}`;
        let illust_id = `.special.event .illust.${current.key}.${minorIndex}`;

        $.events.forEach(each => {
            let each_id = `.special.event .${each.type}.${each.key}`;
            let each_illust_id = `.special.event .illust.${each.key}`;

            if (each_id != id) {
                $(each_id).hide().removeClass("is-op");
                $.console.special_event(each, false);
            }

            $(each_illust_id).each(each_illust => {
                if (`${each_illust_id}.${each_illust}` != illust_id) {
                    $(each_illust_id).hide().removeClass("is-op");
                    $.console.special_event(each, false);
                }
            });
        })

        $(id).show().addClass("is-op");
        $(illust_id).show().addClass("is-op");
        $.console.special_event(current, true);
    }

};

setTimeout(function () {
    $.events.interval();
    setInterval(() => {
        $.events.interval();
    }, 1000);
}, 3000);