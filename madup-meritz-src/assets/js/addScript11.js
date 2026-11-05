let notiPopup = false;
let incomeMotion = false;
let incomeInterval;
let incomeNum = 0;
let partnerWayMotion = false;
let top3Motion = false;
let movieMotion = false;
let proposerInfoMotion = false;
let income2Motion = false;
let income2Interval;
let income2Num = 0;
let viewMode = false;
$(document).ready(function () {
  uiInitMotion();
  uiMonthIncome();
  uiMonthPartnerWay();
  uiTop3();
  uiTime();
  uiMovie();
  uiProposerInfo();
  uiScrollBox();
  $("#sheet-coupon-info .buttonClose").bind("click", cuponPopupCloseHandler);
  $(window).bind("scroll", scrollEventListener);
  scrollEventListener();
  $(window).bind("resize", resizeEventListener);
  resizeEventListener();
}); //(document).ready END

const uiInitMotion = () => {
  TweenMax.to($(".section_01A .effectText img"), 0.2, {
    delay: 1,
    scale: 1.2,
    alpha: 1,
  });
  TweenMax.to($(".section_01A .effectText img"), 0.4, {
    delay: 1.1,
    scale: 1,
    alpha: 1,
    ease: Expo.easeOut,
    repeat: 2,
    yoyo: true,
  });
};
//------------ uiTime script S ---------------------
const uiTime = () => {
  const timeInterval = setInterval(viewTimeChange, 1000);
};
const viewTimeChange = () => {
  const _time = new Date();
  const _dTime = new Date(
    _time.getFullYear(),
    _time.getMonth(),
    _time.getDate() + 1
  );
  const _gap = _dTime.getTime() - _time.getTime();
  const _s = String(Math.floor(_gap / 1000) % 60).padStart(2, "0");
  const _m = String(Math.floor(_gap / (1000 * 60)) % 60).padStart(2, "0");
  const _h = String(Math.floor(_gap / (1000 * 60 * 60)) % 24).padStart(2, "0");

  $(".fixed-btn_02 .time em").eq(0).html(_h);
  $(".fixed-btn_02 .time em").eq(1).html(_m);
  $(".fixed-btn_02 .time em").eq(2).html(_s);
};
//------------ uiTime script E ---------------------
//------------ MonthIncome script S ---------------------

const uiMonthIncome = () => {
  initIncome();
};
const initIncome = () => {
  incomeNum = 0;
  $(".section_03 .profit i").eq(0).text("0");
  $(".section_03 .profit i").eq(1).text("0");
  $(".section_03 .profit i").eq(2).text("0");
  $(".section_03 .profit i").eq(3).text("0");
  $(".section_03 .profit i").eq(4).text("0");
  $(".section_03 .profit i").eq(5).text("0");
  $(".section_03 .profit i").eq(6).text("0");
  $(".section_03 .profit i").eq(7).text("0");
};

const startIncome = () => {
  changeIncomeNum();
  incomeInterval = setInterval(changeIncomeNum, 1);
};
const changeIncomeNum = () => {
  incomeNum += Math.random() * 100000;
  let len = Math.ceil(incomeNum).toString().length;
  let numStr = Math.ceil(incomeNum).toString();
  for (let i = 0; i < 7 - len; i++) {
    numStr = "0" + numStr;
  }
  if (incomeNum > 10000000) {
    incomeNum = 10000000;
    numStr = "10000000";
    clearInterval(incomeInterval);
  }
  for (let i = 0; i < 8; i++) {
    $(".section_03 .profit i")
      .eq(i)
      .text(numStr.substring(i, i + 1));
  }
};
//------------ MonthIncome script E ---------------------
//------------ MonthIncome2 script S ---------------------

const uiMonthIncome2 = () => {
  initIncome2();
};
const initIncome2 = () => {
  incomeNum2 = 0;
  $(".section_11 .profit i").eq(0).text("0");
  $(".section_11 .profit i").eq(1).text("0");
  $(".section_11 .profit i").eq(2).text("0");
  $(".section_11 .profit i").eq(3).text("0");
  $(".section_11 .profit i").eq(4).text("0");
  $(".section_11 .profit i").eq(5).text("0");
  $(".section_11 .profit i").eq(6).text("0");
  $(".section_11 .profit i").eq(7).text("0");
};

