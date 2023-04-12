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
                      $(this).css('display','grid');
                    }
                })
            }
        })
    }

    // Demo click to section
    function clickToSection() {
        let allSections = $('[data-section]')
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
                        $('.page-nav-left').attr('data-scroll', `.${allSections.eq(prevSc).attr('class').split(' ').join('.')}`)
                    }
                    if (nextSc < allSections.length) {
                        $('.page-nav-right').attr('data-scroll', `.${allSections.eq(nextSc).attr('class').split(' ').join('.')}`)
                    }
                }
            }
        }

        $('.page-nav-ic-wrap').on('click', function(e) {
            e.preventDefault();
            let target = $(this).attr('data-scroll')
            lenis.scrollTo(target)
        })
    }
    clickToSection()



}
window.onload = mainScript;
