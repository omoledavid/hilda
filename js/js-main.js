(function($){
    "use strict";
    
    // Navbar Menu JS
    $('.navbar .navbar-nav li a').on('click', function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 10
        }, 30);
        e.preventDefault();
    });
    $(document).on('click','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
            $(this).collapse('hide');
        }
    });
    $('.navbar .navbar-nav li a').on('click', function(){
        $('.navbar-collapse').collapse('hide');
        $('.burger-menu').removeClass('active');
    });

    // Header Sticky
    $(window).on('scroll',function() {
        if ($(this).scrollTop() > 120){  
            $('.navbar').addClass("is-sticky");
        }
        else{
            $('.navbar').removeClass("is-sticky");
        }
    });

    // Burger Menu
    $('.burger-menu').on('click', function() {
        $(this).toggleClass('active');
    });
    
    // TweenMax JS
    $('.main-banner').mousemove(function(e){
        var wx = $(window).width();
        var wy = $(window).height();
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var newx = x - wx/2;
        var newy = y - wy/2;
        $('.banner-shape, .main-image').each(function(){
            var speed = $(this).attr('data-speed');
            if($(this).attr('data-revert')) speed *= -1;
            TweenMax.to($(this), 1, {x: (1 - newx*speed), y: (1 - newy*speed)});
        });
    });
    var controller = new ScrollMagic.Controller();
    $(".single-blog-post .post-image, .single-blog-post .post-content, .video-image, .overview-image .image").each(function() {
        var tl = new TimelineMax();
        if(tl.isActive()){
            return false;
        }
        var cov = $(this).find(".overlay");
        tl.from(cov, .6, { scaleX: 0, transformOrigin: "right" });
        tl.to(cov, .6, { scaleX: 0, transformOrigin: "left" }, "reveal");
        var scene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 0.7
        })
        .setTween(tl)
        .addTo(controller);
    });
    $(".single-partners-box").each(function() {
        var tl = new TimelineMax();
        if(tl.isActive()){
            return false;
        }
        var cov = $(this).find(".overlay");
        tl.from(cov, .6, { scaleX: 0, transformOrigin: "left" });
        tl.to(cov, .6, { scaleX: 0, transformOrigin: "right" }, "reveal");
        var scene = new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 0.7
        })
        .setTween(tl)
        .addTo(controller);
    });

    // rpi Progress JS
    var rpi;
    setTimeout(function waitUntilDomIsReadyLoadingCustomFontsMightOffsetThis() {
        rpi = new ReadingPositionIndicator({
            rpiArea: '[data-rpi-area]', /* optional, query selector to an element */
            progressBar: { /* optional */
                show: true, /* default true */
                color: 'rgba(0, 120, 120, .5)', /* default from css */
            },
        }).init();
    }, 500);

    // JSCrollability JS
    $.jScrollability([
        {
            'selector': '.shape1',
            'start': 'parent',
            'end': 'parent',
            'fn': {
                'right': {
                    'start': 0,
                    'end': 10,
                    'unit': '%'
                }
            }
        }
    ]);

    // Popup Video
    $('.popup-youtube').magnificPopup({
        disableOn: 320,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    // Odometer JS
    $('.odometer').appear(function(e) {
        var odo = $(".odometer");
        odo.each(function() {
            var countNumber = $(this).attr("data-count");
            $(this).html(countNumber);
        });
    });

    // Progress Bar
    if($('.progress-line').length){
        $('.progress-line').appear(function(){
            var el = $(this);
            var percent = el.data('width');
            $(el).css('width',percent+'%');
        },{accY: 0});
    }
    if($('.count-box').length){
        $('.count-box').appear(function(){
            var $t = $(this),
                n = $t.find(".count-text").attr("data-stop"),
                r = parseInt($t.find(".count-text").attr("data-speed"), 10);

            if (!$t.hasClass("counted")) {
                $t.addClass("counted");
                $({
                    countNum: $t.find(".count-text").text()
                }).animate({
                    countNum: n
                }, {
                    duration: r,
                    easing: "linear",
                    step: function() {
                        $t.find(".count-text").text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $t.find(".count-text").text(this.countNum);
                    }
                });
            }
            
        },{accY: 0});
    }

    // WoW JS
	if($('.wow').length){
		var wow = new WOW({
			mobile: false
		});
		wow.init();
	}

}(jQuery));

try {
	// function to set a given theme/color-scheme
	function setTheme(themeName) {
		localStorage.setItem('kreton_insta_theme', themeName);
		document.documentElement.className = themeName;
	}
	// function to toggle between light and dark theme
	function toggleTheme() {
		if (localStorage.getItem('kreton_insta_theme') === 'theme-dark') {
			setTheme('theme-light');
		} else {
			setTheme('theme-dark');
		}
	}
	// Immediately invoked function to set the theme on initial load
	(function () {
		if (localStorage.getItem('kreton_insta_theme') === 'theme-dark') {
			setTheme('theme-dark');
			document.getElementById('slider').checked = false;
		} else {
			setTheme('theme-light');
		document.getElementById('slider').checked = true;
		}
	})();
} catch (err) {}