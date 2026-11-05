let section_01_swiper
let section_05_swiper
let section_03_swiper
let section_09_swiper
let resultStrong = TweenMax.to($(".section_01 .inner .swiper-slide-active").find("strong"), 0.4,{scale:1.1, ease: Cubic.easeOut,repeat:-1});
$(document).ready(function(){
    // section_01_swiper = new Swiper('.section_01 .inner', {
    //     autoHeight: true,
    //     slidesPerView: 'auto',
    //     spaceBetween: 0,
	// 	breakpoints: {
	// 	767: { spaceBetween: 53, },
	// 	},
	// 	centeredSlides: true,
    //     loop:true,
    //     autoplay:{
    //         delay:4000,
    //         disableOnInteraction: false,
    //     },
    //     on: {
    //         init: function(swiper) {
    //             handleSlideChange(swiper);
    //         },
    //         slideChangeTransitionStart : function(e) {
    //             console.log('슬라이드 전환 애니메이션이 시작되었습니다.');
    //             resultStrong.kill();
	// 			$(".section_01 .inner .swiper-slide").each(function(){
	// 				TweenMax.to($(this), 0.5,{scale:0.9, autoAlpha:0, ease: Cubic.easeOut});//
    //                 TweenMax.to($(this).find("strong"), 0,{x:0, scale:1, alpha:1, ease: Cubic.easeOut,repeat:-1});
	// 			})
	// 			$(".section_01 .inner .swiper-slide-active").each(function(){
	// 				TweenMax.to($(this), 0.5,{scale:1, autoAlpha:1, ease: Cubic.easeOut,onComplete:viewResultListener});//
	// 			})
	// 		},
    //         beforeTransitionStart: function (swiper) {
    //             handleSlideChange(swiper);
    //         }
	// 	},
    // });

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

    const section03 = document.querySelector('.section_03');
    if(isVisible(section03)){
        section_03_swiper = new Swiper('.section_03 .swiper-box', {
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
    }

    const section05 = document.querySelector('.section_05');
    if(isVisible(section05)){
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
    }

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
    const section09 = document.querySelector('.section_09');
    if(isVisible(section09)){
        section_09_swiper = new Swiper('.section_09 .swiper-box', {
            autoHeight: true,
            slidesPerView: 'auto',
            spaceBetween: 20,
            breakpoints: {
                767: { spaceBetween: 53, },
            },
            centeredSlides: true,
            loop:true,
        });
    }


});


function setSection01Swiper(defaultSlideIndex) {
    // 기존 Swiper 인스턴스가 있다면 파괴
    if (section_01_swiper) {
        section_01_swiper.destroy(true, true);
    }

    section_01_swiper = new Swiper('.section_01 .inner', {
        autoHeight: true,
        slidesPerView: 'auto',
        spaceBetween: 0,
        breakpoints: {
            767: { spaceBetween: 53, },
        },
        centeredSlides: true,
        loop:true,
        initialSlide:defaultSlideIndex,
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
            slideNextTransitionStart(swiper){
                handleSlideChange(swiper);
                swiper.autoplay.stop();
                swiper.autoplay.start();
            }
        },
    });
}

function handleSlideChange(swiper) {
    const defaultIndex = swiper.params.initialSlide
    const activeIndex = swiper.realIndex;

    if (defaultIndex === activeIndex) {  // 2번 슬라이드
        swiper.params.autoplay.delay = 4000;
    } else {
        swiper.params.autoplay.delay = 2000;
    }
    // console.log(`handleSlideChange delay = ${swiper.params.autoplay.delay}`)

}


function viewResultListener(){
    resultStrong = TweenMax.to($(".section_01 .inner .swiper-slide-active").find("strong"), 0.5,{x:-1, y:1, scale:1.1, alpha:0.5, ease: Cubic.easeIn,repeat:-1,yoyo:true});
}
