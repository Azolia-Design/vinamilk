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
            console.log(inst.direction)
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


}
window.onload = mainScript;