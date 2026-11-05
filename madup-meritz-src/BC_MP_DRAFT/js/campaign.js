/**
 * BC_MP_DRAFT 캠페인 전용 스크립트
 * - 공통 스크립트(/assets, /main)는 수정하지 않는다. 접수는 공통 main.js의 save()가 그대로 처리한다.
 * - 이 캠페인은 단계형 폼(2603FA.js) 대신 "한 페이지 설문형 폼 + 개인정보 동의 팝업"을 쓴다.
 *   그래서 2603FA.js는 불러오지 않고, 지역 데이터(area)만 이 파일로 옮겨 왔다.
 *
 * save()가 읽는 값 (index.html에 그대로 둠)
 *   #user_sido #user_gugun (select) · #job_div_cd · #payment · #cns_req_hr_div_cd (select)
 *   #user_name · #user_call · #c_terms · #c_survey_privacy · #orgCd · #is_saved
 *
 * 1) 설문 드롭다운 → 위 숨김 값 채우기 (+ 연령 안내: 2603FA.js와 같은 문구)
 * 2) 신청 버튼 → 입력 확인 → 개인정보 동의 팝업 → 확인 시 save()
 * 3) 동의 없이 팝업을 닫으면 이탈 방지 팝업 1회 (공통 form.js의 showblockerModal)
 * 4) 연출: 금액 슬롯머신 · 후기 롤링 · 하단 고정 버튼 숨김
 */

