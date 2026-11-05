let section_01_swiper
let section_05_swiper
let section_07_swiper
let section_09_swiper
let resultStrong = TweenMax.to($(".section_01 .inner .swiper-slide-active").find("strong"), 0.4,{scale:1.1, ease: Cubic.easeOut,repeat:-1});
$(document).ready(function(){
    const section_01 = new Swiper('.section_01 .inner', {
        autoHeight: true,
        slidesPerView: 'auto',
        spaceBetween: 0,
		breakpoints: {
		767: { spaceBetween: 53, },
		},
		centeredSlides: true,
        loop:true,
        autoplay:{
            delay:4000,
            disableOnInteraction: false,
        },
        on: {
            slideChangeTransitionStart : function(e) {
                resultStrong.kill();
				$(".section_01 .inner .swiper-slide").each(function(){
					TweenMax.to($(this), 0.5,{scale:0.9, autoAlpha:0, ease: Cubic.easeOut});//
                    TweenMax.to($(this).find("strong"), 0,{x:0, scale:1, alpha:1, ease: Cubic.easeOut,repeat:-1});
				})
				$(".section_01 .inner .swiper-slide-active").each(function(){
					TweenMax.to($(this), 0.5,{scale:1, autoAlpha:1, ease: Cubic.easeOut,onComplete:viewResultListener});//
				})
			},
		},
    });
    const viewResultListener = ()=>{
        resultStrong = TweenMax.to($(".section_01 .inner .swiper-slide-active").find("strong"), 0.5,{x:-1, y:1, scale:1.1, alpha:0.5, ease: Cubic.easeIn,repeat:-1,yoyo:true});
    }
    setTimeout(
        function(){
            resultStrong.kill();
            $(".section_01 .inner .swiper-slide").each(function(){
                TweenMax.to($(this), 0.5,{scale:0.9, autoAlpha:0, ease: Cubic.easeOut});
                TweenMax.to($(this).find("strong"), 0,{scale:1, alpha:1, ease: Cubic.easeOut,repeat:-1});
            })
            $(".section_01 .inner .swiper-slide-active").each(function(){
                TweenMax.to($(this), 0.5,{scale:1, autoAlpha:1,ease: Cubic.easeOut,onComplete:viewResultListener});
            })
        },100
    )
    section_07_swiper = new Swiper('.section_07 .swiper-box', {
        autoHeight: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
		breakpoints: {
		767: { spaceBetween: 34, },
		},
		centeredSlides: true,
		pagination: {
			el: ".swiper-pagination",
			clickable: true,     
		},
        loop:true,
        //autoplay:{
            //delay:800,
            //disableOnInteraction: false,
        //}
    });


    section_05_swiper = new Swiper('.section_05 .swiper-box', {
        autoHeight: true,
        slidesPerView: 'auto',
        spaceBetween: 40,
		breakpoints: {
		767: { spaceBetween: 83, },
		},
		centeredSlides: true,
        loop : true,
		navigation: {
			nextEl: ".section_05 .swiper-box .swiper-button-next",
			prevEl: ".section_05 .swiper-box .swiper-button-prev",
		},
        on: {
			slideChangeTransitionStart : function(e) {
				//console.log($(".swiper_PremiumLife .swiper-slide-active").attr("class"))
				$(".section_05 .swiper-box .swiper-slide").each(function(){
                    $(this).html('')
					TweenMax.to($(this), 0.5,{scale:0.8, ease: Cubic.easeOut});
				})
				$(".section_05 .swiper-box .swiper-slide-active").each(function(){
					TweenMax.to($(this), 0.5,{scale:1, ease: Cubic.easeOut,onComplete:viewVideoListener});
				})
			},
		},
    });
    setTimeout(
        function(){
            $(".section_05 .swiper-box .swiper-slide").each(function(){
                $(this).html('')
                TweenMax.to($(this), 0.5,{scale:0.8, ease: Cubic.easeOut});
            })
            $(".section_05 .swiper-box .swiper-slide-active").each(function(){
                TweenMax.to($(this), 0.5,{scale:1, ease: Cubic.easeOut,onComplete:viewVideoListener});
            })
        },100
    )

    const viewVideoListener = () =>{
        if($(".section_05 .swiper-box .swiper-slide-active").hasClass('swiper-slide01')){
            $(".section_05 .swiper-box .swiper-slide-active").html('<iframe src="https://www.youtube.com/embed/ofbZObZJRd4?autoplay=1&mute=1&controls=0&loop=1&playlist=ofbZObZJRd4&playsinline=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>');
        }
        if($(".section_05 .swiper-box .swiper-slide-active").hasClass('swiper-slide02')){
            $(".section_05 .swiper-box .swiper-slide-active").html('<iframe src="https://www.youtube.com/embed/oOF0RjJygw8?autoplay=1&mute=1&controls=0&loop=1&playlist=oOF0RjJygw8&playsinline=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>');
        }
        if($(".section_05 .swiper-box .swiper-slide-active").hasClass('swiper-slide03')){
            $(".section_05 .swiper-box .swiper-slide-active").html('<iframe src="https://www.youtube.com/embed/4BUEBgHuY6I?autoplay=1&mute=1&controls=0&loop=1&playlist=4BUEBgHuY6I&playsinline=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>');
        }
        if($(".section_05 .swiper-box .swiper-slide-active").hasClass('swiper-slide04')){
            $(".section_05 .swiper-box .swiper-slide-active").html('<iframe src="https://www.youtube.com/embed/siWRNrlTOy8?autoplay=1&mute=1&controls=0&loop=1&playlist=siWRNrlTOy8&playsinline=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>');
        }
        if($(".section_05 .swiper-box .swiper-slide-active").hasClass('swiper-slide05')){
            $(".section_05 .swiper-box .swiper-slide-active").html('<iframe src="https://www.youtube.com/embed/Mz2PxnhmQTM?autoplay=1&mute=1&controls=0&loop=1&playlist=Mz2PxnhmQTM&playsinline=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>');
        }
    }

    const section_09_swiper_1 = new Swiper('.section_09 .swiper-box', {
        autoHeight: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
		loop:true,
		loopAdditionalSlides : 1,
        speed:1000,
		breakpoints: {
		767: { spaceBetween: 53, },
		},
		centeredSlides: true,

		autoplay:{
            delay:800,
            disableOnInteraction: false,
        },

    });

	const section_01A_swiper = new Swiper('.section_01A .cont_list', {
        slidesPerView: 1,
        spaceBetween: 15,
        direction: 'vertical',
        loop : true,
        loopAdditionalSlides : 1,
        speed:1000,
        autoplay:{
            delay:800,
            disableOnInteraction: false,
        },
        // 슬라이드 이동 시 AOS 새로고침
        on: {
            slideChange: function () {
                AOS.refresh();
            }
        }

    });

    const swiper_member = new Swiper('.section-visual .member-list', {
        slidesPerView: 1,
        spaceBetween: 15,
        direction: 'vertical',
        loop : true,
        loopAdditionalSlides : 1,
        speed:1000,
        autoplay:{
            delay:800,
            disableOnInteraction: false,
        },
        // 슬라이드 이동 시 AOS 새로고침
        on: {
            slideChange: function () {
                AOS.refresh();
            }
        }

    });


    const swiper_members = new Swiper('.section-calc .member-list', {
        slidesPerView: 1.8,
        spaceBetween: 12,
        // 슬라이드 이동 시 AOS 새로고침
        on: {
            slideChange: function () {
                AOS.refresh();
            }
        }
    });

    const swiper_review = new Swiper('.section-story .review', {
        autoHeight: true,
        slidesPerView: 1,
        spaceBetween: 18,
        pagination: {
            el: ".section-story .review .swiper-pagination",
            clickable: true,
        },
        // 슬라이드 이동 시 AOS 새로고침
        on: {
            slideChange: function () {
                AOS.refresh();
            }
        }
    });

    AOS.init(); // AOS 초기화 코드
    var isVisible = false;
    // scroll event
    $(window).scroll(function() {
        var scrollPosition = $(window).scrollTop();
        var visualHeight = $('.section-visual .visual-top').outerHeight();

        if (scrollPosition > visualHeight) {
            $('.fixed-btn').addClass('floating');
        } else {
            $('.fixed-btn').removeClass('floating');
        }

        if ($('.section-contact').hasClass('aos-animate')) {
            $('.fixed-btn').addClass('hide');
        } else {
            $('.fixed-btn').removeClass('hide');
        }

        $('.section-calc .chart-box li').each(function(index) {
            var $this = $(this);
            if (isElementInViewport($(this))) {
                setTimeout(function() {
                    $this.addClass('active');
                }, index * 50);
            } else {
                setTimeout(function() {
                    $this.removeClass('active');
                }, index * 50);
            }
        });
    });
});