const startIncome2 = () => {
  changeIncomeNum2();
  incomeInterval2 = setInterval(changeIncomeNum2, 1);
};
const changeIncomeNum2 = () => {
  incomeNum2 += Math.random() * 100000;
  let len = Math.ceil(incomeNum2).toString().length;
  let numStr = Math.ceil(incomeNum2).toString();
  for (let i = 0; i < 7 - len; i++) {
    numStr = "0" + numStr;
  }
  if (incomeNum2 > 10000000) {
    incomeNum2 = 10000000;
    numStr = "10000000";
    clearInterval(incomeInterval2);
  }
  for (let i = 0; i < 8; i++) {
    $(".section_11 .profit i")
      .eq(i)
      .text(numStr.substring(i, i + 1));
  }
};
//------------ MonthIncome script E ---------------------
//------------ uiMonthPartnerWay script S ---------------------

const uiMonthPartnerWay = () => {
  initPartnerWay();
};
const initPartnerWay = () => {
  TweenMax.to($(".section_04 .imgBox .img_01"), 0, {
    y: 100,
    alpha: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_02"), 0, {
    scale: 1.2,
    alpha: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_03"), 0, {
    x: -100,
    alpha: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_04"), 0, {
    scale: 1.2,
    alpha: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_05"), 0, {
    x: 100,
    alpha: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_06"), 0, {
    alpha: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_07"), 0, {
    alpha: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_08"), 0, {
    alpha: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_09"), 0, {
    alpha: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_10"), 0, {
    scale: 1.5,
    alpha: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_11"), 0, {
    scale: 1.5,
    alpha: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_12"), 0, {
    scale: 1.5,
    alpha: 0,
    ease: Cubic.easeOut,
  });
};
const startPartnerWay = () => {
  TweenMax.to($(".section_04 .imgBox .img_01"), 0.5, {
    delay: 0.3,
    y: 0,
    alpha: 1,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_08"), 0.7, {
    delay: 0.6,
    alpha: 1,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_09"), 0.7, {
    delay: 0.6,
    alpha: 1,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_02"), 0.5, {
    delay: 0.8,
    scale: 1,
    alpha: 1,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_03"), 0.5, {
    delay: 0.7,
    x: 0,
    alpha: 1,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_04"), 0.5, {
    delay: 1.1,
    scale: 1,
    alpha: 1,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_05"), 0.5, {
    delay: 1,
    x: 0,
    alpha: 1,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_06"), 0.5, {
    delay: 1.3,
    scale: 1,
    alpha: 1,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_06"), 0.3, {
    delay: 2,
    y: 10,
    scale: 1.2,
    alpha: 1,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_06"), 0.5, {
    delay: 2.3,
    y: 0,
    scale: 1,
    alpha: 1,
    ease: Cubic.easeOut,
    repeat: 2,
    yoyo: true,
  });
  TweenMax.to($(".section_04 .imgBox .img_07"), 0.5, {
    delay: 1.4,
    scale: 1,
    alpha: 1,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_10"), 0.5, {
    delay: 1.6,
    scale: 1,
    alpha: 1,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_11"), 0.5, {
    delay: 1.6,
    scale: 1,
    alpha: 1,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_04 .imgBox .img_12"), 0.5, {
    delay: 1.8,
    scale: 1,
    alpha: 1,
    ease: Cubic.easeOut,
  });
};

//------------ uiMonthPartnerWay script E ---------------------

//------------ uiTop3 script S ---------------------
const uiTop3 = () => {
  initTop3();
};
const initTop3 = () => {
  TweenMax.to($(".section_05 .graph li").eq(0).find("i"), 0, {
    width: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_05 .graph li").eq(1).find("i"), 0, {
    width: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_05 .graph li").eq(2).find("i"), 0, {
    width: 0,
    ease: Cubic.easeOut,
  });
};
const startTop3 = () => {
  TweenMax.to($(".section_05 .graph li").eq(0).find("i"), 0.9, {
    delay: 0.3,
    width: "70%",
    ease: Back.easeOut,
  });
  TweenMax.to($(".section_05 .graph li").eq(1).find("i"), 0.9, {
    delay: 0.3,
    width: "60%",
    ease: Back.easeOut,
  });
  TweenMax.to($(".section_05 .graph li").eq(2).find("i"), 0.9, {
    delay: 0.3,
    width: "50%",
    ease: Back.easeOut,
  });
};
//------------ uiTop3 script E ---------------------

