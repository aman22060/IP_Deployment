/*
    Salient by TEMPLATE STOCK
    templatestock.co @templatestock
    Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

var $ = jQuery.noConflict();

$(document).ready(function ($) {
    "use strict";

    /* global google: false */

    /* ==============================================
        Full height home-section
    =============================================== */

    var windowHeight = $(window).height(),
        topSection = $('#hero-section');
    topSection.css('height', windowHeight);

    $(window).resize(function () {
        var windowHeight = $(window).height();
        topSection.css('height', windowHeight);
    });

    /* ==============================================
        Collapse menu on click
    =============================================== */

    $('.navbar-collapse a:not(.dropdown-toggle)').click(function () {
        if ($(window).width() < 768)
            $('.navbar-collapse').collapse('hide');
        adjustNavbarFontSize();
    });

    /* ==============================================
        Scrollspy
    =============================================== */

    $('body').scrollspy({
        target: '#navigation-nav',
        offset: 140      //px/
    });

    /* ==============================================
        Parallax
    =============================================== */

    $.stellar({
        responsive: true,
        horizontalScrolling: false,
        verticalOffset: 0
    });

    /* ==============================================
        Hero slider
    =============================================== */

    $(document).ready(function () {
        $('.caption-slides').bxSlider({
            pager: false,
            mode: 'fade',
            adaptiveHeight: true,
            controls: false,
            auto: true
        });
    });

    /* ==============================================
        Smooth Scroll on anchors
    =============================================== */

    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 66
                }, 1000);
                return false;
            }
        }
    });

    /* ==============================================
     Bootstrap Tooltip
    =============================================== */

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    /* ==============================================
        Counter increment
    =============================================== */

    function countUp() {
        var dataperc;
        $('.statistic-percent').each(function () {
            dataperc = $(this).attr('data-perc'),
                $(this).find('.percentfactor').delay(6000).countTo({
                    from: 0,                 // number to begin counting
                    to: dataperc,
                    speed: 1000,             // ms
                    refreshInterval: 10,
                });
        });
    }

    $('.statistic-percent').waypoint(function () {
        countUp();
    },
        {
            offset: '95%',
            triggerOnce: true
        });

    /* ==============================================
        Skills bar
    =============================================== */

    $('.progress-bar').each(function (i) {
        $(this).appear(function () {
            var percent = $(this).attr('aria-valuenow');
            $(this).animate({ 'width': percent + '%' });
        });
    });

    /* ==============================================
    Placeholder
    =============================================== */

    $('input, textarea').placeholder();

    /* ==============================================
        Animated content
    =============================================== */

    $('.animated').appear(function () {
        var el = $(this);
        var anim = el.data('animation');
        var animDelay = el.data('delay');
        if (animDelay) {

            setTimeout(function () {
                el.addClass(anim + " in");
                el.removeClass('out');
            }, animDelay);

        }

        else {
            el.addClass(anim + " in");
            el.removeClass('out');
        }
    }, { accY: -150 });


    /* ==============================================
        MailChip
    =============================================== */

    $('.mailchimp').ajaxChimp({
        callback: mailchimpCallback,
        url: "http://clas-design.us10.list-manage.com/subscribe/post?u=5ca5eb87ff7cef4f18d05e127&amp;id=9c23c46672" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".  
    });

    function mailchimpCallback(resp) {
        if (resp.result === 'success') {
            $('.subscription-success').html('<span class="icon-happy"></span><br/>' + resp.msg).fadeIn(1000);
            $('.subscription-error').fadeOut(500);

        } else if (resp.result === 'error') {
            $('.subscription-error').html('<span class="icon-sad"></span><br/>' + resp.msg).fadeIn(1000);
            $('.subscription-success').fadeOut(500);
        }
    }


    /* ==============================================
    Contact Form
    =============================================== */

    $('#contactform').submit(function () {

        var action = $(this).attr('action');

        $("#alert").slideUp(750, function () {
            $('#alert').hide();

            $('#submit')
                .after('<img src="../images/ajax-loader.GIF" class="contactloader" />')
                .attr('disabled', 'disabled');

            $.post(action, {
                name: $('#name').val(),
                email: $('#email').val(),
                message: $('#message').val()
            },
                function (data) {
                    document.getElementById('alert').innerHTML = data;
                    $('#alert').slideDown('slow');
                    $('#contactform img.contactloader').fadeOut('slow', function () { $(this).remove(); });
                    $('#submit').removeAttr('disabled');
                    if (data.match('success') !== null) {
                        $('#name').val('');
                        $('#email').val('');
                        $('#message').val('');
                    }
                }
            );

        });

        return false;

    });

    // Countdown
    // To change date, simply edit: var endDate = "June 26, 2015 20:39:00";
    $(function () {
        var endDate = "June 26, 2016 20:39:00";
        $('.soon-countdown .row').countdown({
            date: endDate,
            render: function (data) {
                $(this.el).html('<div><div><span>' + (parseInt(this.leadingZeros(data.years, 2) * 365) + parseInt(this.leadingZeros(data.days, 2))) + '</span><span>days</span></div><div><span>' + this.leadingZeros(data.hours, 2) + '</span><span>hours</span></div></div><div class="lj-countdown-ms"><div><span>' + this.leadingZeros(data.min, 2) + '</span><span>minutes</span></div><div><span>' + this.leadingZeros(data.sec, 2) + '</span><span>seconds</span></div></div>');
            }
        });
    });


    /* ==============================================
    Fade In .back-to-top
    =============================================== */

    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    // scroll body to 0px on click
    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0,
            easing: 'swing'
        }, 750);
        return false;
    });

    /* ==============================================
     BX-Project Slider
    =============================================== */

    $(".project-slider").bxSlider({
        pager: false,
        controls: true,
        auto: true,        // Boolean:  (true/false)
        speed: 500,        // Animation speed.
        pause: 5000,      // Milliseconds before progressing to next slide automatically. Use a falsey value to disable.
        useCSS: false     // Boolean:  (true/false)
    });

    /* ==============================================
     BX-Project Slider
    =============================================== */

    $(".blog-slider").bxSlider({
        pager: false,
        controls: true,
        auto: true,        // Boolean:  (true/false)
        speed: 500,        // Animation speed.
        pause: 5000,      // Milliseconds before progressing to next slide automatically. Use a falsey value to disable.
        useCSS: false     // Boolean:  (true/false)
    });

    /* ==============================================
     BX-Slider Tweet&Process
    =============================================== */


    $('.tweet-slider').bxSlider({
        adaptiveHeight: true,
        controls: false,
        auto: true
    });

    /* ==============================================
        BxSlider Testimonial
    =============================================== */

    $(".testimonials-slider").bxSlider({
        nextSelector: ".tc-arrows .tc-arrow-right",
        prevSelector: ".tc-arrows .tc-arrow-left",
        nextText: "<i class='fa fa-angle-right'></i>",
        prevText: "<i class='fa fa-angle-left'></i>",
        pager: false,
        auto: true,          // Boolean:  (true/false)
        pause: 5000,         // Milliseconds before progressing to next slide automatically. Use a falsey value to disable.
        mode: 'vertical',    // Choose fade, slide
        useCSS: false        // Boolean:  (true/false)
    });

    /* ==============================================
        OWL Carousel
    =============================================== */

    $(".owl-carousel").owlCarousel({

        autoPlay: 3000, //Set AutoPlay to 3 seconds
        items: 4,
        itemsDesktop: [1199, 3], //number of items displayed on resolution less then 1199px
        itemsDesktopSmall: [979, 3] //number of items displayed on resolution less then 979px

    });

    /* ==============================================
        Responsive video
    =============================================== */

    $(".project-video, .video-creative, .video-post").fitVids();


    /* ==============================================
        MagnificPopup - lightbox effect
    =============================================== */

    // Example with multiple objects
    $('.zoom').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    $('.video-pop-up').magnificPopup({
        type: 'iframe',
    });

    /* ==============================================
        OWL Carousel (initialize screenshot carousel)
    =============================================== */

    $(".screenshots-carousel").owlCarousel({

        autoPlay: 5000, //Set AutoPlay to 3 seconds

        items: 3,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [979, 1]

    });

});

