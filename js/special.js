
$('body').append(`<div class="special event"></div>`);

$.events = [
    {
        "key": "story-1",
        "type": "illust",
        "charaface": ["miyuki", "tatsuya", "angie"],
        "show": false
    }, {
        "key": "story-2",
        "type": "illust",
        "charaface": ["erika", "mikihiko"],
        "show": false
    }, {
        "key": "story-3",
        "type": "illust",
        "charaface": ["shizuku"],
        "show": false
    }, {
        "key": "story-4",
        "type": "illust",
        "charaface": ["mikihiko", "mizuki"],
        "show": false
    }, {
        "key": "story-5",
        "type": "illust",
        "charaface": ["miyuki", "lina-kimono", "honoka"],
        "show": true
    },
    {
        "key": "miyuki",
        "type": "birthday",
        "month": 3,
        "day": 25,
        "name": [["司波", "深雪"], ["司波", "深雪"], ["Shiba", "Miyuki"]]
    },
    {
        "key": "tatsuya",
        "type": "birthday",
        "month": 4,
        "day": 24,
        "name": [["司波", "達也"], ["司波", "达也"], ["Shiba", "Tatsuya"]]
    },
    {
        "key": "mayumi",
        "type": "birthday",
        "month": 6,
        "day": 26,
        "name": [["七草", "真由美"], ["七草", "真由美"], ["Saegusa", "Mayumi"]]
    },
    {
        "key": "erika",
        "type": "birthday",
        "month": 8,
        "day": 28,
        "name": [["千葉", "エリカ"], ["千叶", "艾莉卡"], ["Chiba", "Erika"]]
    },
    {
        "key": "leo",
        "type": "birthday",
        "month": 8,
        "day": 1,
        "name": [["西城", "レオンハルト"], ["西城", "雷欧赫特"], ["Saijo", "Leonhard"]]
    },
    {
        "key": "mikihiko",
        "type": "birthday",
        "month": 9,
        "day": 10,
        "name": [["吉田", "幹比古"], ["吉田", "干比古"], ["Yoshida", "Mikihiko"]]
    },
    {
        "key": "mizuki",
        "type": "birthday",
        "month": 9,
        "day": 25,
        "name": [["柴田", "美月"], ["柴田", "美月"], ["Shibata", "Mizuki"]]
    },
    {
        "key": "halloween8",
        "month": 10,
        "day": 24,
        "charatype": "halloween",
        "charaface": "azusa",
        "text": ["ハッピーハロウィンウィーク！", "万圣节周快乐！", "Happy Halloween Week!"]
    },
    {
        "key": "halloween7",
        "month": 10,
        "day": 25,
        "charatype": "halloween",
        "charaface": "honoka",
        "text": ["ハッピーハロウィンウィーク！", "万圣节周快乐！", "Happy Halloween Week!"]
    },
    {
        "key": "halloween6",
        "month": 10,
        "day": 26,
        "charatype": "halloween",
        "charaface": "mari",
        "text": ["ハッピーハロウィンウィーク！", "万圣节周快乐！", "Happy Halloween Week!"]
    },
    {
        "key": "halloween5",
        "month": 10,
        "day": 27,
        "charatype": "halloween",
        "charaface": "shizuku",
        "text": ["ハッピーハロウィンウィーク！", "万圣节周快乐！", "Happy Halloween Week!"]
    },
    {
        "key": "halloween4",
        "month": 10,
        "day": 28,
        "charatype": "halloween",
        "charaface": "erika",
        "text": ["ハッピーハロウィンウィーク！", "万圣节周快乐！", "Happy Halloween Week!"]
    },
    {
        "key": "halloween3",
        "month": 10,
        "day": 29,
        "charatype": "halloween",
        "charaface": "lina",
        "text": ["ハッピーハロウィンウィーク！", "万圣节周快乐！", "Happy Halloween Week!"]
    },
    {
        "key": "halloween2",
        "month": 10,
        "day": 30,
        "charatype": "halloween",
        "charaface": "miyuki",
        "text": ["ハッピーハロウィンウィーク！", "万圣节周快乐！", "Happy Halloween Week!"]
    },
    {
        "key": "halloween1",
        "month": 10,
        "day": 31,
        "showDate": true,
        "charatype": "halloween",
        "charaface": "tatsuya",
        "text": ["灼熱のハロウィン", "烧焦的万圣节", "Scorched Halloween"]
    },
    {
        "key": "enrollment-day",
        "year": 2095,
        "month": 4,
        "day": 3,
        "name": "enrollment-day",
        "charatype": "charaface",
        "charaface": "miyuki",
        "text": ["シブリングスクールの日！", "兄妹入学日！", "Sibling Enrollment Day!"]
    },
    {
        "key": "first-meet-lina",
        "year": 2096,
        "month": 1,
        "day": 1,
        "showDate": true,
        "charatype": "story",
        "charaface": "lina-kimono",
        "text": ["初対面のレナ。", "初见莉娜", "First meet Lina"]
    },
    {
        "key": "succession",
        "year": 2096,
        "month": 12,
        "day": 31,
        "showDate": true,
        "charatype": "story",
        "charaface": ["miyuki", "tatsuya"],
        "text": ["相続。婚約。", "继承。订婚。", "Succession. Engagement."]
    }
];

