
window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {

        // Performance
        if (properties.movement_performance) {
            if (properties.movement_performance.value) {

                // Remove performance class from body
                $("body").removeClass("performance-high performance-simple performance-none");

                switch (properties.movement_performance.value) {
                    case 'high': // All on
                        $.global_outstandRatio = $.global_outstandRatioDefault;
                        $.global_degreeRatio = 1;
                        $(document).unbind("mousemove");
                        $(document).mousemove($.mouse);
                        $("body").addClass("performance-high");
                        break;
                    case 'simple': // Remove transition .3s ease and in/outstand
                        $.global_outstandRatio = [0, 0, 0];
                        $.kv_x_stand = [0, 0, 0];
                        $.global_degreeRatio = 0;
                        $(document).unbind("mousemove");
                        $(document).mousemove($.mouse);
                        $("body").addClass("performance-simple");
                        break;
                    case 'none': // All static
                        $.global_outstandRatio = [0, 0, 0];
                        $.kv_x_stand = [0, 0, 0];
                        $.global_degreeRatio = 0;
                        $.mouse({ "clientX": 0, "clientY": 0 });
                        $(document).unbind("mousemove");
                        $("body").addClass("performance-none");
                        break;
                }
            }
        }

        // Mahouka Logo
        if (properties.mahouka_logo) {
            if (properties.mahouka_logo.value) {
                $('.logo').css("display", "block");
                $.console.logo(true);
            } else {
                $('.logo').css("display", "none");
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

        // Fluent Motion
        if (properties.smooth_movement) {
            if (properties.smooth_movement.value) {
                $("body").addClass("smooth-movement");
            } else {
                $("body").removeClass("smooth-movement");
            }
            $.console.smooth_movement(properties.smooth_movement.value);
        }

        // Character Amplitude X
        if (properties.character_amplitude_x) {
            if (properties.character_amplitude_x.value) {
                $('.kv').css('--x-change-rate', properties.character_amplitude_x.value / 100);
            }
        }

        // Character Amplitude Y
        if (properties.character_amplitude_y) {
            if (properties.character_amplitude_y.value) {
                $('.kv').css('--y-change-rate', properties.character_amplitude_y.value / 100);
            }
        }

        // Background Amplitude
        if (properties.background_amplitude) {
            if (properties.background_amplitude.value) {
                $('.bg').css('--x-change-rate', properties.background_amplitude.value / 100);
                $('.bg').css('--y-change-rate', properties.background_amplitude.value / 100);
            }
        }

        // Particles
        if (properties.particles) {
            if (properties.particles.value) {
                $('#bg_canvas').show();
            } else {
                $('#bg_canvas').hide();
            }
        }

        // Flare Amplitude
        if (properties.flare_amplitude) {
            if (properties.flare_amplitude.value) {
                $('.fv_flare').css('--degree-change-rate', properties.flare_amplitude.value / 100);
            }
        }

        // Console
        if (properties.developer_console) {
            if (properties.developer_console.value) {
                $('.console').css('--display', 'block');
            } else {
                $('.console').css('--display', 'none');
            }
        }

        // Music
        if (properties.music) {
            if (properties.music.value) {
                $('.widget .music').show();
                $.album.playback();
                $.album.play();
            } else {
                $('.widget .music').hide();
                $.album.pause();
            }
        }

        // Repeat Track
        if (properties.repeat_track) {
            // Repeat One
            $.album.repeatTrack = $.album.tracks[properties.repeat_track.value];
            if ($.album.playbackMode == 1) {
                $.album.generatePlaylist();
                $.album.playback();
            }
        }

        // Volume
        if (properties.volume) {
            $.album.tracks.forEach((each) => {
                each.dom.volume = properties.volume.value / 100;
            });
        }

        // Playback Mode
        if (properties.playback_mode) {
            if ($.album.playbackMode == properties.playback_mode.value) {
                return;
            }
            $.album.playbackMode = properties.playback_mode.value;
            $.album.generatePlaylist();
            $.album.playback();
        }
    }
}