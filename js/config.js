
window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {

        // Quality
        if (properties.movement_performance) {
            if (properties.movement_performance.value) {
                switch (properties.movement_performance.value) {
                    case 'high': // All on
                        global_outstandRatio = [0.1, 0.1, 0.1];
                        global_degreeRatio = 1;
                        $('.kv').css('transition', 'var(--transition)');
                        $('.bg').css('transition', 'var(--transition)');
                        $(document).unbind("mousemove");
                        $(document).mousemove(mouse);
                        break;
                    case 'simple': // Remove transition .3s ease and in/outstand
                        global_outstandRatio = [0, 0, 0];
                        kv_x_stand = [0, 0, 0];
                        global_degreeRatio = 0;
                        $('.kv').css('transition', 'none');
                        $('.bg').css('transition', 'none');
                        $(document).unbind("mousemove");
                        $(document).mousemove(mouse);
                        break;
                    case 'none': // All static
                        global_outstandRatio = [0, 0, 0];
                        kv_x_stand = [0, 0, 0];
                        global_degreeRatio = 0;
                        $('.kv').css('transition', 'none');
                        $('.bg').css('transition', 'none');
                        $(document).unbind("mousemove");
                        break;
                }
            }
        }

        // Mahouka Logo
        if (properties.mahouka_logo) {
            if (properties.mahouka_logo.value) {
                $('.logo').css('--display', 'block');
            } else {
                $('.logo').css('--display', 'none');
            }
        }

        // Mahouka Logo Opacity
        if (properties.mahouka_logo_opacity) {
            if (properties.mahouka_logo_opacity.value) {
                $('.logo').css('--opacity', properties.mahouka_logo_opacity.value / 10);
            }
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

        $.mouse();

    }
}