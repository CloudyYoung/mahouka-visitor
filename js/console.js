
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
            <ul class="flare-console"></ul>
            <ul class="dust-console"></ul>
            <ul class="special-event-console"></ul>
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
    dust: function (id, top, duration) {
        $(`.console .dust-console`).append(`<li class="${id}">dust_${id}: ${top.toFixed(4)}px</li>`);
        setTimeout(function () {
            $(`.console .dust-console .${id}`).remove();
        }, 1000 * duration);
    },
    special_event: function (event, show) {
        let id = `${event.type}-${event.key}`;
        let values = [];
        if (event.month && event.day) values.push(event.month + "," + event.day);
        if (event.charaface) values.push(event.charaface)
        if (show && $(`.console .special-event-console .${id}`).length == 0) {
            $(`.console .special-event-console`).append(`<li class="${id}">${event.type}_${event.key}: ${values}</li>`);
        } else if (!show) {
            $(`.console .special-event-console .${id}`).remove();
        } else {
            // Do nothing
        }
    }
}