$.months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
];



$.events.makeCard = function (each) {
    let date = `${each.year ? each.year + "年" : ""}${each.month}月${each.day}日 // ${each.year ? each.year + "年" : ""}${each.month}月${each.day}日 // ${$.months[each.month - 1]} ${each.day}${each.year ? ", " + each.year : ""}`;
    return `
    <div class="${each.type} ${each.key} ${Array.isArray(each.charaface) || !each.charaface ? "" : "has-side-chara"} card" style="display: none;">
        <span class= "chara ${each.charatype}" style="background-image: url('chara/${each.charatype}/${each.charaface}.png')" ></span>
        <span class="date ${each.showDate ? `` : `hide`} + " i18n>${date}</span>
        <span class="text" i18n>${each.text.join("//")}</span>
    </div>`;
}

$.events.makeEvent = function (each) {
    return $.events.makeCard(each);
}

$.events.makeBirthday = function (each) {
    each.charatype = "charaface";
    each.showDate = true;
    each.charaface = each.key;
    each.text = [`${each.name[0][1]}の誕生日おめでとう！`, `${each.name[1][1]}生日快乐！`, `Happy ${each.name[2][1]} Day!`];
    return $.events.makeEvent(each);
}

$.events.makeIllust = function (each) {
    html = `<div class="illust ${each.key}" style="display: none;">`;
    each.charaface.forEach(chara => html += `<span class="charaface-full ${chara}" style="background-image: url('chara/story/${chara}.png');"></span>`);
    html += `</div>`;
    return html;
}


// Special Event
$.events.forEach(each => {
    let html = ``;
    let date = `${each.year ? each.year + "年" : ""}${each.month}月${each.day}日 // ${each.year ? each.year + "年" : ""}${each.month}月${each.day}日 // ${$.months[each.month - 1]} ${each.day}${each.year ? ", " + each.year : ""}`;
    if (each.type == "birthday") {
        html = $.events.makeBirthday(each);
    } else if (each.type == "illust") {
        html = $.events.makeIllust(each);
    } else {
        each.type = "event";
        html = $.events.makeEvent(each);
    }
    $('.special.event').append(html);
});

// Special
setInterval(function () {
    let today = new Date();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = 12, day = 31;

    $.events.forEach(each => {
        let id = `.special.event .${each.type}.${each.key}`;
        if ((each.month == month && each.day == day) || each.show) {
            $(id).fadeIn();
            $.console.special_event(each, true);
        } else {
            $(id).fadeOut();
            $.console.special_event(each, false);
        }
    });
}, 1000);