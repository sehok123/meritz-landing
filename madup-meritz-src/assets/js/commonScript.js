/**
 * 특정 로직만 있는 스크립트 분리 후 common script로 변환 진행 해야함.
 */

$(document).ready(function () {
  // //모바일기기 화면 사이즈 확인
  // const innerWidth = window.innerWidth
  // const innerHeight = window.innerHeight
  // console.log(`${innerWidth} x ${innerHeight}` )
  // setTimeout(() =>
  // {alert(`${innerWidth} x ${innerHeight}`)}, 500)

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.charset = "UTF-8";
  script.src = "https://static.toss.im/lex/v1.js"; // 꺽쇠 괄호 제거!
  document.head.appendChild(script);

  const swiper_member = new Swiper(".section-visual .member-list", {
    slidesPerView: 1,
    spaceBetween: 15,
    direction: "vertical",
    loop: true,
    loopAdditionalSlides: 1,
    speed: 1000,
    autoplay: {
      delay: 800,
      disableOnInteraction: false,
    },
    // 슬라이드 이동 시 AOS 새로고침
    on: {
      slideChange: function () {
        AOS.refresh();
      },
    },
  });

  const swiper_member_smog = new Swiper(".section-visual-smog .member-list", {
    direction: "vertical",
    slidesPerView: 1.3, // 1보다 작으면 다음 슬라이드 일부 보임
    centeredSlides: false, // 중앙 정렬 비활성화 → 아래쪽에 노출됨
    spaceBetween: 2,
    loop: true,
    autoplay: {
      delay: 800,
      disableOnInteraction: false,
    },
    // 슬라이드 이동 시 AOS 새로고침
    on: {
      slideChange: function () {
        AOS.refresh();
      },
    },
  });

  const swiper_members = new Swiper(".section-calc .member-list", {
    slidesPerView: 1.8,
    spaceBetween: 12,
    // 슬라이드 이동 시 AOS 새로고침
    on: {
      slideChange: function () {
        AOS.refresh();
      },
    },
  });

  const swiper_review = new Swiper(".section-story .review", {
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
      },
    },
  });

  AOS.init(); // AOS 초기화 코드
  // scroll event
  $(window).scroll(function () {
    var scrollPosition = $(window).scrollTop();
    var visualHeight = $(".section-visual .visual-top").outerHeight();

    // if (scrollPosition > visualHeight) {
    //     $('.fixed-btn').addClass('floating');
    // } else {
    //     $('.fixed-btn').removeClass('floating');
    // }

    // if ($('.section-contact').hasClass('aos-animate')) {
    //     $('.fixed-btn').addClass('hide');
    // } else {
    //     $('.fixed-btn').removeClass('hide');
    // }

    $(".section-calc .chart-box li").each(function (index) {
      var $this = $(this);
      if (isElementInViewport($(this))) {
        setTimeout(function () {
          $this.addClass("active");
        }, index * 50);
      } else {
        setTimeout(function () {
          $this.removeClass("active");
        }, index * 50);
      }
    });
  });

  // 햄버거 메뉴 토글 이벤트 리스너
  $(".menu-toggle").click(function () {
    $(this).toggleClass("open");
    $("#menu").toggleClass("open");
  });

  // 링크 클릭 시 부드러운 스크롤
  $(".smooth-scroll").click(function (e) {
    e.preventDefault();
    var target = $(this).attr("href");
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top,
      },
      300
    );
    $(".header").addClass("light-bg");
    $(".menu-toggle").removeClass("open");
    $(".header .nav").removeClass("open");
  });

  // 탭 버튼에 대한 이벤트 리스너 추가
  $(".tab-list .tablinks").click(function () {
    var tabName = $(this).data("tab");
    var tabGroup = $(this).closest(".tab-list").data("tab-group");
    openTab(tabGroup, tabName);
  });
});

// 요소가 화면에 보이는지 여부를 확인하는 함수
function isElementInViewport(el) {
  var rect = el[0].getBoundingClientRect(); // 요소의 위치와 크기 정보 가져오기
  return (
    rect.top >= 0 && // 요소의 상단이 뷰포트 내에 있고
    rect.left >= 0 && // 요소의 왼쪽이 뷰포트 내에 있으며
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) && // 요소의 하단이 뷰포트 내에 있고
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) // 요소의 오른쪽이 뷰포트 내에 있으면
  );
}

