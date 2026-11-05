
let partnerMotion = false;
let incomeMotion = false;
let incomeInterval;
let incomeNum = 0
let videoMotion = false;
let resultMotion = false;

$(document).ready(function(){
    uiPartner();
    uiMonthIncome();
    uiVideo();
    uiResult();
    $(window).bind("scroll",scrollEventListener)
    scrollEventListener()
});//(document).ready END

//------------ uiVideo script S ---------------------

const uiPartner = () => {
    initPartner()
}
const initPartner = () => {
    setTimeout(
        function(){
            if(!section_03_swiper) return

            section_03_swiper.update();
            if($(window).width()>767){
                section_03_swiper.slideTo(1);
            }else{
                section_03_swiper.slideTo(2);
            }
        },100
    )
    TweenMax.to($(".section_03 .swiper-box"), 0,{alpha:0, x:150, ease: Cubic.easeOut});
}

const startPartner = () => {
    TweenMax.to($(".section_03 .swiper-box"), 0.7,{delay:0.2, alpha:1, x:0, ease: Cubic.easeOut});
}

//------------ uiVideo script E ---------------------

//------------ MonthIncome script S ---------------------

const uiMonthIncome = () => {
    initIncome()
}
const initIncome = () => {
    incomeNum = 0
    $(".cont05 .profit i").eq(0).text('0');
    $(".cont05 .profit i").eq(1).text('0');
    $(".cont05 .profit i").eq(2).text('0');
    $(".cont05 .profit i").eq(3).text('0');
    $(".cont05 .profit i").eq(4).text('0');
    $(".cont05 .profit i").eq(5).text('0');
    $(".cont05 .profit i").eq(6).text('0');
}

const startIncome = () => {
    changeIncomeNum();
    incomeInterval = setInterval(changeIncomeNum,30)
}
const changeIncomeNum = () => {
    incomeNum += Math.random()*100000
    let len = Math.ceil(incomeNum).toString().length;
    let numStr = Math.ceil(incomeNum).toString()
    for(let i=0; i<7-len;i++){
        numStr = '0'+numStr;
    }
    if(incomeNum>1420000){
        incomeNum = 1420000
        numStr = '1420000';
        clearInterval(incomeInterval);
    }
    for(let i=0; i<7;i++){
        $(".section_04 .profit i").eq(i).text(numStr.substring(i,i+1));
    }
}
//------------ MonthIncome script E ---------------------

//------------ uiVideo script S ---------------------

const uiVideo = () => {
    initVideo()
}
const initVideo = () => {
    setTimeout(
        function(){
            if(!section_05_swiper) return
            section_05_swiper.update();
            if($(window).width()>767){
                section_05_swiper.slideTo(0);
            }else{
                section_05_swiper.slideTo(4);
            }

        },100
    )
    $(".section_05 .swiper-box .swiper-slide-active").html('');
    TweenMax.to($(".section_05 .swiper-box"), 0,{alpha:0, x:150, ease: Cubic.easeOut});
}

const startVideo = () => {
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
    TweenMax.to($(".section_05 .swiper-box"), 0.7,{delay:0.2, alpha:1, x:0, ease: Cubic.easeOut});
}

//------------ uiVideo script E ---------------------


//------------ uiResult script S ---------------------

const uiResult = () => {
    initResult()
}
const initResult = () => {
    setTimeout(
        function(){
            if(!section_09_swiper) return
            section_09_swiper.update();
            if($(window).width()>767){
                section_09_swiper.slideTo(3);
            }else{
                section_09_swiper.slideTo(2);
            }
        },100
    )
    TweenMax.to($(".section_09 .swiper-box"), 0,{alpha:0, x:150, ease: Cubic.easeOut});
}

const startResult = () => {
    TweenMax.to($(".section_09 .swiper-box"), 0.7,{delay:0.2, alpha:1, x:0, ease: Cubic.easeOut});
}

//------------ uiResult script E ---------------------


//------------ ScrollEvent script S ---------------------
function scrollEventListener(){
    if($(window).scrollTop()+$(window).height()>$(".section_03 .swiper-wrapper").offset().top){
        if(!partnerMotion){
            partnerMotion = true;
            initPartner();
            startPartner();
        }
    }
    if($(window).scrollTop()+$(window).height()<$(".section_03").offset().top){
        if(partnerMotion){
            partnerMotion = false;
            initPartner();
        }
    }
    if($(window).scrollTop()+$(window).height()>$(".section_04 .graph").offset().top){
        if(!incomeMotion){
            incomeMotion = true;
            initIncome();
            startIncome();
        }
    }
    if($(window).scrollTop()+$(window).height()<$(".section_04").offset().top){
        if(incomeMotion){
            incomeMotion = false;
            initIncome();
        }
    }
    if($(window).scrollTop()+$(window).height()>$(".section_05 .swiper-box").offset().top){
        if(!videoMotion){
            videoMotion = true;
            initVideo();
            startVideo();
        }
    }
    if($(window).scrollTop()+$(window).height()<$(".section_05").offset().top){
        if(videoMotion){
            videoMotion = false;
            initVideo();
        }
    }
    if($(window).scrollTop()+$(window).height()>$(".section_09 .swiper-wrapper").offset().top){
        if(!resultMotion){
            resultMotion = true;
            initResult();
            startResult();
        }
    }
    if($(window).scrollTop()+$(window).height()<$(".section_09").offset().top){
        if(resultMotion){
            resultMotion = false;
            initResult();
        }
    }

    if ($(".section_01_btn").length) {  // 요소가 존재하는 경우에만
        if ($(window).scrollTop() > $(".section_01_btn").offset().top) {
            $(".fixed-btn_02").css("display", "block");
        } else {
            $(".fixed-btn_02").css("display", "none");
        }
    }
}
//------------ ScrollEvent script E ---------------------
