const mainScript = () => {
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

    // new fullpage('#fullpage', {
    //     //options here
    //     autoScrolling:true,
    //     scrollHorizontally: true
    // });
    lenis.on('scroll', function(inst) {
        if (inst.scroll > $('.header').height()) {
            $('.header').addClass('on-scroll')
            if (inst.direction == 1) {
                $('.header').addClass('on-hide')
                if ($('.sc-subnav-wrap').length) {
                    $('.sc-subnav-wrap').addClass('on-hide')
                }
            } else if (inst.direction == -1) {
                $('.header').removeClass('on-hide')
                if ($('.sc-subnav-wrap').length) {
                    $('.sc-subnav-wrap').removeClass('on-hide')
                }
            }
        } else {
            $('.header').removeClass('on-scroll')
        }

        if ($('.sc-subnav-wrap').length) {
            if (inst.scroll > $('.chapter-content-wrap').offset().top) {
                $('.sc-subnav-inner').addClass('on-scroll')
            } else {
                $('.sc-subnav-inner').removeClass('on-scroll')
            }
        }
    })

    //Nav
    $('.nav-toggle').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $('.nav').removeClass('active');
        } else {
            $(this).addClass('open');
            $('.nav').addClass('active');
        }
    })

    //Homepage
    if ($('[data-namespace="home"]')) {
        
    }

    //Sub nav
    $('.nav-link-head').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parent('.nav-link-wrap').find('.nav-sub-wrap').slideUp();
        } else {
            $('.nav-link-head').removeClass('active')
            $(this).addClass('active');
            $('.nav-sub-wrap').slideUp();
            $(this).parent('.nav-link-wrap').find('.nav-sub-wrap').slideDown();
        }
    })

    // Sub nav active
    if ($('.sc-subnav-wrap').length) {
        let path = window.location.pathname;
        console.log(path)
        $('.sc-subnav-link-wrap').removeClass('active')
        $(`.sc-subnav-link-wrap[href="${path}"]`).addClass('active')
    }

    function LinkPage() {
        $('.link-home,.link-load').on('click',function(e){
            e.preventDefault(),
            $(".nav-click").hasClass("active") && $(".nav-click").trigger("click");
            var t = $(this).attr("href");
            return $('.go-top, .wheel, .header, .footer').removeClass('show'), $(".mask").removeClass("show"),$(".main").animate({
                opacity: 1
            }, 600, "linear", function() {
                window.location = t
            }), !1
        })
    }

}
window.onload = mainScript;
