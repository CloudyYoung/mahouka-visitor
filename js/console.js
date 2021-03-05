
$('body').append(`
    <div class="console">
        <ul>
            <ul class="main-console">
                <li class="screen"></li>
                <li class="mouse"></li>
            </ul>
            <ul class="bg-console"></ul>
            <ul class="kv-console">
                <li class="01"></li>
                <li class="02"></li>
                <li class="03"></li>
            </ul>
            <ul class="smooth-movement-console">
                <li class="smooth-movement"></li>
            </ul>
            <ul class="logo-console">
                <li class="show"></li>
                <li class="style"></li>
            </ul>
            <ul class="flare-console"></ul>
            <ul class="dust-console"></ul>
            <ul class="widget-event-console"></ul>
            <ul class="widget-event-tick-console"></ul>
        </ul>
    </div>
`);

$.console = {
    kv: function (no, x, y) {
        $(`.console .kv-console .${no}`).html(`kv_${no}: ${x.toFixed(4)}px, ${y.toFixed(4)}px`);
    },
    bg: function (x, y) {
        $(`.console .bg-console`).html(`<li>bg: ${x.toFixed(4)}px, ${y.toFixed(4)}px</li>`);
    },
    flare: function (deg) {
        $(`.console .flare-console`).html(`<li>flare: ${deg}deg</li>`);
    },
    mouse: function (x, y) {
        $(`.console .main-console .mouse`).html(`mouse: ${x}px, ${y}px`);
    },
    screen: function (width, height) {
        $(`.console .main-console .screen`).html(`screen: ${width}px, ${height}px`);
    },
    dust: function (id, top) {
        if ($(`.console .dust-console .${id}`).length != 0) {
            $(`.console .dust-console .${id}`).remove();
        } else {
            $(`.console .dust-console`).append(`<li class="${id}">dust_${id}: ${top.toFixed(4)}px</li>`);
        }
    },
    logo: function (show) {
        $(".console .logo-console .show").html(`logo: ${show}`);
    },
    logo_style: function (style) {
        $(".console .logo-console .style").html(`logo_style: ${style}`);
    },
    widget_event: function (events) {
        $(".console .widget-event-console").empty();
        events.forEach(event => {
            let id = `${event.type}-${event.key}`;
            let values = [];
            if (event.month && event.day) values.push(event.month + "/" + event.day);
            if (event.charaface) values.push(event.charaface)
            $(".console .widget-event-console").append(`<li class="${id}">${event.type}_${event.key}: ${values}</li>`);
        });
    },
    widget_event_tick: function (onIndex, majorIndex, minorIndex) {
        $(".console .widget-event-tick-console").html(`event_tick: ${onIndex},${majorIndex},${minorIndex}`);
    },
    smooth_movement: function (on) {
        $(".console .smooth-movement-console .smooth-movement").html("smooth_movement: " + on);
    }
}