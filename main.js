// ScrollIt JS File
(function($) {
    'use strict';

    var pluginName = 'ScrollIt',
        pluginVersion = '1.0.3';

    /* OPTIONS */
    var defaults = {
        upKey: 38,
        downKey: 40,
        easing: 'linear',
        scrollTime: 600,
        activeClass: 'active',
        onPageChange: null,
        topOffset: 0
    };

    $.scrollIt = function(options) {
        /* DECLARATIONS */
        var settings = $.extend(defaults, options),
            active = 0,
            lastIndex = $('[data-scroll-index]:last').attr('data-scroll-index');

        /* METHODS */

        /* navigate *sets up navigation animation */
        var navigate = function(ndx) {
            if(ndx < 0 || ndx > lastIndex) return;

            var targetTop = $('[data-scroll-index=' + ndx + ']').offset().top + settings.topOffset + 1;
            $('html,body').animate({
                scrollTop: targetTop,
                easing: settings.easing
            }, settings.scrollTime);
        };

        /* doScroll * runs navigation() when criteria are met */
        var doScroll = function(e) {
            var target = $(e.target).closest("[data-scroll-nav]").attr('data-scroll-nav') ||
            $(e.target).closest("[data-scroll-goto]").attr('data-scroll-goto');
            navigate(parseInt(target));
        };

        /* keyNavigation * sets up keyboard navigation behavior*/
        var keyNavigation = function(e) {
            var key = e.which;
            if($('html,body').is(':animated') && (key == settings.upKey || key == settings.downKey)) {
                return false;
            }
            if(key == settings.upKey && active > 0) {
                navigate(parseInt(active) - 1);
                return false;
            } else if(key == settings.downKey && active < lastIndex) {
                navigate(parseInt(active) + 1);
                return false;
            }
            return true;
        };

        /**
         * updateActive
         *
         * sets the currently active item
         */
        var updateActive = function(ndx) {
            if(settings.onPageChange && ndx && (active != ndx)) settings.onPageChange(ndx);

            active = ndx;
            $('[data-scroll-nav]').removeClass(settings.activeClass);
            $('[data-scroll-nav=' + ndx + ']').addClass(settings.activeClass);
        };

        /**
         * watchActive
         *
         * watches currently active item and updates accordingly
         */
        var watchActive = function() {
            var winTop = $(window).scrollTop();

            var visible = $('[data-scroll-index]').filter(function(ndx, div) {
                return winTop >= $(div).offset().top + settings.topOffset &&
                winTop < $(div).offset().top + (settings.topOffset) + $(div).outerHeight()
            });
            var newActive = visible.first().attr('data-scroll-index');
            updateActive(newActive);
        };

        /*
         * runs methods
         */
        $(window).on('scroll', watchActive).scroll();

        $(window).on('keydown', keyNavigation);

        $('body').on('click', '[data-scroll-nav], [data-scroll-goto]', function(e) {
            e.preventDefault();
            doScroll(e);
        });
    };
}(jQuery));

// JavaScript main.js functions
$(document).ready(function() {
    // Navbar shrink on scroll
    $(window).on("scroll", function() {
        if($(this).scrollTop() > 90) {
            $(".navbar").addClass("navbar-shrink");
        } else {
            $(".navbar").removeClass("navbar-shrink");
        }
    });

    // Parallax effect
    function parallaxMouse() {
        if($("#parallax").length) {
            var scene = document.getElementById("parallax");
            var parallax = new Parallax(scene);
        }
    }
    parallaxMouse();

    // Skills meter
    $(window).scroll(function() {
        var hT = $("#about-image-profile").offset().top;
        var hH = $("#about-image-profile").outerHeight();
        var wH = $(window).height();
        var wS = $(this).scrollTop();

        if(wS > (hT + hH - 1.4 * wH)) {
            jQuery('.skillbar-container').each(function() {
                jQuery(this).find('.skills').animate({
                    width: jQuery(this).attr('data-percent')
                }, 5000);
            });
        }
    });

    // Filter buttons
    let $btns = $('.img-gallery .sortBtn .filter-btn');
    $btns.click(function(e) {
        $('.img-gallery .sortBtn .filter-btn').removeClass('active');
        e.target.classList.add('active');

        let selector = $(e.target).attr('data-filter');
        $('.img-gallery .grid').isotope({
            filter: selector
        });
        return false;
    });

    // Magnific Popup for gallery
    $('.image-popup').magnificPopup({
        type: 'image',
        gallery: { enabled: true }
    });

    // Owl Carousel for projects
    $('.Projects-slider').owlCarousel({
        loop: true,
        margin: 0,
        autoplay: true,
        responsiveClass: true,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 }
        }
    });

    // ScrollIt
    $.scrollIt({
        topOffset: -50
    });

    // Hide mobile navbar on nav link click
    $(".nav-link").on("click", function() {
        $(".navbar-collapse").collapse("hide");
    });

    // Theme Toggle Functionality
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // Update theme icon (sun/moon)
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-timeline');
    const timelineOverlay = document.getElementById('timeline-overlay');
    const closeButton = document.getElementById('timeline-close');
  
    if (toggleButton && timelineOverlay && closeButton) {
      toggleButton.addEventListener('click', (e) => {
        e.preventDefault();
        timelineOverlay.classList.add('active');
      });
  
      closeButton.addEventListener('click', () => {
        timelineOverlay.classList.remove('active');
      });
  
      // Close on overlay click (outside timeline)
      timelineOverlay.addEventListener('click', (e) => {
        if (e.target === timelineOverlay) {
          timelineOverlay.classList.remove('active');
        }
      });
    } else {
      console.error('Timeline toggle button, overlay, or close button not found.');
    }
  });






document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("navbarToggleBtn");
  const navbarMenu = document.getElementById("collapsibleNavbar");

  toggleBtn.addEventListener("click", () => {
    navbarMenu.classList.toggle("show");
  });
});









(function () {
  emailjs.init("w2b7IOczpkXGNobsc"); // 🔁 Replace with your actual key
})();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form-details");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs
      .sendForm("service_it5haqm", "template_ec3g1a6", this)
      .then(() => {
        alert("✅ Message sent successfully!");
        form.reset();
      })
      .catch((error) => {
        alert("❌ Failed to send message.");
        console.error(error);
      });
  });
});