/* 지역 데이터: BC261028/js/2603FA.js 의 area 그대로 */
const area = {
  서울: [
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
    "동작구",
    "마포구",
    "서대문구",
    "서초구",
    "성동구",
    "성북구",
    "송파구",
    "양천구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ],
  경기: [
    "수원시",
    "성남시",
    "의정부시",
    "안양시",
    "부천시",
    "광명시",
    "평택시",
    "동두천시",
    "안산시",
    "고양시",
    "과천시",
    "구리시",
    "남양주시",
    "오산시",
    "시흥시",
    "군포시",
    "의왕시",
    "하남시",
    "용인시",
    "파주시",
    "이천시",
    "안성시",
    "김포시",
    "화성시",
    "광주시",
    "양주시",
    "포천시",
    "여주시",
    "연천군",
    "가평군",
    "양평군",
  ],
  인천: [
    "계양구",
    "미추홀구",
    "남동구",
    "동구",
    "부평구",
    "서구",
    "연수구",
    "중구",
    "강화군",
    "옹진군",
  ],
  강원: [
    "춘천시",
    "원주시",
    "강릉시",
    "동해시",
    "태백시",
    "속초시",
    "삼척시",
    "홍천군",
    "횡성군",
    "영월군",
    "평창군",
    "정선군",
    "철원군",
    "화천군",
    "양구군",
    "인제군",
    "고성군",
    "양양군",
  ],
  충북: [
    "청주시",
    "충주시",
    "제천시",
    "보은군",
    "옥천군",
    "영동군",
    "증평군",
    "진천군",
    "괴산군",
    "음성군",
    "단양군",
  ],
  충남: [
    "천안시",
    "공주시",
    "보령시",
    "아산시",
    "서산시",
    "논산시",
    "계룡시",
    "당진시",
    "금산군",
    "부여군",
    "서천군",
    "청양군",
    "홍성군",
    "예산군",
    "태안군",
  ],
  대전: ["대덕구", "동구", "서구", "유성구", "중구"],
  세종특별자치시: ["세종특별자치시"],
  전북: [
    "전주시",
    "군산시",
    "익산시",
    "정읍시",
    "남원시",
    "김제시",
    "완주군",
    "진안군",
    "무주군",
    "장수군",
    "임실군",
    "순창군",
    "고창군",
    "부안군",
  ],
  전남: [
    "목포시",
    "여수시",
    "순천시",
    "나주시",
    "광양시",
    "담양군",
    "곡성군",
    "구례군",
    "고흥군",
    "보성군",
    "화순군",
    "장흥군",
    "강진군",
    "해남군",
    "영암군",
    "무안군",
    "함평군",
    "영광군",
    "장성군",
    "완도군",
    "진도군",
    "신안군",
  ],
  광주: ["광산구", "남구", "동구", "북구", "서구"],
  경북: [
    "포항시",
    "경주시",
    "김천시",
    "안동시",
    "구미시",
    "영주시",
    "영천시",
    "상주시",
    "문경시",
    "경산시",
    "군위군",
    "의성군",
    "청송군",
    "영양군",
    "영덕군",
    "청도군",
    "고령군",
    "성주군",
    "칠곡군",
    "예천군",
    "봉화군",
    "울진군",
    "울릉군",
  ],
  경남: [
    "창원시",
    "진주시",
    "통영시",
    "사천시",
    "김해시",
    "밀양시",
    "거제시",
    "양산시",
    "의령군",
    "함안군",
    "창녕군",
    "고성군",
    "남해군",
    "하동군",
    "산청군",
    "함양군",
    "거창군",
    "합천군",
  ],
  부산: [
    "강서구",
    "금정구",
    "남구",
    "동구",
    "동래구",
    "부산진구",
    "북구",
    "사상구",
    "사하구",
    "서구",
    "수영구",
    "연제구",
    "영도구",
    "중구",
    "해운대구",
    "기장군",
  ],
  대구: ["남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군"],
  울산: ["남구", "동구", "북구", "중구", "울주군"],
  제주특별자치도: ["서귀포시", "제주시"],
};

/* 공통 레이어 알림(openLayerAlert) 안의 "확인했습니다" 버튼이 부르는 함수 (2603FA.js에 있던 것과 같은 이름) */
function confirmAlert() {
  closeLayerAlert();
}

(function () {
  "use strict";

  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $id = function (id) {
    return document.getElementById(id);
  };

  /* ======================================================
   * 1) 설문 드롭다운
   * ====================================================== */
  var sido = $id("user_sido");
  var gugun = $id("user_gugun");
  var job = $id("job_div_cd");
  var age = $id("payment");
  var time = $id("cns_req_hr_div_cd");

  Object.keys(area).forEach(function (name) {
    sido.add(new Option(name, name));
  });

  function setGugunOptions(region) {
    gugun.length = 1; // "시/구/군" 안내 옵션만 남기고 비움
    (area[region] || []).forEach(function (city) {
      gugun.add(new Option(city, city));
    });
  }

  var boxes = [].slice.call(document.querySelectorAll(".selectBox"));

  function closeAll(except) {
    boxes.forEach(function (box) {
      if (box === except) return;
      box.classList.remove("isOpen");
      box.querySelector(".selectBox-btn").setAttribute("aria-expanded", "false");
    });
  }

  function setLabel(box, text) {
    box.querySelector(".selectBox-val").textContent = text;
    box.classList.add("isChosen");
  }

  function clearBox(box) {
    var btn = box.querySelector(".selectBox-btn");
    box.querySelector(".selectBox-val").textContent = btn.getAttribute("data-placeholder");
    box.classList.remove("isChosen");
    [].forEach.call(box.querySelectorAll("[aria-selected='true']"), function (el) {
      el.setAttribute("aria-selected", "false");
    });
  }

  /* 지역: 시·도 → 시·군·구 두 단계 */
  function renderRegion(box, region) {
    var panel = box.querySelector(".selectBox-panel");
    var html = "";
    if (!region) {
      Object.keys(area).forEach(function (name) {
        html += '<li><button type="button" data-sido="' + name + '">' + name + "</button></li>";
      });
    } else {
      html += '<li class="selectBox-back"><button type="button" data-back="1">‹ ' + region + "</button></li>";
      area[region].forEach(function (city) {
        html += '<li><button type="button" data-gugun="' + city + '">' + city + "</button></li>";
      });
    }
    panel.innerHTML = html;
    panel.classList.toggle("isGrid", !region);
  }

  var ageMessages = {
    minor:
      '⚠️ 미성년자는 <span style="color: blue;font-weight: bold;">법령상 활동이 불가능</span>하여<br/>신청할 수 없습니다.',
    under25:
      '메리츠 파트너스는  <span style="color: red; font-weight: bold">25세 이상</span> 부터 <br>신청하실 수 있습니다.<button onclick="confirmAlert()" class="btn nextBtn backgroundMain">확인했습니다</button>',
    over60Block:
      '메리츠 파트너스는 <span style="color: red; font-weight: bold">60세 이하</span> 고객님만<br/> 신청 하실 수 있습니다.',
    over60:
      '<div><span style="color: blue;font-weight: bold; font-size: 14px;">⚠️ 60대 이상 고객님께 중요 안내드립니다.</span><br>' +
      '<p style="font-size: 14px">스마트폰으로 <span style="font-weight: bold">강의 수강과 시험 합격이 필수</span>입니다.<br/>위 절차 수행이 어려울 경우, 활동이 불가능합니다.</p>' +
      '<button onclick="confirmAlert()" class="btn nextBtn backgroundMain">확인했습니다</button></div>',
  };

  /* 연령 선택 시 안내 (2603FA.js ageCheck1과 같은 기준). false를 돌려주면 선택을 취소한다 */
  function checkAge(value) {
    var params = new URL(location.href).searchParams;
    var isMaxAge = value === "06" || value === "07";
    if (isMaxAge && checkAdvtMdiaDivVal(params.get("advtMdiaDivVal"), params.get("advtMdiaTpDivVal"))) {
      openLayerAlert(ageMessages.over60Block);
      return false;
    }
    if (isMaxAge) openLayerAlert(ageMessages.over60);
    if (value === "01") {
      openLayerAlert(ageMessages.minor);
      return false;
    }
    if (value === "02") openLayerAlert(ageMessages.under25);
    return true;
  }

  boxes.forEach(function (box) {
    var type = box.getAttribute("data-type");
    var btn = box.querySelector(".selectBox-btn");
    var panel = box.querySelector(".selectBox-panel");

    btn.setAttribute("data-placeholder", box.querySelector(".selectBox-val").textContent);
    if (type === "region") renderRegion(box, "");

    btn.addEventListener("click", function () {
      var willOpen = !box.classList.contains("isOpen");
      closeAll(box);
      box.classList.toggle("isOpen", willOpen);
      btn.setAttribute("aria-expanded", String(willOpen));
      if (willOpen && type === "region") renderRegion(box, gugun.value ? "" : sido.value);
    });

    panel.addEventListener("click", function (e) {
      var item = e.target.closest("button");
      if (!item) return;

      if (type === "region") {
        if (item.hasAttribute("data-back")) return renderRegion(box, "");
        if (item.hasAttribute("data-sido")) {
          sido.value = item.getAttribute("data-sido");
          setGugunOptions(sido.value);
          gugun.value = "";
          return renderRegion(box, sido.value);
        }
        gugun.value = item.getAttribute("data-gugun");
        setLabel(box, sido.value + " " + gugun.value);
        closeAll();
        return;
      }

      var value = item.getAttribute("data-value");
      if (type === "age" && !checkAge(value)) {
        age.value = "";
        clearBox(box);
        closeAll();
        return;
      }
      if (type === "job") job.value = value;
      if (type === "age") age.value = value;
      if (type === "time") time.value = value;
      [].forEach.call(panel.querySelectorAll("button"), function (b) {
        b.setAttribute("aria-selected", String(b === item));
      });
      var icon = item.querySelector(".icon");
      setLabel(
        box,
        icon ? icon.textContent + " " + item.textContent.replace(icon.textContent, "").trim() : item.textContent.trim()
      );
      closeAll();
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".selectBox")) closeAll();
  });

  /* 연락처: 숫자만 (공통 규칙: '-' 없이 11자리) */
  $id("user_call").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "").slice(0, 11);
  });

  /* ======================================================
   * 2) 신청 → 입력 확인 → 개인정보 동의 팝업 → save()
   * ====================================================== */
  var consent = $id("consentModal");
  var cAll = $id("c_agree");
  var cTerms = $id("c_terms");
  var cUse = $id("c_marketing_use");
  var cAd = $id("c_marketing_ad");
  var cSurvey = $id("c_survey_privacy");
  var okBtn = $id("consentOk");

  function openConsent() {
    consent.style.display = "flex";
    document.body.classList.add("scroll-lock");
  }
  function closeConsent() {
    consent.style.display = "none";
    document.body.classList.remove("scroll-lock");
  }

  function syncConsent() {
    // 공통 save()는 #c_survey_privacy 하나로 마케팅 동의를 읽는다.
    // BC261028처럼 "활용 동의"와 "광고성 정보 수신"을 모두 동의했을 때만 체크.
    cSurvey.checked = cUse.checked && cAd.checked;
    cAll.checked = cTerms.checked && cUse.checked && cAd.checked;
    okBtn.disabled = !cTerms.checked;
  }
  cAll.addEventListener("change", function () {
    cTerms.checked = cUse.checked = cAd.checked = cAll.checked;
    syncConsent();
  });
  [cTerms, cUse, cAd].forEach(function (c) {
    c.addEventListener("change", syncConsent);
  });

  /* 입력 확인: 2603FA.js와 같은 순서·문구, 이름·연락처는 공통 함수로 확인 */
  function validate() {
    var name = $id("user_name").value.trim();
    var phone = $id("user_call").value.replace(/[^0-9]/g, "");
    var nameMessage;
    if (!sido.value || !gugun.value) return "거주 지역을 선택해주세요";
    if (!job.value) return "직업을 선택해주세요";
    if (!age.value) return "연령대를 선택해주세요";
    if (!time.value) return "상담 가능 시간을 알려주세요";
    if (isEmpty(name)) return "한글 이름을 정확하게 입력해 주세요.";
    if (!isCleanWords(name)) return "이름에 부적절한 단어가 포함되어 있습니다.<br>다시 입력해 주세요.";
    nameMessage = isVaildName(name);
    if (nameMessage) return nameMessage;
    if (checkEachCharacterKoreanInput(name)) return "입력하신 성함을 다시 한 번 확인 해주세요.";
    if (
      !["010", "011"].includes(phone.substring(0, 3)) ||
      phone.length !== 11 ||
      blockedNumbers.includes(phone.slice(3)) ||
      blockedaLists.includes(phone)
    ) {
      return "휴대전화 번호를 정확하게 입력해 주세요.";
    }
    return "";
  }

  $id("sendButton").addEventListener("click", function () {
    var message = validate();
    if (message) return openLayerAlert(message);
    openConsent();
  });

  okBtn.addEventListener("click", function () {
    if (!cTerms.checked) return;
    closeConsent();
    Promise.resolve(save()).then(function () {
      // 접수가 끝나면 공통 init_value()가 값을 비우므로, 드롭다운 표시도 처음으로 되돌림
      if (!$id("user_name").value) {
        boxes.forEach(clearBox);
        gugun.length = 1;
        cUse.checked = cAd.checked = false;
        syncConsent();
      }
    });
  });

  /* ======================================================
   * 3) 이탈 방지 팝업: 동의 없이 동의 팝업을 닫을 때 한 번
   * ====================================================== */
  var blocker = document.querySelector(".blockerModal");
  var blockerShown = false;
  var month = blocker.querySelector(".month");
  if (month) month.textContent = new Date().getMonth() + 1;

  $id("consentClose").addEventListener("click", function () {
    closeConsent();
    if (!blockerShown) {
      blockerShown = true;
      showblockerModal(true);
    }
  });
  blocker.querySelector(".backBtn").addEventListener("click", function () {
    showblockerModal();
    openConsent();
  });
  [blocker.querySelector(".leaveBtn"), blocker.querySelector(".closeBtn")].forEach(function (b) {
    b.addEventListener("click", function () {
      showblockerModal();
    });
  });

  /* ======================================================
   * 4) 연출
   * ====================================================== */

  /* 금액 슬롯머신: 자리마다 숫자 릴이 돌다가 왼쪽부터 멈춤, 보이는 동안 반복 */
  function initSlot(el) {
    var value = el.getAttribute("data-slot");
    var ROW = 1.2; // em, CSS .slotReel 높이와 같아야 함
    var LAPS = 30;
    var reels = [];
    el.setAttribute("role", "img");
    el.setAttribute("aria-label", value);
    el.textContent = "";
    value.split("").forEach(function (ch) {
      if (!/\d/.test(ch)) {
        var sep = document.createElement("span");
        sep.className = "slotSep";
        sep.setAttribute("aria-hidden", "true");
        sep.textContent = ch;
        el.appendChild(sep);
        return;
      }
      var reel = document.createElement("span");
      var strip = document.createElement("span");
      var html = "";
      for (var k = 0; k < LAPS + 10; k++) html += "<i>" + (k % 10) + "</i>";
      reel.className = "slotReel";
      reel.setAttribute("aria-hidden", "true");
      strip.className = "slotReel-in";
      strip.innerHTML = html;
      strip.style.transform = "translateY(-" + +ch * ROW + "em)";
      strip.addEventListener("transitionend", function () {
        reel.classList.remove("isSpin");
      });
      reel.appendChild(strip);
      el.appendChild(reel);
      reels.push({ reel: reel, strip: strip, d: +ch });
    });
    function spin() {
      reels.forEach(function (r) {
        r.strip.style.transition = "none";
        r.strip.style.transform = "translateY(-" + r.d * ROW + "em)";
      });
      void el.offsetHeight;
      reels.forEach(function (r, i) {
        r.reel.classList.add("isSpin");
        r.strip.style.transition = "transform " + (1 + i * 0.2) + "s cubic-bezier(.12,.75,.2,1.04)";
        r.strip.style.transform = "translateY(-" + (LAPS + r.d) * ROW + "em)";
      });
    }
    var timer = null;
    new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          if (!timer) {
            setTimeout(spin, 300);
            timer = setInterval(spin, 5200);
          }
        } else {
          clearInterval(timer);
          timer = null;
        }
      },
      { threshold: 0.6 }
    ).observe(el);
  }
  if (!reduce && "IntersectionObserver" in window) {
    [].forEach.call(document.querySelectorAll("[data-slot]"), initSlot);
  }

  /* 후기 카드 롤링 */
  (function () {
    var list = $id("reviewRoll");
    if (!list || reduce) return;
    var cards = [].slice.call(list.children);
    cards.forEach(function (card) {
      var copy = card.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      list.appendChild(copy);
    });
    var index = 0;
    setInterval(function () {
      index += 1;
      list.style.transition = "transform .6s ease";
      list.style.transform = "translateY(-" + list.children[index].offsetTop + "px)";
      if (index === cards.length) {
        setTimeout(function () {
          list.style.transition = "none";
          list.style.transform = "translateY(0)";
          index = 0;
        }, 650);
      }
    }, 3200);
  })();

  /* 하단 고정 버튼(.btn3): 히어로 버튼이나 신청서가 보이는 동안은 숨김 */
  (function () {
    var sticky = document.querySelector(".btn3");
    var targets = [document.querySelector(".section01 .btn1"), $id("apply")];
    if (!sticky || !("IntersectionObserver" in window)) return;
    var visible = new Map();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        visible.set(en.target, en.isIntersecting);
      });
      sticky.classList.toggle("isHidden", targets.some(function (t) {
        return visible.get(t);
      }));
    });
    targets.forEach(function (t) {
      if (t) io.observe(t);
    });
  })();
})();
