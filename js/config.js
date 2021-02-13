
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
        if(properties.fluent_motion){
            if(properties.fluent_motion.value){
                $("body").addClass("fluent-motion");
            } else {
                $("body").removeClass("fluent-motion");
            }
            $.console.fluent_motion(properties.fluent_motion.value);
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
        if (properties.specials) {
            if (properties.specials.value) {
                $('.special').show();
            } else {
                $('.special').hide();
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
    }
}