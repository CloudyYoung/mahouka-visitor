$(".widget").append(`
    <div class="music animated fadeIn delay-7">
        <div class="control">
            <button class="play-status play"></button>
        </div>
        <div class="content">
            <p class="no"></p>
            <p class="title"></p>
        </div>
        <div class="sources"></div>
        <div class="progress"></div>
    </div>
`);

$(".widget .music .control .play-status").click((e) => {
    if ($.album.playing) {
        $.album.pause();
    } else {
        $.album.play();
    }
});


$.album = {};
$.album.on = null;
$.album.playing = false;
$.album.playbackMode = 0; // 0 Repeat, 1 Repeat One, 2 Random
$.album.playlist = [];
$.album.repeatTrack = null;
$.album.play = function () {
    $(".widget .music .sources audio").trigger("pause");
    $.album.on.dom.play();
}
$.album.pause = function () {
    $(".widget .music .sources audio").trigger("pause");
}
$.album.playback = function () {
    if ($.album.playlist.length == 0) {
        $.album.generatePlaylist();
    }
    $.album.on = $.album.playlist.shift();
    $(".widget .music .content .title").text($.album.on.title);
    $(".widget .music .content .no").text($.album.on.no.toString().padStart(2, "0"));
    $(".widget .music .progress").css("width", `0%`);
    $.album.on.dom.currentTime = 0;
    $.album.play();
}
$.album.generatePlaylist = function () {
    $.album.playlist = [];
    switch ($.album.playbackMode) {
        case 0: // Repeat
            $.album.playlist = $.album.tracks.slice();
            break;

        case 1: // Repeat One
            for (let t = 0; t <= 20; t++) {
                $.album.playlist.push($.album.repeatTrack);
            }
            break;

        case 2: // Shuffle
            $.album.playlist = $.album.tracks.slice().sort(() => Math.random() - 0.5);;
            break;
    }
}
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
});


$(document).ready(function () {

    $.album.generatePlaylist();
    $.album.playback();

    $(".widget .music .sources audio").each((index, each) => {
        each.addEventListener("canplay", (e) => {
            // console.log("can play", each);
        });

        each.addEventListener("playing", (e) => {
            $(".widget .music .control .play-status").removeClass("play").addClass("stop");
            $(".widget .music .content .title").text($.album.on.title);
            $(".widget .music .content .no").text($.album.on.no.toString().padStart(2, "0"));
            if ($.album.on.dom.currentTime == 0) {
                $(".widget .music .progress").css("width", `0%`);
            }
            $.album.playing = true;
        });

        each.addEventListener("pause", (e) => {
            $(".widget .music .control .play-status").removeClass("stop").addClass("play");
            $.album.playing = false;
        });

        each.addEventListener("timeupdate", (e) => {
            let percent = (each.currentTime / each.duration) * 100;
            $(".widget .music .progress").css("width", `${percent}%`);
        });

        each.addEventListener("ended", (e) => {
            $(".widget .music .control .play-status").removeClass("stop").addClass("play");
            $.album.playback();
        });
    });
});