// 탭을 열고 닫는 함수
function openTab(tabGroup, tabName) {
  $("#" + tabGroup + " .tab-content").removeClass("current");
  $("#" + tabName).addClass("current");
  $("#" + tabGroup + " .tablinks").removeClass("active");
  $("#" + tabGroup + ' button[data-tab="' + tabName + '"]').addClass("active");

  AOS.refresh();
}

// 바텀시트 열고 닫는 함수
function openBottomSheet(sheetName, type = "") {
  if (sheetName === "sheet-counsel" && type === "cta") {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({ event: "click_cta_button" });
  }
  $("body").css("overflow", "hidden");
  $("#" + sheetName).addClass("open");
  $("#" + sheetName + " .sheet-wrap").addClass("animate-up");
}

function closeBottomSheet(sheetName) {
  $("#" + sheetName + " .sheet-wrap")
    .removeClass("animate-up")
    .addClass("animate-down");
  setTimeout(function () {
    // 현재 열린 .bottom-sheet.open 요소가 있는지 확인
    $("body").css("overflow", "auto");
    $("#" + sheetName).removeClass("open");
    $("#" + sheetName + " .sheet-wrap").removeClass("animate-down");
  }, 300);
}

function closeAll() {
  $(".bottom-sheet").removeClass("animate-up").addClass("animate-down");
  setTimeout(function () {
    $("body").css("overflow", "auto");
    $(".bottom-sheet").removeClass("open");
    $(".bottom-sheet").removeClass("animate-down");
  }, 300);
  $(".back-button").removeClass("active");
}

$(".btn-step").click(function (e) {
  e.preventDefault();
  var parent = $(this).data("parent");
  var tg = $(this).data("tg");
  var amount = $(this).data("amount");

  if (amount) {
    let amount_txt = "";
    let contract_amount_txt = "";

    if (amount == "10만원미만") {
      amount_txt = "50~70";
    } else if (amount == "10~20만원") {
      amount_txt = "120~180";
    } else if (amount == "30만원이상") {
      amount_txt = "250~300";
    } else if (amount == "1시간미만") {
      amount_txt = "50~70";
      contract_amount_txt = "5~10";
    } else if (amount == "1~2시간이상") {
      amount_txt = "120~180";
      contract_amount_txt = "10~20";
    } else if (amount == "3시간이상") {
      amount_txt = "190~220";
      contract_amount_txt = "15~25";
    } else if (amount == "6시간이상") {
      amount_txt = "250~300";
      contract_amount_txt = "20~30";
    }
    $(".money-num").text(amount_txt);
    if (contract_amount_txt != "") {
      $("#contract_amount").text(contract_amount_txt);
    }
  }

  $("#" + parent)
    .hide()
    .removeClass("open");
  $("#" + tg)
    .show()
    .addClass("open");
  $(".back-button").addClass("active");
  let back_list = $(".back-button").data("back");
  back_list.push(parent);
  $(".back-button").data("back", back_list);
});

$(".close-button").click(function (e) {
  e.preventDefault();
  $("#sheet-calc .calc-step-wrap").hide().removeClass("open");
  $("#calc-main").css("display", "flex");
  $(".back-button").removeClass("active");
});

$(".back-button").click(function (e) {
  e.preventDefault();
  let back_list = $(".back-button").data("back");
  let back = back_list.pop();
  $(".back-button").data("back", back_list);

  if (back == "calc-main") {
    $(".back-button").removeClass("active");
  }

  $("#sheet-calc .open").hide().removeClass("open");
  $("#" + back)
    .show()
    .addClass("open");
});

$(".privacy-check input[name='terms_chk']").change(function () {
  const checked = $(this).val();
  if (checked == "true") {
    $("#c_terms").prop("checked", true);
    $("#sheet-agreement1 a").removeAttr("disabled");
  } else {
    $("#c_terms").prop("checked", false);
    $("#sheet-agreement1 a").attr("disabled", "disabled");
  }
});

$(".privacy-check input[name='counsel_chk']").change(function () {
  const checked = $(this).val();
  if (checked == "true") {
    $("#c_counsel").prop("checked", true);
    $("#sheet-agreement2 a").removeAttr("disabled");
  } else {
    $("#c_counsel").prop("checked", false);
    $("#sheet-agreement2 a").attr("disabled", "disabled");
  }
});
//설문조사 활용동의 체크
$(".privacy-check input[name='survey_privacy_chk']").change(function () {
  const checked = $(this).val();
  if (checked == "true") {
    $("#c_survey_privacy").prop("checked", true);
    // $('#sheet-agreement3 a').removeAttr("disabled")
  } else {
    $("#c_survey_privacy").prop("checked", false);
    // $('#sheet-agreement3 a').attr('disabled', 'disabled')
  }
});