$(window).load(function () {
    "use strict";

    /* ==============================================
    Isotope
    =============================================== */

    // FIlter
    if ($("#filter").length > 0) {
        var container = $('#filter');
        container.isotope({
            itemSelector: '.gallery-item',
            transitionDuration: '0.8s'
        });
        $(".filter").click(function () {
            $(".filter.active").removeClass("active");
            $(this).addClass("active");
            var selector = $(this).attr('data-filter');
            container.isotope({
                filter: selector
            });
            return false;
        });

        $(window).resize(function () {
            setTimeout(function () {
                container.isotope();
            }, 1000);
        }).trigger('resize');
    }


    if ($('#type-masory').length) {

        var $container = $('#type-masory');

        $container.imagesLoaded(function () {
            $container.fadeIn(1000).isotope({
                itemSelector: '.masonry-item'
            });
        });
    }

    /* ==============================================
    Preloader
    =============================================== */

    // will first fade out the loading animation
    $("#loading-animation").fadeOut();
    // will fade out the whole DIV that covers the website.
    $("#preloader").delay(600).fadeOut("slow");

});

// Fetch social media posts from the server
fetch('/getConfig')
    .then(response => response.json())
    .then(data => {
        const tweetContainer = document.getElementById('tweetContainer');
        const linkedinPostContainer = document.getElementById('linkedinPostContainer');

        // Iterate over each tweet and create a blockquote element for it
        Object.keys(data.tweets).forEach(key => {
            if (data.tweets[key] !== null) {
                const tweetBlock = document.createElement('blockquote');
                tweetBlock.className = 'twitter-tweet';
                tweetBlock.innerHTML = `<a href="${data.tweets[key]}"></a>`;
                tweetContainer.appendChild(tweetBlock);
            }
        });

        // Iterate over each LinkedIn post and create an iframe element for it
        Object.keys(data.linkedin).forEach(key => {
            if (data.linkedin[key] !== null) {
                const linkedinDiv = document.createElement('div');
                linkedinDiv.className = 'linkedin-post';

                const linkedinIframe = document.createElement('iframe');
                linkedinIframe.src = data.linkedin[key];
                //linkedinIframe.frameBorder = '0';
                linkedinIframe.allowFullScreen = '';
                linkedinIframe.title = 'LinkedIn Post';

                linkedinDiv.appendChild(linkedinIframe);
                linkedinPostContainer.appendChild(linkedinDiv);

                // const linkedinBlock = document.createElement('blockquote');
                // linkedinBlock.className = 'linkedin-post';
                // linkedinBlock.innerHTML = `<div class="tagembed-container" style=" width:100%;height:100%;overflow: auto;"><div class="tagembed-socialwall" data-wall-id="120682" view-url="https://widget.tagembed.com/120682">  </div></div>`;
                // linkedinPostContainer.appendChild(linkedinBlock);

            }
        });

        // Re-load Twitter widgets to render the tweets
        twttr.widgets.load(tweetContainer);
    })
    .catch(error => {
        console.error('Error fetching social media data: ', error);
    });

