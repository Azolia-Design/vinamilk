const mainScript = () => {
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
                lenis.scrollTo(target, {duration: 0})
            })
        }
    }
    clickToSection()
}
window.onload = mainScript;
