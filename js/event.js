$(".widget").append(`<div class="events"></div>`);

$.events = [
    {
        key: "miyuki",
        type: "birthday",
        month: 3,
        day: 25,
        name: {
            full: ["司波 深雪", "司波 深雪", "Miyuki Shiba"],
            prefer: ["深雪", "深雪", "Miyuki"],
        },
    },
    {
        key: "tatsuya",
        type: "birthday",
        month: 4,
        day: 24,
        name: {
            full: ["司波 達也", "司波 达也", "Tatsuya Shiba"],
            prefer: ["達也", "达也", "Tatsuya"],
        },
    },
    {
        key: "lina",
        type: "birthday",
        month: 1,
        day: 4,
        charaface: [
            ["lina", "lina-tall"],
            ["angie", "angie-tall"]
        ],
        name: {
            full: ["アンジェリーナ・クドウ・シールズ", "安吉莉娜 库都 希尔兹", "Angelina Kudou Shields"],
            prefer: ["リーナ", "莉娜", "Lina"],
        },
    },
    {
        key: "mayumi",
        type: "birthday",
        month: 6,
        day: 26,
        name: {
            full: ["七草 真由美", "七草 真由美", "Mayumi Saegusa"],
            prefer: ["真由美", "真由美", "Mayumi"],
        },
    },
    {
        key: "erika",
        type: "birthday",
        month: 8,
        day: 28,
        name: {
            full: ["千葉 エリカ", "千叶 艾莉卡", "Erika Chiba"],
            prefer: ["エリカ", "艾莉卡", "Erika"],
        },
    },
    {
        key: "leo",
        type: "birthday",
        month: 8,
        day: 1,
        name: {
            full: ["西城 レオンハルト", "西城 雷欧赫特", "Leonhard Saijo"],
            prefer: ["レオ", "雷欧", "Leo"],
        },
    },
    {
        key: "mikihiko",
        type: "birthday",
        month: 9,
        day: 10,
        name: {
            full: ["吉田 幹比古", "吉田 干比古", "Mikihiko Yoshida"],
            prefer: ["幹比古", "干比古", "Mikihiko"],
        },
    },
    {
        key: "mizuki",
        type: "birthday",
        month: 9,
        day: 25,
        name: {
            full: ["柴田 美月", "柴田 美月", "Mizuki Shibata"],
            prefer: ["美月", "美月", "Mizuki"],
        },
    },
    {
        key: "first-meet-lina",
        year: 2096,
        month: 1,
        day: 1,
        showDate: true,
        charatype: "story",
        charaface: "lina-kimono",
        text: ["初対面のレナ。", "初见莉娜", "First meet, Lina"],
    },
    {
        key: "succession",
        year: 2096,
        month: 12,
        day: 31,
        showDate: true,
        charatype: "story",
        charaface: ["miyuki", "tatsuya"],
        text: ["相続。婚約。", "继承。婚约。", "Succession. Engagement."],
    },
    {
        key: "graduation-class-2096",
        charatype: "uniform",
        charaface: [
            ["mari", "mayumi"],
            ["katsuto", "suzune"],
        ],
        text: [
            "<span class='date'>2 0 9 6 年</span>卒業おめでとう！",
            "<span class='date'>第 2096 届</span>恭喜毕业！",
            "<span class='date'>Class 2096</span>Congrats on Graduation!",
        ],
        show: false,
    }
];

// TODO: Add main characters uniform images
// TODO: Mayumi's birthday illustration display (small + tall version)

$.months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];


$.events.makeText = function (each) {
    let date = [
        `${each.year ? `${each.year}年` : ""}${each.month}月${each.day}日`,
        `${each.year ? `${each.year}年` : ""}${each.month}月${each.day}日`,
        `${$.months[each.month - 1]} ${each.day}${each.year ? `, ${each.year}` : ""}`
    ];

    return `
    <div class="texts">
        <div class="text-body">
            <span class="date ${each.showDate ? "" : "hide"}" ${date.i18n()}></span>
            <span class="text" ${each.text.i18n()}></span>
        </div>
    </div>`;
};

// Make Illustrations
$.events.makeIllust = function (each) {
    let charaGroups = [];
    if (Array.isArray(each.charaface) &&
        each.charaface.length > 0 &&
        Array.isArray(each.charaface[0])) { // Has multiple groups, and each group has multiple characters
        charaGroups = each.charaface;
        each.illustGroupAmount = each.charaface.length;
    } else if (Array.isArray(each.charaface)) { // Has a single group of characters
        charaGroups = [each.charaface];
        each.illustGroupAmount = 1;
    } else if (each.charaface) { // Has only a character
        charaGroups = [[each.charaface]];
        each.illustGroupAmount = 1;
    }

    let groupIndex = 0;
    let html = "";
    each.charaface_src = [];
    charaGroups.forEach((charaGroup) => {
        html += `<div class="illusts ${groupIndex}">`;
        charaGroup.forEach((chara) => {
            each.charaface_src.push(`chara/${each.charatype}/${chara}.png`);
            html += `<span class="charaface ${chara} ${each.charatype}" style="background-image: url('chara/${each.charatype}/${chara}.png');"></span>`;
        });
        html += `</div>`;
        groupIndex++;
    });

    return html;
};