//------------ uiMovie script S ---------------------
const uiMovie = () => {
  initMovie();
};
const initMovie = () => {
  resultStrong.kill();
  TweenMax.to($(".section_06 .title strong").eq(1), 0, {
    alpha: 1,
    ease: Cubic.easeOut,
  });
};
const startMovie = () => {
  TweenMax.to($(".section_06 .title strong").eq(1), 0.4, {
    alpha: 0,
    ease: Cubic.easeOut,
    repeat: 5,
    yoyo: true,
  });
};
//------------ uiTop3 script E ---------------------

//------------ uiProposerInfo script S ---------------------
const uiProposerInfo = () => {
  initProposerInfo();
};
const initProposerInfo = () => {
  TweenMax.to($(".section_09 .proposerInfo"), 0, {
    scale: 0.5,
    alpha: 0,
    ease: Cubic.easeOut,
  });
};
const startProposerInfo = () => {
  TweenMax.to($(".section_09 .proposerInfo"), 0.7, {
    delay: 0.2,
    scale: 1,
    alpha: 1,
    ease: Back.easeOut,
  });
  TweenMax.to($(".section_09 .proposerInfo"), 0.3, {
    delay: 0.9,
    alpha: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_09 .proposerInfo"), 0.5, {
    delay: 1.2,
    alpha: 1,
    ease: Cubic.easeOut,
    repeat: 2,
    yoyo: true,
  });
};
//------------ uiProposerInfo script E ---------------------
const cuponPopupCloseHandler = () => {
  closeBottomSheet("sheet-coupon-info");
  //openBottomSheet('sheet-coupon-info');
  //$("#sheet-coupon-info").css("display","none");
};
const uiScrollBox = () => {
  setTimeout(scrollBoxStart, 500);
};
const scrollBoxStart = () => {
  TweenMax.to($(".section_02 .scrollBox .item i").eq(0), 0, {
    scale: 0.5,
    y: -10,
    alpha: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_02 .scrollBox .item i").eq(1), 0, {
    scale: 0.5,
    y: -10,
    alpha: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_02 .scrollBox .item i").eq(2), 0, {
    scale: 0.5,
    y: -10,
    alpha: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_02 .scrollBox .item i").eq(3), 0, {
    scale: 0.5,
    y: -10,
    alpha: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_02 .scrollBox .item span"), 0, {
    scale: 0.5,
    alpha: 0,
    ease: Cubic.easeOut,
  });

  TweenMax.to($(".section_10 .scrollBox .item i").eq(0), 0, {
    scale: 0.5,
    y: -10,
    alpha: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_10 .scrollBox .item i").eq(1), 0, {
    scale: 0.5,
    y: -10,
    alpha: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_10 .scrollBox .item i").eq(2), 0, {
    scale: 0.5,
    y: -10,
    alpha: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_10 .scrollBox .item i").eq(3), 0, {
    scale: 0.5,
    y: -10,
    alpha: 0,
    ease: Cubic.easeOut,
  });
  TweenMax.to($(".section_10 .scrollBox .item span"), 0, {
    scale: 0.5,
    alpha: 0,
    ease: Cubic.easeOut,
  });

  TweenMax.to($(".section_02 .scrollBox .item i").eq(0), 0.3, {
    delay: 0.1,
    y: 0,
    scale: 1,
    alpha: 1,
    ease: Back.easeOut,
  });
  TweenMax.to($(".section_02 .scrollBox .item i").eq(1), 0.3, {
    delay: 0.2,
    y: 0,
    scale: 1,
    alpha: 1,
    ease: Back.easeOut,
  });
  TweenMax.to($(".section_02 .scrollBox .item i").eq(2), 0.3, {
    delay: 0.3,
    y: 0,
    scale: 1,
    alpha: 1,
    ease: Back.easeOut,
  });
  TweenMax.to($(".section_02 .scrollBox .item i").eq(3), 0.3, {
    delay: 0.4,
    y: 0,
    scale: 1,
    alpha: 1,
    ease: Back.easeOut,
  });
  TweenMax.to($(".section_02 .scrollBox .item span"), 0.5, {
    delay: 0.5,
    scale: 1,
    alpha: 1,
    ease: Back.easeOut,
  });

  TweenMax.to($(".section_02 .scrollBox .item i").eq(0), 0.3, {
    delay: 0.8,
    y: 30,
    scale: 0,
    alpha: 0,
    ease: Back.easeIn,
  });
  TweenMax.to($(".section_02 .scrollBox .item i").eq(1), 0.3, {
    delay: 0.9,
    y: 30,
    scale: 0,
    alpha: 0,
    ease: Back.easeIn,
  });
  TweenMax.to($(".section_02 .scrollBox .item i").eq(2), 0.3, {
    delay: 1,
    y: 30,
    scale: 0,
    alpha: 0,
    ease: Back.easeIn,
  });
  TweenMax.to($(".section_02 .scrollBox .item i").eq(3), 0.3, {
    delay: 1.1,
    y: 30,
    scale: 0,
    alpha: 0,
    ease: Back.easeIn,
  });
  TweenMax.to($(".section_02 .scrollBox .item span"), 0.5, {
    delay: 1.2,
    scale: 0,
    alpha: 0,
    ease: Back.easeIn,
  });

  TweenMax.to($(".section_10 .scrollBox .item i").eq(0), 0.3, {
    delay: 0.1,
    y: 0,
    scale: 1,
    alpha: 1,
    ease: Back.easeOut,
  });
  TweenMax.to($(".section_10 .scrollBox .item i").eq(1), 0.3, {
    delay: 0.2,
    y: 0,
    scale: 1,
    alpha: 1,
    ease: Back.easeOut,
  });
  TweenMax.to($(".section_10 .scrollBox .item i").eq(2), 0.3, {
    delay: 0.3,
    y: 0,
    scale: 1,
    alpha: 1,
    ease: Back.easeOut,
  });
  TweenMax.to($(".section_10 .scrollBox .item i").eq(3), 0.3, {
    delay: 0.4,
    y: 0,
    scale: 1,
    alpha: 1,
    ease: Back.easeOut,
  });
  TweenMax.to($(".section_10 .scrollBox .item span"), 0.5, {
    delay: 0.5,
    scale: 1,
    alpha: 1,
    ease: Back.easeOut,
  });

  TweenMax.to($(".section_10 .scrollBox .item i").eq(0), 0.3, {
    delay: 0.8,
    y: 30,
    scale: 0,
    alpha: 0,
    ease: Back.easeIn,
  });
  TweenMax.to($(".section_10 .scrollBox .item i").eq(1), 0.3, {
    delay: 0.9,
    y: 30,
    scale: 0,
    alpha: 0,
    ease: Back.easeIn,
  });
  TweenMax.to($(".section_10 .scrollBox .item i").eq(2), 0.3, {
    delay: 1,
    y: 30,
    scale: 0,
    alpha: 0,
    ease: Back.easeIn,
  });
  TweenMax.to($(".section_10 .scrollBox .item i").eq(3), 0.3, {
    delay: 1.1,
    y: 30,
    scale: 0,
    alpha: 0,
    ease: Back.easeIn,
  });
  TweenMax.to($(".section_10 .scrollBox .item span"), 0.5, {
    delay: 1.2,
    scale: 0,
    alpha: 0,
    ease: Back.easeIn,
  });
  setTimeout(scrollBoxStart, 2000);
};
//------------ ScrollEvent script S ---------------------
function scrollEventListener() {
  if (viewMode) {
    $(".fixed-btn_02").css("position", "fixed");
    $(".fixed-btn_02").css("top", "unset");
    $(".fixed-btn_02").css("bottom", "2%");
  } else {
    //if($(window).scrollTop()+$(window).height()>1080){
    $(".fixed-btn_02").css("position", "fixed");
    $(".fixed-btn_02").css("top", "unset");
    $(".fixed-btn_02").css("bottom", "2%");
    /*}else{
			$(".fixed-btn_02").css("position","absolute");
			$(".fixed-btn_02").css("top","920px");
			$(".fixed-btn_02").css("bottom","unset");
		}*/
  }
  if (
    $(window).scrollTop() + $(window).height() >
    $(".section_03 .profit").offset().top
  ) {
    if (!incomeMotion) {
      incomeMotion = true;
      initIncome();
      startIncome();
    }
  }
  if (
    $(window).scrollTop() + $(window).height() <
    $(".section_03").offset().top
  ) {
    if (incomeMotion) {
      incomeMotion = false;
      initIncome();
    }
  }
  if (
    $(window).scrollTop() + $(window).height() >
    $(".section_04 .imgBox").offset().top
  ) {
    if (!partnerWayMotion) {
      partnerWayMotion = true;
      initPartnerWay();
      startPartnerWay();
    }
  }
  if (
    $(window).scrollTop() + $(window).height() <
    $(".section_04").offset().top
  ) {
    if (partnerWayMotion) {
      partnerWayMotion = false;
      initPartnerWay();
    }
  }
  if ($(window).scrollTop() > $(".section_06 .qna").offset().top) {
    if (location.pathname === "/11B_v3/") return;
    if (location.pathname === "/11B/") return;
    if (location.pathname === "/11B-SD/") return;
    if (location.pathname === "/11C/") return;
    if (!notiPopup) {
      notiPopup = true;
      openBottomSheet("sheet-coupon-info");
    }
  }
  if (
    $(window).scrollTop() + $(window).height() >
    $(".section_05 .graph").offset().top
  ) {
    if (!top3Motion) {
      top3Motion = true;
      initTop3();
      startTop3();
    }
  }
  if (
    $(window).scrollTop() + $(window).height() <
    $(".section_05 .title_02").offset().top
  ) {
    if (top3Motion) {
      top3Motion = false;
      initTop3();
    }
  }

  if (
    $(window).scrollTop() + $(window).height() >
    $(".section_06 .title").offset().top
  ) {
    if (!movieMotion) {
      movieMotion = true;
      initMovie();
      startMovie();
    }
  }
  if (
    $(window).scrollTop() + $(window).height() <
    $(".section_06").offset().top
  ) {
    if (movieMotion) {
      movieMotion = false;
      initMovie();
    }
  }
  if (
    $(window).scrollTop() + $(window).height() >
    $(".section_09 .proposerInfo").offset().top
  ) {
    if (!proposerInfoMotion) {
      proposerInfoMotion = true;
      initProposerInfo();
      startProposerInfo();
    }
  }
  if (
    $(window).scrollTop() + $(window).height() <
    $(".section_09").offset().top
  ) {
    if (proposerInfoMotion) {
      proposerInfoMotion = false;
      initProposerInfo();
    }
  }
  if (
    $(window).scrollTop() + $(window).height() >
    $(".section_11 .profit").offset().top
  ) {
    if (!income2Motion) {
      income2Motion = true;
      initIncome2();
      startIncome2();
    }
  }
  if (
    $(window).scrollTop() + $(window).height() <
    $(".section_11").offset().top
  ) {
    if (income2Motion) {
      income2Motion = false;
      initIncome2();
    }
  }
}
//------------ ScrollEvent script E ---------------------

//------------ resizeEvent script S ---------------------
const resizeEventListener = () => {
  if ($(window).width() < 768) {
    viewMode = true;
  } else {
    viewMode = false;
  }
  scrollEventListener();

  if ($(window).width() < 400) {
    const _sc = $(window).width() / 400;
    TweenMax.to($(".section_04 .imgBox"), 0, { scale: _sc, ease: Back.easeIn });
    const _lc = 350 - $(".section_04 .imgBox").width() * _sc;
    $(".section_04 .imgBox").css("margin-left", (_lc / 2) * -1);
  } else {
    TweenMax.to($(".section_04 .imgBox"), 0, { scale: 1, ease: Back.easeIn });
    $(".section_04 .imgBox").css("margin", "0 auto");
  }
};
//------------ resizeEvent script E ---------------------
