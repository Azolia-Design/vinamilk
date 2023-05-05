const mainScript = () => {
    AOS.init({
        duration: 600,
        once: false,
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
            $('.header').removeClass('on-open')
        } else {
            $(this).addClass('open');
            $('.nav').addClass('active');
            $('.header').addClass('on-open')
        }
    })

    //Homepage
    if ($('[data-namespace="home"]')) {
        function homeScrollSection() {
            let sections = $('.section'),

            currentIndex = -1,
            wrap = gsap.utils.wrap(0, sections.length),
            animating;

            function gotoSection(index, direction) {
            index = wrap(index); // make sure it's valid
            animating = true;
            let fromTop = direction === -1,
                dFactor = fromTop ? -1 : 1,
                tl = gsap.timeline({
                    defaults: { duration: 1.25, ease: "power1.inOut" },
                    onComplete: () => animating = false
                });
            if (currentIndex >= 0) {
                // The first time this function runs, current is -1
                gsap.set(sections[currentIndex], { zIndex: 0 });
                tl.to(images[currentIndex], { yPercent: -15 * dFactor })
                .set(sections[currentIndex], { autoAlpha: 0 });
            }
            gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
            tl.fromTo([outerWrappers[index], innerWrappers[index]], { 
                yPercent: i => i ? -100 * dFactor : 100 * dFactor
                }, { 
                yPercent: 0 
                }, 0)
                .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
                .fromTo(splitHeadings[index].chars, { 
                    autoAlpha: 0, 
                    yPercent: 150 * dFactor
                }, {
                    autoAlpha: 1,
                    yPercent: 0,
                    duration: 1,
                    ease: "power2",
                    stagger: {
                    each: 0.02,
                    from: "random"
                    }
                }, 0.2);

            currentIndex = index;
            }

            Observer.create({
            type: "wheel,touch,pointer",
            wheelSpeed: -1,
            onDown: () => !animating && gotoSection(currentIndex - 1, -1),
            onUp: () => !animating && gotoSection(currentIndex + 1, 1),
            tolerance: 10,
            preventDefault: true
            });

            gotoSection(0, 1);
        }
        //homeScrollSection();
    }
    //Chap1F member
    if ($('[data-namespace="chap1f"]')) {
        console.log('chap1f')
        function tabInit() {

            function activeTab(index) {
                $('.chap1f-main-tab-btn.chap1f-main-btn').removeClass('active')
                $('.chap1f-main-tab-btn.chap1f-main-btn').eq(index).addClass('active')
                $('.chap1f-main-inner').removeClass('active')
                $('.chap1f-main-inner').eq(index).addClass('active')

                let curr = $('.chap1f-main-tab-btn.chap1f-main-btn.active').index();
                if (curr == 0) {
                    $('.chap1f-main-nav.nav-left').removeClass('active')
                    $('.chap1f-main-nav.nav-right').addClass('active')
                } else if (curr == 2) {
                    $('.chap1f-main-nav.nav-right').removeClass('active')
                    $('.chap1f-main-nav.nav-left').addClass('active')
                } else {
                    $('.chap1f-main-nav').addClass('active')
                }

            }

            $('.chap1f-main-tab-btn.chap1f-main-btn').on('click', function(e) {
                e.preventDefault();
                let index = $(this).index();
                activeTab(index)
            })

            $('.chap1f-main-nav').on('click', function(e) {
                e.preventDefault();
                let curr = $('.chap1f-main-tab-btn.chap1f-main-btn.active').index();
                console.log(curr)
                if ($(this).hasClass('nav-left') && curr != 0) {
                    let index = curr - 1;
                    activeTab(index)
                } else if ($(this).hasClass('nav-right') && curr != 2) {
                    let index = curr + 1;
                    activeTab(index)
                }
            })
        }
        tabInit();

        function memberPopup() {
            $('.chap1f-member-item-img-wrap').on('click', function(e) {
                e.preventDefault();
                let card = $(this).parent('[data-member="wrap"]');
                let popup = $('[data-member="popup-wrap"]');
                popup.find('[data-member="profile"]').attr('src', card.find('[data-member="profile"]').attr('src'))
                let data = ['name', 'job', 'gender', 'dob', 'skill', 'detail']
                data.forEach((index, el) => {
                    popup.find(`[data-member="${index}"]`).html(card.find(`[data-member="${index}"]`).html())
                })

                $('.chap1f-popup-wrap').addClass('active')
                
            })

            $('[data-popup="close"]').on('click', function(e) {
                e.preventDefault();
                $('.chap1f-popup-wrap').removeClass('active')
            })
        }

        memberPopup()
    }

    //Global nav
    if ($('[data-namespace="home"]').length) {
        if ($('.sub-nav-link-wrap').length) {
            $('[data-page]').removeClass('active')
            $(`[data-page="home"]`).addClass('active')
        }
    } else {
        if ($('.sub-nav-link-wrap').length) {
            let path = window.location.pathname;
            let chapterIndex = path.split('/')[1].split('-')[1]
            console.log(chapterIndex)
            $('[data-page]').removeClass('active')
            $(`[data-page="chap${chapterIndex}"]`).addClass('active')
        }
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
