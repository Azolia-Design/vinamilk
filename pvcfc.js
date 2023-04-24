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


}
window.onload = mainScript;