// Make Event Card
$.events.makeEvent = function (each) {
    each.type = "event";
    each.showDate = each.showDate ? each.showDate : false;
    each.hasIllust = each.charaface ? true : false;

    if (each.hasIllust) { // Has charaface, make Illustration + Text
        return $.events.makeIllust(each) + $.events.makeText(each);
    } else { // No charaface, make only Text
        return $.events.makeText(each);
    }
};

$.events.makeBirthday = function (each) {
    each.showDate = true;
    each.charatype = "story";
    each.charaface = each.charaface ? each.charaface : [each.key, `${each.key}-tall`];
    each.hasIllust = true;
    each.text = [
        `${each.name.prefer[0]}の誕生日おめでとう！`,
        `${each.name.prefer[1]}，生日快乐！`,
        `Happy birthday, ${each.name.prefer[2]}!`,
    ];
    return $.events.makeIllust(each) + $.events.makeText(each);
};

// Contruct all events
$.events.forEach((each) => {
    if (each.type == "birthday") {
        each.html = $.events.makeBirthday(each);
    } else if (each.type == "illust") {
        each.html = $.events.makeIllust(each);
    } else {
        each.html = $.events.makeEvent(each);
    }

    each.html = `<div class="card ${each.key} ${each.type}">${each.html}</div>`;

    if (each.type == "birthday") { // Birthday
        each.priority = 900;
    } else if (each.type == "event" && each.hasIllust) { // Event Text + Illustration
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
$.events.forEach((each) => {
    $(".widget .events").append(each.html);
});

// Date function
$.events.date = function () {
    let today = new Date();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    return [month, day];
};

// On events
$.events.on = [];
$.events.lmonth = null;
$.events.lday = null;
$.events.today = function () {

    // Check date
    let [month, day] = $.events.date();
    if (month == $.events.lmonth && day == $.events.lday) {
        return;
    }

    // Update date
    $.events.lmonth = month, $.events.lday = day;

    // List all events for date
    $.events.on = [];
    $.events.forEach((each) => {
        if ((each.month == month && each.day == day) || each.show) {
            $.events.on.push(each);
        }
    });

    // Update console
    $.console.widget_event($.events.on);

    // Tick
    $.events.onIndex = 0;
    $.events.tick();

    // No event is on
    if ($.events.on.length == 0) {
        $(".widget .events > div").removeClass("is-op").delay(800).hide(0);
        $(".widget").trigger("event", [false]); // Trigger event
    } else {
        $(".widget").trigger("event", [true]); // Trigger event
    }
};


$.events.onIndex = 0.0; // Decimal, integer part represents index of event, decimal part represents index of illust group
$.events.tick = function () {

    if ($.events.on.length == 0) {
        return; // Nothing to tick
    }

    // Current event
    let majorIndex = Math.floor($.events.onIndex); // Event index
    let current = $.events.on[majorIndex];

    // Current illust group
    let minorIndex = Math.floor(($.events.onIndex - majorIndex) * 100) / 100; // Illust group index
    minorIndex = Math.ceil(minorIndex * current.illustGroupAmount);

    // Dom ids
    let id = `.${current.key}.${current.type}`; // Card id
    let illust_id = `.${minorIndex}`;    // Illust group id

    // Hide not to show items & show event
    $(".widget .events .card").not(id).removeClass("is-op").hide();
    $(`.widget .events .card${id}`).show().addClass("is-op");
    $(`.widget .events .card .illusts`).not(illust_id).removeClass("is-op").hide();
    $(`.widget .events .card${id} .illusts${illust_id}`).show().addClass("is-op");

    // Console
    $.console.widget_event_tick($.events.onIndex, majorIndex, minorIndex);

    // Next illust group
    let nextMinorIndex = (minorIndex + 1) / current.illustGroupAmount; // Next illust group index -> decimal
    $.events.onIndex = majorIndex + nextMinorIndex;
    $.events.onIndex %= $.events.on.length;
};

setTimeout(function () {
    $.events.today();

    setInterval(() => {
        $.events.today();
    }, 10 * 1000);

    setInterval(() => {
        $.events.tick();
    }, 30 * 1000);
}, 11000);

// testing
if (window.location.hash && window.location.hash == "#debug") {
    $.events.date = () => { return [3, 25]; };
}