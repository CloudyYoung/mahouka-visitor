$(".widget").append(`
    <div class="music" style="display: none;">
        <div class="player" style="display: none;">
            <div class="progress"></div>
            <div class="control">
                <button class="play-status play"></button>
            </div>
            <div class="content">
                <p class="no"></p>
                <p class="title"></p>
            </div>
        </div>
        <div class="sources"></div>
    </div>
`);

$(".widget .events").append(`
    <div class="music" style="display: none;">
        <div class="mini player" style="display: none;">
            <div class="control">
                <button class="play-status play"></button>
            </div>
        </div>
    </div>
`);

$(".widget .player .control .play-status").click((e) => {
    if ($.player.playing) {
        $.player.pause();
    } else {
        $.player.play();
    }
});


$.album = {};
$.album.tracks = [
    {
        title: "Vibrant",
        no: 1,
    },
    {
        title: "mikamik amore",
        no: 2,
    },
    {
        title: "The visitor",
        no: 3,
    },
    {
        title: "Army of her",
        no: 4,
    },
    {
        title: "Clover",
        no: 5,
    },
    {
        title: "The parasite smiles",
        no: 6,
    },
    {
        title: "Explanation",
        no: 7,
    },
    {
        title: "Twitch",
        no: 8,
    },
    {
        title: "Kalimba",
        no: 9,
    },
    {
        title: "Resistance",
        no: 10,
    },
    {
        title: "Crisis1",
        no: 11,
    },
    {
        title: "Grab it",
        no: 12,
    },
    {
        title: "Irritated",
        no: 13,
    },
    {
        title: "Crisis2",
        no: 14,
    },
    {
        title: "Crisis3",
        no: 15,
    },
    {
        title: "The final hit",
        no: 16,
    },
    {
        title: "Saudade",
        no: 17,
    },
    {
        title: "Spirits",
        no: 18,
    },
    {
        title: "Trackers & fugitives",
        no: 19,
    },
    {
        title: "Concerned",
        no: 20,
    },
    {
        title: "Tatsuya 2.0",
        no: 21,
    },
    {
        title: "Miyuki 2.0",
        no: 22,
    },
    {
        title: "Fearful valentine",
        no: 23,
    }
];
$.album.tracks.forEach((each) => {
    $(".widget .music .sources").append(`
        <audio class="${each.no}" controls no="${each.no}" title="${each.title}" preload="none">
            <source src="src/album/${each.title}.m4a" type="audio/wav">
            <source src="album/${each.title}.ogg" type="audio/ogg">
        </audio>
    `);
    each.dom = $(`.widget .music .sources audio.${each.no}`).get(0);
    each.dom.volume = 0.2;
});

$(document).ready(function () {

    $.player.generatePlaylist();
    $.player.playback();

    $(".widget .music .sources audio").each((index, each) => {
        each.addEventListener("canplay", (e) => {
            // console.log("can play", each);
        });

        each.addEventListener("playing", (e) => {
            $(".widget .player .control .play-status").removeClass("play").addClass("stop");
            $(".widget .player .content .title").text($.player.on.title);
            $(".widget .player .content .no").text($.player.on.no.toString().padStart(2, "0"));
            if ($.player.on.dom.currentTime == 0) {
                $(".widget .player .progress").css("width", `0%`);
            }
            $.player.playing = true;
        });

        each.addEventListener("pause", (e) => {
            $(".widget .player .control .play-status").removeClass("stop").addClass("play");
            $.player.playing = false;
        });

        each.addEventListener("timeupdate", (e) => {
            let percent = (each.currentTime / each.duration) * 100;
            $(".widget .player .progress").css("width", `${percent}%`);
        });

        each.addEventListener("ended", (e) => {
            $(".widget .player .control .play-status").removeClass("stop").addClass("play");
            $.player.playNext();
        });
    });
});

$.player = {};
$.player.enabled = false;
$.player.mode = 0; // 0: Music normal player, 1: Mini player
$.player.on = null;
$.player.playing = false;
$.player.playbackMode = 0; // 0 Repeat, 1 Repeat One, 2 Random
$.player.playlist = [];
$.player.repeatTrack = null;
$.player.play = function () {
    $(".widget .music .sources audio").trigger("pause");
    $.player.on.dom.play();
}
$.player.pause = function () {
    $(".widget .music .sources audio").trigger("pause");
}
$.player.playback = function () {
    if ($.player.on != null) {
        $.player.on.dom.currentTime = 0;
    }
    if ($.player.playlist.length == 0) {
        $.player.generatePlaylist();
    }
    $.player.on = $.player.playlist.shift();
    $(".widget .player .content .title").text($.player.on.title);
    $(".widget .player .content .no").text($.player.on.no.toString().padStart(2, "0"));
    $.player.on.dom.currentTime = 0;
}
$.player.playNext = function () {
    $.player.playback();
    $.player.play();
}
$.player.generatePlaylist = function () {
    $.player.playlist = [];
    switch ($.player.playbackMode) {
        case 0: // Repeat
            $.player.playlist = $.album.tracks.slice();
            break;

        case 1: // Repeat One
            for (let t = 0; t <= 20; t++) {
                $.player.playlist.push($.player.repeatTrack);
            }
            break;

        case 2: // Shuffle
            $.player.playlist = $.album.tracks.slice().sort(() => Math.random() - 0.5);;
            break;
    }
}
$.player.open = function () {
    switch ($.player.mode) {
        case 0:
            $(".widget .music .player").fadeIn();
            $(".widget .music .mini.player").hide();
            break;

        case 1:
            $(".widget .music .player").hide();
            $(".widget .music .mini.player").delay(500).fadeIn();
            break;
    }
}

$('.widget').on('event', function (e, on) {
    if (on) {
        $.player.mode = 1;
    } else {
        $.player.mode = 0;
    }
    $.player.open();
});


// testing
if (window.location.hash && window.location.hash == "#debug") {
    // $.player.enabled = true;

    if ($.player.enabled) {
        $('.widget .music').fadeIn();
        $.player.generatePlaylist();
        $.player.playback();
        $.player.play();
    } else {
        $('.widget .music').hide();
        $.player.pause();
    }
}