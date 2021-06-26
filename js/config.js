
window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {

        // Mahouka Logo
        if (properties.mahouka_logo) {
            if (properties.mahouka_logo.value) {
                $('.logo-wrapper').removeClass("transparent");
                $.console.logo(true);
            } else {
                $('.logo-wrapper').addClass("transparent");
                $.console.logo(false);
            }
        }

        // Mahouka Logo Style
        if (properties.mahouka_logo_style) {
            if (properties.mahouka_logo_style.value != "") {
                $('.logo').removeClass("sp en").addClass(properties.mahouka_logo_style.value);
            } else {
                $('.logo').removeClass("sp en");
            }
            $.console.logo_style(properties.mahouka_logo_style.value);
        }

        // Music
        if (properties.music) {
            $.player.enabled = properties.music.value;
            $.player.show();
        }

        // Repeat Track (This has to come first)
        if (properties.repeat_track) {
            // Repeat One
            $.player.repeatTrack = $.album.tracks[properties.repeat_track.value];
        }

        // Playback Mode (This has to come second)
        if (properties.playback_mode) {
            if ($.player.playbackMode != properties.playback_mode.value) {
                $.player.playbackMode = properties.playback_mode.value;
            }
        }

        // Volume
        if (properties.volume) {
            $.album.tracks.forEach((each) => {
                each.dom.volume = properties.volume.value / 100;
            });
        }
    }
}