$(document).ready(function () {
    // Function to populate the table with data
    function populateTable(data) {
        const table = $('#publication-table').DataTable({
            responsive: true,
            paging: true,
            lengthChange: false,
            searching: true,
            info: false,
            "order": []
        }).columns.adjust().responsive.recalc();
        table.clear().draw();

        data.publications.forEach((publication, index) => {
            // Customize the row formatting as needed
            const row = [
                publication["Year of Publication"],
                publication["Title"],
            ];

            // Check for special tags and apply the CSS class for animation
            if (publication["Additional Comments"]) {
                row[1] = `<span>${row[1]}</span> <span class="tag">(${publication["Additional Comments"]})</span>`;
            }
            // Check for special tags and apply the CSS class for animation
            if (publication["Tags"]) {
                console.log("tag detected", publication["Tags"])
                row[1] = `<span>${row[1]}</span> <span style="padding-top: 0.1em; padding-bottom: 0.1rem" class="text-lg px-3 bg-blue-500 text-white rounded-full shadow-md">${publication["Tags"]}</span>`;
            }

            // Check if the publication is new
            const currentYear = new Date().getFullYear();
            console.log("current year", currentYear);
            if (publication["Year of Publication"] && publication["Year of Publication"] >= currentYear - 1) {
                row[1] = `<span>${row[1]}</span> <span class="text-2xl font-bold animate-gradient">New</span>`;
            }

            // Add a row to the table
            const newRow = table.row.add(row).draw().node();

            // Add an event listener to the row
            $(newRow).on('click', function () {
                // Open the link associated with the publication in a new tab
                if (publication["Link"]) {
                    window.open(publication["Link"], '_blank');
                }
            });
        });
    }

    // Function to fetch data from the server
    function fetchData() {
        console.log('Fetching data from the server...');
        $.get('/getConfig', function (data) {
            // Check if data is successfully fetched
            if (data && data.publications) {
                // Populate the table with the fetched data
                populateTable(data);
            } else {
                console.error('Failed to fetch data from the server.');
            }
        });
    }

    // Fetch and populate the table with data from the server
    fetchData();
});

/*
// Adjust the font size of the navbar items so they fit on one line
function adjustNavbarFontSize() {
    let navbarWidth = $('.navbar-nav').parent().width(); // Width of the container that holds the navbar
    let logoWidth = $('.navbar-brand img').outerWidth(true); // Width of the logo
    let availableWidth = navbarWidth - logoWidth; // Available width for nav items

    let totalWidth = 0;

    $('.navbar-nav > li').each(function () {
        totalWidth += $(this).outerWidth(true);
    });

    let fontSize = parseInt($('.navbar-nav > li > a').css('font-size'));

    // If items don't fit, reduce font size by 1px and check again
    while (totalWidth > availableWidth && fontSize > 10) {
        fontSize -= 1;
        $('.navbar-nav > li > a').css('font-size', fontSize + 'px');

        totalWidth = 0;
        $('.navbar-nav > li').each(function () {
            totalWidth += $(this).outerWidth(true);
        });
    }
}

// Initial call for font resizing and also call it on window resize
$(document).ready(function () {
    adjustNavbarFontSize();
    $(window).resize(adjustNavbarFontSize);
});
*/