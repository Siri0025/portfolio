!(function($) {
  "use strict";

  // Nav Menu
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          return;
        }

        if (!$('#header').hasClass('header-top')) {
          $('#header').addClass('header-top');
          setTimeout(function() {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');
          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;
      }
    }
  });

  // Activate/show sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
      setTimeout(function() {
        $("section").removeClass('section-show');
        $(initial_nav).addClass('section-show');
      }, 350);
    }
  }

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Initialize Components on Document Ready
  $(document).ready(function() {
    // Initialize typed.js
    if ($('.typing').length) {
      let typed = new Typed('.typing', {
        strings: ["a Machine Learning Engineer", "a Data Scientist", "a Researcher", "a Developer"],
        loop: true,
        typeSpeed: 85,
        backSpeed: 85,
        backDelay: 1500
      });
    }

    // Initialize Certificates Carousel
    if ($('.certificates-carousel').length) {
      $(".certificates-carousel").owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        nav: true,
        dots: true,
        margin: 20,
        smartSpeed: 1000,
        navText: [
          '<i class="bx bx-chevron-left"></i>',
          '<i class="bx bx-chevron-right"></i>'
        ],
        responsive: {
          0: { items: 1 },
          768: { items: 1 }
        },
        onInitialized: function() {
          // Custom initialization logic for PDFs
          $('.certificate-box object').on('load', function() {
            $(this).css('height', '400px');
          });
        }
      });
    }

    // Initialize Venobox
    if ($('.venobox').length) {
      $('.venobox').venobox({
        'share': false,
        'spinner': 'wave',
        'spinColor': '#12d640'
      });
    }
  });

  // Skills Animation
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Counter Animation
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Section Visibility Handler
  function handleSectionVisibility() {
    var scrollPosition = $(window).scrollTop();
    
    $('section').each(function() {
      var target = $(this);
      var targetTop = target.offset().top - 200;
      
      if (scrollPosition >= targetTop) {
        target.addClass('section-show');
      }
    });
  }

  // Scroll Event Handler
  $(window).scroll(function() {
    handleSectionVisibility();
  });

  // Handle Loading State
  $(window).on('load', function() {
    if ($('.loading-screen').length) {
      $('.loading-screen').fadeOut(1000);
    }
    handleSectionVisibility();

    // Initialize Portfolio Filter if exists
    if ($('.portfolio-container').length) {
      var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      $('#portfolio-flters li').on('click', function() {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({
          filter: $(this).data('filter')
        });
      });
    }
  });

})(jQuery);
