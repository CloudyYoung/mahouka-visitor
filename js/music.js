$(".widget").append(`
    <div class="music">
        <div class="control">
            <button class="play-status play"></button>
        </div>
        <div class="content">
            <p class="no">01</p>
            <p class="title">Vibrant</p>
        </div>
        <div class="control secondary">
            <button class="play-mode"></button>
            <button class="list"></button>
        </div>
        
        <div class="sources"></div>
        <div class="progress"></div>
    </div>
`);


$(".widget .music .control.secondary .play-mode").click((e) => {
    var playModes = ["repeat", "repeat-one", "shuffle"];

    $(".widget .music .control.secondary .play-mode").removeClass(playModes);

    $.musicPlayMode++;
    if ($.musicPlayMode >= playModes.length) {
        $.musicPlayMode = 0;
    }

    $(".widget .music .control.secondary .play-mode").addClass(playModes[$.musicPlayMode]);
});
$(".widget .music .control.secondary .play-mode").addClass("repeat");


$(".widget .music .control .play-status").click((e) => {
    $(e.target).toggleClass("play stop");

    if ($(e.target).hasClass("play")) {
        // Stopped
        $(".widget .music .sources audio").get(0).pause();
    } else if ($(e.target).hasClass("stop")) {
        // Playing
        $(`.widget .music .sources audio.${$.musicPlaying + 1}`).get(0).play();
    }
});



$.musicPlaying = 0;
$.musicPlayMode = 0; // 0 Repeat, 1 Repeat One, 2 Random

$.album = [
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
    },
    {
        title: "sample",
        no: 24,
    }
];


$.album.forEach((each) => {
    $(".widget .music .sources").append(`
        <audio class="${each.no}" src="album/${each.title}.ogg" type="audio/ogg" controls no="${each.no}" title="${each.title}" crossOrigin="anonymous"></audio>
    `);
});

$(document).ready(function () {
    $(".widget .music .sources audio").each((index, each) => {
        each.addEventListener("canplay", (e) => {
            // console.log("can play", each);
        });

        each.addEventListener("playing", (e) => {
            $(".widget .music .control .play-status").removeClass("play").addClass("pause");
            $(".widget .music .content .title").text($.album[$.musicPlaying].title);
            $(".widget .music .content .no").text($.album[$.musicPlaying].no.toString().padStart(2, "0"));
        });

        each.addEventListener("pause", (e) => {
            $(".widget .music .control .play-status").removeClass("pause").addClass("play");
        });

        each.addEventListener("timeupdate", function () {
            let percent = (each.currentTime / each.duration) * 100;
            $(".widget .music .progress").css("width", `${percent}%`);
        });

        each.addEventListener("ended", (e) => {
            $(".widget .music .control .play-status").removeClass("pause").addClass("play");

            if ($.musicPlayMode == 0) {
                // Repeat
                $.musicPlaying++;

                if ($.musicPlaying >= $.album.length) {
                    $.musicPlaying = 0;
                }

                $(`.widget .music .sources audio.${$.musicPlaying + 1}`).get(0).play();
            } else if ($.musicPlayMode == 1) {
                // Repeat One
                $(`.widget .music .sources audio.${$.musicPlaying + 1}`).get(0).currentTime = 0;
                $(`.widget .music .sources audio.${$.musicPlaying + 1}`).get(0).play();
            }
        });
    });
});