$(document).on("click", "#c_agree", function () {
  if ($("#c_agree").is(":checked")) {
    $("input[name=agree_chk]").prop("checked", true);
    $("input:radio[name='terms_chk']:radio[value='true']").prop(
      "checked",
      true
    );
    $("input:radio[name='counsel_chk']:radio[value='true']").prop(
      "checked",
      true
    );
    $("input:radio[name='survey_privacy_chk']:radio[value='true']").prop(
      "checked",
      true
    );
    $("input:radio[name='stndHrexRciAg_chk']:radio[value='true']").prop(
      "checked",
      true
    );
    $("#sheet-agreement1 a").removeAttr("disabled");
    $("#sheet-agreement2 a").removeAttr("disabled");
  } else {
    $("input[name=agree_chk]").prop("checked", false);
    $("input:radio[name='terms_chk']:radio[value='false']").prop(
      "checked",
      true
    );
    $("input:radio[name='counsel_chk']:radio[value='false']").prop(
      "checked",
      true
    );
    $("input:radio[name='survey_privacy_chk']:radio[value='false']").prop(
      "checked",
      true
    );
    $("input:radio[name='stndHrexRciAg_chk']:radio[value='false']").prop(
      "checked",
      true
    );
    $("#sheet-agreement1 a").attr("disabled", "disabled");
    $("#sheet-agreement2 a").attr("disabled", "disabled");
  }
});

$(document).on("click", "input[name=agree_chk]", function () {
  const total = $("input[name=agree_chk]").length;
  const total_checked = $("input[name=agree_chk]:checked").length;
  const checked = $(this).is(":checked");
  const val = $(this).val();
  if (val === "terms") {
    if (checked) {
      $("input:radio[name='terms_chk']:radio[value='true']").prop(
        "checked",
        true
      );
      $("#sheet-agreement1 a").removeAttr("disabled");
    } else {
      $("input:radio[name='terms_chk']:radio[value='false']").prop(
        "checked",
        true
      );
      $("#sheet-agreement1 a").attr("disabled", "disabled");
    }
  } else if (val === "counsel") {
    if (checked) {
      $("input:radio[name='counsel_chk']:radio[value='true']").prop(
        "checked",
        true
      );
      $("#sheet-agreement2 a").removeAttr("disabled");
    } else {
      $("input:radio[name='counsel_chk']:radio[value='false']").prop(
        "checked",
        true
      );
      $("#sheet-agreement2 a").attr("disabled", "disabled");
    }
  } else if (val === "survey") {
    if (checked) {
      $("input:radio[name='survey_privacy_chk']:radio[value='true']").prop(
        "checked",
        true
      );
      // $('#sheet-agreement2 a').removeAttr("disabled")
    } else {
      $("input:radio[name='survey_privacy_chk']:radio[value='false']").prop(
        "checked",
        true
      );
      // $('#sheet-agreement2 a').attr('disabled', 'disabled')
    }
  } else if (val === "stndHrexRciAgrYn") {
    if (checked) {
      $("input:radio[name='stndHrexRciAg_chk']:radio[value='true']").prop(
        "checked",
        true
      );
    } else {
      $("input:radio[name='stndHrexRciAg_chk']:radio[value='false']").prop(
        "checked",
        true
      );
    }
  }

  if (total != total_checked) $("#c_agree").prop("checked", false);
  else $("#c_agree").prop("checked", true);
});

// display 상태 확인 함수
function isVisible(element) {
  return window.getComputedStyle(element).display !== "none";
}

const getFormattedLastDayOfMonth = (
  date = new Date(),
  format = "YYYY-MM-DD"
) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  // 이번 달 마지막 날짜 구하기
  const lastDay = new Date(year, month, 0).getDate();

  // 두 자리 숫자 보장
  const pad = (n) => n.toString().padStart(2, "0");

  // 포맷 치환
  const replacements = {
    YYYY: year,
    MM: pad(month),
    DD: pad(lastDay),
  };

  return format.replace(/YYYY|MM|DD/g, (match) => replacements[match]);
};
