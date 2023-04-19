const mainScript = () => {
    /*!
* jquery.countup.js 1.0.3
*
* Copyright 2016, Adrián Guerra Marrero http://agmstudio.io @AGMStudio_io
* Released under the MIT License
*
* Date: Oct 27, 2016
*/
(function( $ ){
    "use strict";
  
    $.fn.countUp = function( options ) {
  
      // Defaults
      var settings = $.extend({
          'time': 2000,
          'delay': 10
      }, options);
  
      return this.each(function(){
  
          // Store the object
          var $this = $(this);
          var $settings = settings;
  
          var counterUpper = function() {
              if(!$this.data('counterupTo')) {
                  $this.data('counterupTo',$this.text());
              }
              var time = parseInt($this.data("counter-time")) > 0 ? parseInt($this.data("counter-time")) : $settings.time;
              var delay = parseInt($this.data("counter-delay")) > 0 ? parseInt($this.data("counter-delay")) : $settings.delay;
              var divisions = time / delay;
              var num = $this.data('counterupTo');
              var nums = [num];
              var isComma = /[0-9]+,[0-9]+/.test(num);
              num = num.replace(/,/g, '');
              var isInt = /^[0-9]+$/.test(num);
              var isFloat = /^[0-9]+\.[0-9]+$/.test(num);
              var decimalPlaces = isFloat ? (num.split('.')[1] || []).length : 0;
  
              // Generate list of incremental numbers to display
              for (var i = divisions; i >= 1; i--) {
  
                  // Preserve as int if input was int
                  var newNum = parseInt(Math.round(num / divisions * i));
  
                  // Preserve float if input was float
                  if (isFloat) {
                      newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);
                  }
  
                  // Preserve commas if input had commas
                  if (isComma) {
                      while (/(\d+)(\d{3})/.test(newNum.toString())) {
                          newNum = newNum.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
                      }
                  }
  
                  nums.unshift(newNum);
              }
  
              $this.data('counterup-nums', nums);
              $this.text('0');
  
              // Updates the number until we're done
              var f = function () {
                if (!$this.data('counterup-nums')) {
                    return;
                }
                $this.text($this.data('counterup-nums').shift());
                if ($this.data('counterup-nums').length) {
                    setTimeout($this.data('counterup-func'), $settings.delay);
                } else {
                    delete $this.data('counterup-nums');
                    $this.data('counterup-nums', null);
                    $this.data('counterup-func', null);
                }
            };
              
              $this.data('counterup-func', f);
  
              // Start the count up
              setTimeout($this.data('counterup-func'),delay);
          };
  
          // Perform counts when the element gets into view
          $this.waypoint(counterUpper, { offset: '100%', triggerOnce: true });
      });
  
    };
  
  })( jQuery );

    //Animate on scroll
    AOS.init({
        duration: 600,
        once: false,
    });
    $('[data-counter]').countUp({
        scrollSpyOnce: true 
    });

    //Lenis scroll
    let lenis = new Lenis({
        lerp: false,
        duration: 1.2
    });
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    lenis.on('scroll', function(inst) {
        if (inst.scroll > $('.header').height()) {
            $('.header').addClass('on-scroll')
            if (inst.direction == 1) {
                $('.header').addClass('on-hide')
            } else if (inst.direction == -1) {
                $('.header').removeClass('on-hide')
            }
        } else {
            $('.header').removeClass('on-scroll')
        }
    })

    $('[data-nav]').on('click', function(e) {
        e.preventDefault();
        let type = $(this).attr('data-nav');
        console.log(type)
        if (type == 'open') {
            $('.nav').addClass('active')
        } else if (type == 'close') {
            $('.nav').removeClass('active')
        }
    })
    $('[data-lang]').on('click', function(e) {
        e.preventDefault();
        let type = $(this).attr('data-lang');
        console.log(type)
        if (type == 'open') {
            if ($('.header-lang-wrap').hasClass('active')) {
                $('.header-lang-wrap').removeClass('active')
            } else {
                $('.header-lang-wrap').addClass('active')
            }
        } else if (type == 'close') {
            $('.header-lang-wrap').removeClass('active')
        }
    })
    

    //Contact page
    if ($('[data-pagename="lienhe"]').length) {
        $('[data-accord="head"').on('click', function(e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                $(this).removeClass('active')
                $(this).parent().find('[data-accord="body"]').slideUp();
            } else {
                $(this).addClass('active')
                $(this).parent().find('[data-accord="body"]').slideDown({
                    start: function() {
                        if ($(window).width() >= 768) {
                            $(this).css('display','grid');
                        }                      
                    }
                })
            }
        })
    }

    function detactPage() {
        let namePage = $('[data-pagename]').attr('data-pagename');
        console.log(namePage)
        $(`[data-link-header="${namePage}"]`).addClass('active')
    }
    detactPage()

    function clickToSection() {
        if ($('[data-section]').length >= 1) {
            let allSections = $('[data-section]')
            for (let x = 0; x < allSections.length; x++) {
                allSections.eq(x).attr('data-section', x)
            }
            let activeSc, nextSc, prevSc;
            let currentScroll = {scroll: lenis.targetScroll}
            lenis.on('scroll', function(inst) {
                detectSection(inst)
            })
            setTimeout(() => {
                detectSection(currentScroll)
                console.log(activeSc)    
            }, 100);
    
            function detectSection(scroller) {
                for (let x = 0; x < allSections.length; x++) {
                    let top = allSections.eq(x).offset().top - scroller.scroll;
                    if (top > (- $(window).height() / 5) && top <= ($(window).height() / 5)) {
                        activeSc = x
                        nextSc = x + 1;
                        prevSc = x - 1;
                        if (x == 0) {
                            $('.page-nav-left').addClass('inactive')
                            $('.page-nav-right').removeClass('inactive')
                        } else if (x == allSections.length - 1) {
                            $('.page-nav-right').addClass('inactive')
                            $('.page-nav-left').removeClass('inactive')
                        } else {
                            $('.page-nav-right').removeClass('inactive')
                            $('.page-nav-left').removeClass('inactive')
                        }
                        if (prevSc >= 0) {
                            $('.page-nav-left').attr('data-scroll', `[data-section="${prevSc}"]`)
                        }
                        if (nextSc < allSections.length) {
                            $('.page-nav-right').attr('data-scroll', `[data-section="${nextSc}"]`)
                        }
                    }
                }
            }
    
            $('.page-nav-ic-wrap').on('click', function(e) {
                e.preventDefault();
                let target = $(this).attr('data-scroll')
                lenis.scrollTo(target, {duration: 0, offset: -$(window).height()/14})
            })
        }
    }
    clickToSection()

    function dropdownInit() {
        if ($(window).width() > 1920) {
            $('.header-link').on('mouseenter', function(e) {
                if ($(this).find('.ic-embed').length) {
                    console.log('dropdown')
                    $('.header-link-wrap-drop-wrap').removeClass('active')
                    $(this).parent().find('.header-link-wrap-drop-wrap').addClass('active')
                }
            })

            $('.header-link').on('mouseleave', function(e) {
                if ($(this).find('.ic-embed').length) {
                    console.log('dropdown')
                    setTimeout(() => {
                        if (!$(this).parent().find('.header-link-wrap-drop-wrap').is(':hover')) {
                            $(this).parent().find('.header-link-wrap-drop-wrap').removeClass('active')
                        }
                    }, 800);
                }
            })

            $('.header-link-wrap-drop-wrap').on('mouseleave', function(e) {
                $(this).removeClass('active')
            })
        } else {
            $('.nav-link-item').on('click', function(e) {
                if ($(this).parent().find('.header-link-wrap-drop-wrap').length) {
                    e.preventDefault();
                    console.log('dropdown')
                    if ($(this).parent().find('.header-link-wrap-drop-wrap').hasClass('active')) {
                        $(this).parent().find('.header-link-wrap-drop-wrap').removeClass('active')
                    } else {
                        $('.header-link-wrap-drop-wrap').removeClass('active')
                        $(this).parent().find('.header-link-wrap-drop-wrap').addClass('active')
                    }
                }
            })
        }
    }
    dropdownInit()

}
window.onload = mainScript;
