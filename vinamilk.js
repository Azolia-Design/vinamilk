const mainScript = () => {
    //!function(t){"use strict";t.fn.countUp=function(e){var a=t.extend({time:2e3,delay:10},e);return this.each(function(){var e=t(this),n=a,u=function(){e.data("counterupTo")||e.data("counterupTo",e.text());var t=parseInt(e.data("counter-time"))>0?parseInt(e.data("counter-time")):n.time,a=parseInt(e.data("counter-delay"))>0?parseInt(e.data("counter-delay")):n.delay,u=t/a,r=e.data("counterupTo"),o=[r],c=/[0-9]+,[0-9]+/.test(r);r=r.replace(/,/g,"");for(var d=(/^[0-9]+$/.test(r),/^[0-9]+\.[0-9]+$/.test(r)),s=d?(r.split(".")[1]||[]).length:0,i=u;i>=1;i--){var p=parseInt(Math.round(r/u*i));if(d&&(p=parseFloat(r/u*i).toFixed(s)),c)for(;/(\d+)(\d{3})/.test(p.toString());)p=p.toString().replace(/(\d+)(\d{3})/,"$1,$2");o.unshift(p)}e.data("counterup-nums",o),e.text("0");var f=function(){e.text(e.data("counterup-nums").shift()),e.data("counterup-nums").length?setTimeout(e.data("counterup-func"),a):(delete e.data("counterup-nums"),e.data("counterup-nums",null),e.data("counterup-func",null))};e.data("counterup-func",f),setTimeout(e.data("counterup-func"),a)};e.waypoint(u,{offset:"100%",triggerOnce:!0})})}}(jQuery);
    //Animate on scroll
    AOS.init({
        once: false,
    });
    // $('[data-counter]').countUp({
    //     scrollSpyOnce: true 
    // });

    //Lenis scroll
    let lenis = new Lenis({
        lerp: false,
        duration: 1.8
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
    if ($('[data-namepage="contact"]').length) {
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
