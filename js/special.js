
$('body').append(`<div class="special event"></div>`);

$.events = [
    {
        "key": "1",
        "type": "story",
        "charaface": ["miyuki", "tatsuya", "angie"],
        "show": false
    }, {
        "key": "2",
        "type": "story",
        "charaface": ["erika", "mikihiko"],
        "show": false
    }, {
        "key": "3",
        "type": "story",
        "charaface": ["shizuku"],
        "show": false
    }, {
        "key": "4",
        "type": "story",
        "charaface": ["mikihiko", "mizuki"],
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
        "name": "halloween",
        "charaface": "azusa",
        "text": ["ハッピーハロウィンウィーク！", "万圣节周快乐！", "Happy Halloween Week!"]
    },
    {
        "key": "halloween7",
        "month": 10,
        "day": 25,
        "name": "halloween",
        "charaface": "honoka",
        "text": ["ハッピーハロウィンウィーク！", "万圣节周快乐！", "Happy Halloween Week!"]
    },
    {
        "key": "halloween6",
        "month": 10,
        "day": 26,
        "name": "halloween",
        "charaface": "mari",
        "text": ["ハッピーハロウィンウィーク！", "万圣节周快乐！", "Happy Halloween Week!"]
    },
    {
        "key": "halloween5",
        "month": 10,
        "day": 27,
        "name": "halloween",
        "charaface": "shizuku",
        "text": ["ハッピーハロウィンウィーク！", "万圣节周快乐！", "Happy Halloween Week!"]
    },
    {
        "key": "halloween4",
        "month": 10,
        "day": 28,
        "name": "halloween",
        "charaface": "erika",
        "text": ["ハッピーハロウィンウィーク！", "万圣节周快乐！", "Happy Halloween Week!"]
    },
    {
        "key": "halloween3",
        "month": 10,
        "day": 29,
        "name": "halloween",
        "charaface": "lina",
        "text": ["ハッピーハロウィンウィーク！", "万圣节周快乐！", "Happy Halloween Week!"]
    },
    {
        "key": "halloween2",
        "month": 10,
        "day": 30,
        "name": "halloween",
        "charaface": "miyuki",
        "text": ["ハッピーハロウィンウィーク！", "万圣节周快乐！", "Happy Halloween Week!"]
    },
    {
        "key": "halloween1",
        "month": 10,
        "day": 31,
        "showDate": true,
        "name": "halloween",
        "charaface": "tatsuya",
        "text": ["灼熱のハロウィン", "烧焦的万圣节", "Scorched Halloween"]
    }
];

$.months = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December'
];


// Special Event
$.events.forEach(each => {
    let html = ``;
    let date = `${each.month}月${each.day}日 // ${each.month}月${each.day}日 // ${$.months[each.month - 1]} ${each.day}`;
    if (each.type == "birthday") {
        html = `
        <div class="birthday ${each.key}" style="display: none;">
            <span class= "charaface" style="background-image: url('charaface/${each.key}.png')" ></span>
            <span class="date" i18n>` + date + `</span>
            <span class="text" i18n>${each.name[0][1]}の誕生日おめでとう！ // ${each.name[1][1]}生日快乐！ // Happy ${each.name[2][1]} Day!</span>
        </div >`;
    } else if (each.type == "story") {
        html += `<div class="story ${each.key}" style="display: none;">`;
        each.charaface.forEach(chara => html += `<span class="charaface ${chara}" style="background-image: url('chara/story/${chara}.png');"></span>`);
        html += `</div>`;
    } else {
        each.type = 'event';
        html = `
        <div class="event ${each.key}" style="display: none;">
            <span class= "charaface" style="background-image: url('chara/${each.name}/${each.charaface}.png')" ></span>
            <span class="date ${each.showDate ? `` : `hide`} + " i18n>${date}</span>
            <span class="text" i18n>${each.text.join("//")}</span>
        </div >`;
    }
    $('.special.event').append(html);
});

// Special
setInterval(function () {
    let today = new Date();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // month = 10, day = 28;

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