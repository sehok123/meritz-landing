const rootHost = location.host;
const CURRENT_TIME_KEY = "currentTime";
const urlParams = new URLSearchParams(window.location.search);
const clickKey = urlParams.get("click_key");
const IS_DEVELOP = rootHost === "dev.meritzpartners.com";

if (rootHost === "localhost:8080" || rootHost === "127.0.0.1:8080") {
  API_URL = "http://localhost:8000";
} else if (rootHost === "d3pe848gj1yr9u.cloudfront.net") {
  API_URL = "https://mp-api-dev.madup.com";
} else if (rootHost === "d18zyg7q8c0orb.cloudfront.net") {
  API_URL = "https://mp-api.madup.com";
} else if (rootHost === "dev.meritzpartners.com") {
  API_URL = "https://dev-api.meritzpartners.com";
} else {
  API_URL = "https://api.meritzpartners.com";
}

function loadAxios() {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
  script.async = true;
  // script.onload = callback; // Axios가 로드된 후 실행할 콜백 함수
  document.head.appendChild(script);
}

loadAxios();

const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * 현재 시간 저장
 */
const saveCurrentTime = () => {
  // 현재 시간
  const currentTime = new Date().toISOString();
  // 쿠키에 저장
  setCookie(CURRENT_TIME_KEY, currentTime, 1); // 1일 동안 유효한 쿠키로 저장

  // sessionStorage에 저장
  sessionStorage.setItem(CURRENT_TIME_KEY, currentTime);

  // localStorage에 저장
  localStorage.setItem(CURRENT_TIME_KEY, currentTime);
};
/**
 * 저장된 시간을 순차적으로 확인 후 추출
 * 1. cookie(default)
 * 2. sessionStorage
 * 3. localStorage
 */
const getSavedCurrentTime = () => {
  // cookie에서 시간을 먼저 확인
  let savedTime = getCookie(CURRENT_TIME_KEY);

  // cookie에 없으면 sessinoStorage에서 확인
  if (!savedTime) {
    savedTime = sessionStorage.getItem(CURRENT_TIME_KEY);
  }

  // sessinoStorage에 없으면 localStorage에서 확인
  if (!savedTime) {
    savedTime = localStorage.getItem(CURRENT_TIME_KEY);
  }
  return savedTime;
};

const calculateTimeDifferenceInSeconds = (time1, time2) => {
  // 시간 문자열을 Date 객체로 변환
  const date1 = new Date(time1);
  const date2 = new Date(time2);

  // 두 시간의 차이를 밀리초 단위로 계산
  const differenceInMilliseconds = Math.abs(date2 - date1);

  // 밀리초를 초로 변환
  let differenceInSeconds = Math.round(differenceInMilliseconds / 1000);

  // 5자리가 넘는 경우 99999로 설정
  if (differenceInSeconds > 99999) {
    differenceInSeconds = 99999;
  }

  return differenceInSeconds;
};

const checkEachCharacterKoreanInput = (input) => {
  const characters = input.split("");
  let result = false;
  for (let i in characters) {
    const hangulConsonantOnlyRegex = /^[ㄱ-ㅎ]$/;
    const hangulVowelOnlyRegex = /^[ㅏ-ㅣ]$/;
    if (hangulConsonantOnlyRegex.test(characters[i])) {
      result = true;
    } else if (hangulVowelOnlyRegex.test(characters[i])) {
      result = true;
    }
  }
  return result;
};

const isEmpty = (value) => {
  if (
    value == "" ||
    value == "null" ||
    value == null ||
    value == undefined ||
    (value != null && typeof value == "object" && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};

const getUrlParams = () => {
  var params = {};

  window.location.search.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (str, key, value) {
      params[key] = value;
    },
  );

  return params;
};

const query_params = getUrlParams();

const setAgeText = () => {
  const ageText = document.getElementById("ageText");
  const marketingCheckbox = document.getElementById("c_survey_privacy"); //채용
  const aiCallCheckbox = document.getElementById("stndHrexRciAgrYn"); //업무시간외
  const checkInfoText = document.querySelector(".checkInfoText");
  const today = new Date();
  const currentHour = today.getHours();
  const isBusinessHour = currentHour >= 9 && currentHour < 21;

  const year = today.getFullYear(); // 2025 등
  const month = today.getMonth() + 1; // 0부터 시작하므로 +1
  const date = today.getDate(); // 일

  // 두 자리수로 맞추기 위해 padStart 사용
  const formattedMonth = String(month).padStart(2, "0");
  const formattedDate = String(date).padStart(2, "0");

  const result = `귀하는 ${year}년 ${formattedMonth}월 ${formattedDate}일, <b>메리츠 파트너스</b> `;
  const isMarketingAgreed = marketingCheckbox?.checked;
  const isAiCallAgreed = aiCallCheckbox?.checked;
  let ageTextMessage = "";

  if (isMarketingAgreed && isAiCallAgreed) {
    ageTextMessage = `${result}채용 마케팅 홍보 및 업무 시간 외 AI 안내전화에 대한<br/>광고성 정보 수신에 모두 동의하였으며, 처리 완료되었습니다.`;
  } else if (isMarketingAgreed && !isAiCallAgreed) {
    ageTextMessage = `${result}채용 마케팅 홍보에 대한 광고성 정보 수신에 동의하고,<br/>업무 시간 외 AI 안내전화에 대한 광고성 정보 수신은 거부하였으며, 처리 완료되었습니다.`;
  } else if (!isMarketingAgreed && isAiCallAgreed) {
    ageTextMessage = `${result}업무 시간 외 AI 안내전화에 대한 광고성 정보 수신에 동의하고,<br/>채용 마케팅 홍보에 대한 광고성 정보 수신은 거부하였으며, 처리 완료되었습니다.`;
  } else {
    ageTextMessage = `${result}채용 마케팅 홍보 및 업무 시간 외 AI 안내전화에 대한<br/>광고성 정보 수신은 거부하였으며, 처리 완료되었습니다.`;
  }

  if (ageText) {
    ageText.innerHTML = ageTextMessage;
  }
};

const init_value = () => {
  $("#user_name").val("");
  $("#user_call").val("");
  $("#user_sido").val("");
  $("#user_gugun").val("");
  $("#cns_req_hr_div_cd").val("");
  $("#c_terms").prop("checked", false);
  $("#c_counsel").prop("checked", false);
  $("#c_agree").prop("checked", false);
  $("#c_survey_privacy").prop("checked", false);
  $("#job_div_cd").val("");
  $("#payment").val("");
  $(".btn_submit").attr("disabled", "disabled");
  $("#sheet-agreement1 a").attr("disabled", "disabled");
  $("#sheet-agreement2 a").attr("disabled", "disabled");
  $("input:radio[name='terms_chk']:radio[value='false']").prop("checked", true);
  $("input:radio[name='counsel_chk']:radio[value='false']").prop(
    "checked",
    true,
  );
  $("#orgCd").val("");
};

function isWeekend() {
  const date = new Date();
  const day = date.getDay(); // 0 ~ 6
  return day === 0 || day === 6;
}

/**
 * 상담신청 정보를 저장하는 함수
 * @param {Object} data - 저장할 상담신청 정보
 * @returns {Promise<void>}
 */
const save_consultation_information = async (data) => {
  const sendBtn = document.getElementById("sendButton");
  //채용관련 안내 텍스트
  sendBtn.disabled = true;
  sendBtn.textContent = "전송중";

  try {
    const response = await fetch(`${API_URL}/meritz/consultation-information`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const text = await response.text();
    const result = text ? JSON.parse(text) : null;
    if (
      (response.status === 200 && result.errCd === "00001") ||
      response.status === 204
    ) {
      const eventId = crypto.randomUUID();
      const desired_time = document.querySelector(
        "#cns_req_hr_div_cd option:checked",
      ).textContent;
      sendBtn.disabled = false;
      sendBtn.textContent = "신청 완료";
      setAgeText();

      document.getElementById("is_saved").value = "Y";
      dataLayer.push({ event: "complete", event_id: eventId });
      document.getElementById("desired_time").textContent = desired_time;
      init_value();

      const target = document.querySelector("#text-success-info strong");
      if (isWeekend() && target) {
        target.innerHTML = `
          지금 <span>알림톡</span>을 확인해주세요!<br />
          <p class="infoDesc">상담사 주말 휴무로 인해<br/>
          <span>평일</span>에 연락드릴게요☎️</p>
        `;
      }

      if (window.successCallback) {
        return successCallback(desired_time);
      }
      openBottomSheet("sheet-success");

      if (window.IGATrackingConversion) {
        window.IGATrackingConversion();
      }

      await insert_dbdbdeep(data);
      //애디플
      await insert_adeeple();
    } else {
      const resData = await response.json();
      throw new Error(resData.detail);
    }
  } catch (error) {
    dataLayer.push({ event: "failure" });
    alert(error.message);
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "신청 완료";
  }
};
/**
 * 이름 입력 체크
 * @param inputName
 * @return {string}
 */
const isVaildName = (inputName) => {
  const testString = inputName.trim();
  const specialCharRegex = /[!@#$%^&*(),?":{}|<>]/;
  const hangulWithSpaceRegex = /[가-힣]\s/;
  const mixedHangulAndEnglishRegex = /([가-힣][a-zA-Z]|[a-zA-Z][가-힣])/;

  if (specialCharRegex.test(testString)) {
    return "성함에 특수문자가 포함되어 있습니다.\n다시 한 번 확인 해주세요.";
  } else if (hangulWithSpaceRegex.test(testString)) {
    return "한글 성함에 띄어쓰기가 포함되어 있습니다.\n다시 한 번 확인 해주세요.";
  } else if (mixedHangulAndEnglishRegex.test(testString)) {
    return "성함에 한글과 영어가 섞여 있습니다.\n다시 한 번 확인 해주세요.";
  } else {
    return "";
  }
};

// ✅ 특정 비정상 번호 차단
const blockedNumbers = [
  "11111111",
  "22222222",
  "33333333",
  "44444444",
  "55555555",
  "66666666",
  "77777777",
  "88888888",
  "99999999",
  "12341234",
];
// 블랙리스트 핸드폰 번호
const blockedaLists = ["01058579931"];

const save = async () => {
  if ($("#is_saved").val() == "Y") {
    return;
  }

  const url = new URL(window.location.href);
  const urlParams = url.searchParams;
  const advtMdiaDivVal = urlParams.get("advtMdiaDivVal") || "none";
  const advtMdiaDtlDivVal = urlParams.get("advtMdiaDtlDivVal") || "none";
  const advtMdiaTpDivVal = urlParams.get("advtMdiaTpDivVal") || "none";

  const fnm = $("#user_name").val().trim();
  const ctp = $("#user_call").val();
  const sido = $("#user_sido").val();
  const gugun = $("#user_gugun").val();
  const isHide_cns_req_hr_div_cd = $("#cns_req_hr_div_cd")
    .closest(".input_item")
    .hasClass("hide");
  const cns_req_hr_div_cd = $("#cns_req_hr_div_cd").val();
  const agr_tp_cd = $("#c_terms").is(":checked");
  const cho_agr_yn = $("#c_survey_privacy").is(":checked");
  const c_survey_privacy = $("#c_terms").is(":checked");
  const stndHrexRciAgr = $("#stndHrexRciAgrYn").is(":checked");
  const job_div_cd = $("#job_div_cd").val();
  const hop_prem_div_cd = $("#payment").val(); //연령대
  const orgCd = $("#orgCd").val();

  const advt_mdia_div_val = advtMdiaDivVal;
  const advt_mdia_tp_div_val = advtMdiaTpDivVal;
  const advt_mdia_dtl_div_val = advtMdiaDtlDivVal;
  const agr_md_cd = "27";
  const choAgrYn = cho_agr_yn ? "Y" : "N"; // 채용마케팅 활용을 위한 개인정보 동의(선택)
  const qstAgrYn = c_survey_privacy ? "Y" : "N"; //채용상담을 위한 개인신용정보 동의서(필수)
  const stndHrexRciAgrYn = stndHrexRciAgr ? "Y" : "N"; //야간 시간 상담 동의

  // 숫자만 남김
  const cleanedCtp = ctp.replace(/[^0-9]/g, "");

  // 앞자리 추출
  const prefix = cleanedCtp.substring(0, 3);
  const suffix = cleanedCtp.slice(3);

  const isMobilePrefix = ["010", "011"].includes(prefix);

  // 길이 검사
  const isValidLength = isMobilePrefix && cleanedCtp.length === 11;

  if (isEmpty(fnm)) {
    return alert("한글 이름을 정확하게 입력해 주세요.");
  }

  if (!isCleanWords(fnm)) {
    return alert(
      "이름에 부적절한 단어가 포함되어 있습니다.\n다시 입력해 주세요.",
    );
  }

  const nameValidationMessage = isVaildName(fnm);
  if (nameValidationMessage) {
    return alert(nameValidationMessage);
  }

  if (checkEachCharacterKoreanInput(fnm)) {
    return alert("입력하신 성함을 다시 한 번 확인 해주세요.");
  }

  if (
    isEmpty(ctp) ||
    !isValidLength ||
    blockedNumbers.includes(suffix) ||
    blockedaLists.includes(cleanedCtp)
  ) {
    return alert("휴대전화 번호를 정확하게 입력해 주세요.");
  }

  if (isEmpty(sido) || isEmpty(gugun)) {
    return alert("필수 항목인 거주 지역을 선택해 주세요.");
  }

  if (
    !isHide_cns_req_hr_div_cd &&
    (isEmpty(cns_req_hr_div_cd) || !cns_req_hr_div_cd)
  ) {
    return alert("필수 항목인 상담가능시간을 선택해 주세요.");
  }

  if (isEmpty(agr_tp_cd) || !agr_tp_cd) {
    return alert("필수약관 동의 후 상담 신청이 가능합니다.");
  }

  // GTM 변경작업 카울리 user_id 추가
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    user_id: ctp,
  });

  // 쿠키에서 현재 시간 읽기
  const savedTime = getSavedCurrentTime();
  const currentTime = new Date().toISOString();
  const useTime = calculateTimeDifferenceInSeconds(savedTime, currentTime);

  const data = {
    fnm: fnm,
    ctp: ctp,
    actArCd: sido + "_" + gugun,
    cnsReqHrDivCd: isHide_cns_req_hr_div_cd ? "16" : cns_req_hr_div_cd,
    advtMdiaDivVal: advt_mdia_div_val,
    advtMdiaTpDivVal: advt_mdia_tp_div_val,
    advtMdiaDtlDivVal: advt_mdia_dtl_div_val,
    agrMdCd: agr_md_cd,
    agrTpCd: "01",
    choAgrYn: choAgrYn,
    qstAgrYn: qstAgrYn,
    stndHrexRciAgrYn,
    jobDivCd: job_div_cd,
    hopPremDivCd: hop_prem_div_cd,
    regDivCd: "01",
    useSs: useTime,
    orgCd: orgCd,
    click_key: clickKey,
  };

  await save_consultation_information(data);

  $("#is_saved").val("N");
};

// const checkPathName = (url) => {
//   return (
//     url.href.includes("2503LAA") ||
//     url.href.includes("09A") ||
//     url.href.includes("2503LAB") ||
//     url.href.includes("09-CTA-B") ||
//     url.href.includes("2502L_A") ||
//     url.href.includes("KV09B") ||
//     url.href.includes("2504LA") ||
//     url.href.includes("2504LB") ||
//     url.href.includes("2504LC") ||
//     url.pathname === "/"
//   );
// };

// 매체 코드 파라미터 확인 함수
const checkAdvtMdiaDivVal = (advtMdiaDivVal, advtMdiaTpDivVal) => {
  if (!advtMdiaDivVal || !advtMdiaTpDivVal) return;
  const text = [
    "tiktok",
    "queenit",
    "google",
    "tenping",
    "sonline",
    "navernosp",
    "3_3",
  ];
  const isSome = text.some((i) => advtMdiaDivVal.includes(i));
  if (
    isSome ||
    (advtMdiaDivVal.includes("naver") &&
      ["banner", "video"].some((i) => advtMdiaTpDivVal.includes(i)))
  ) {
    return true;
  }
  return false;
};
const ageCheck = () => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const hop_prem_div_cd = $("#payment").val(); //연령대
  const advtMdiaDivVal = params.get("advtMdiaDivVal");
  const advtMdiaTpDivVal = params.get("advtMdiaTpDivVal");
  const isMaxAge = hop_prem_div_cd === "06";

  if (checkAdvtMdiaDivVal(advtMdiaDivVal, advtMdiaTpDivVal) && isMaxAge) {
    openLayerAlert(
      '메리츠 파트너스는 <span style="color: red; font-weight: bold">60세 이하</span> 고객님만<br/> 신청 하실 수 있습니다.',
    );
    return;
  }
  if (isMaxAge) {
    openLayerAlert(
      `<div>
            <span style="color: blue;font-weight: bold; font-size: 14px;">⚠️ 60대 이상 고객님께 중요 안내드립니다.</span><br>
            <p style="font-size: 14px">
                스마트폰으로 <span style="font-weight: bold">강의 수강과 시험 합격이 필수</span>입니다.<br/>
                위 절차 수행이 어려울 경우, 활동이 불가능합니다.
            </p>
        </div>`,
    );
  }
  if (hop_prem_div_cd === "01") {
    openLayerAlert(
      `
            ⚠️ 미성년자는 <span style="color: blue;font-weight: bold;">법령상 활동이 불가능</span>하여<br/>
            신청할 수 없습니다.
        `,
    );
  }
  if (hop_prem_div_cd === "02") {
    openLayerAlert(
      '메리츠 파트너스는  <span style="color: red; font-weight: bold">25세 이상</span> 부터 <br>신청하실 수 있습니다.',
    );
  }
};

// *********   레이어 코드 추가 12.12일 함치영
document.addEventListener("DOMContentLoaded", function () {
  // Layer Alert HTML 구조를 동적으로 추가
  const layerAlertHTML = `
        <div id="layer-alert" class="layer-alert" style="display: none;">
            <div class="layer-alert-content">
                <button class="layer-alert-close" onclick="closeLayerAlert()">✖</button>
                <div id="layer-alert-message"></div>
            </div>
        </div>
    `;

  // body 태그에 추가
  document.body.insertAdjacentHTML("beforeend", layerAlertHTML);
});

const openLayerAlert = (messageHTML) => {
  const alertBox = document.getElementById("layer-alert");
  const alertMessage = document.getElementById("layer-alert-message");
  alertMessage.innerHTML = messageHTML; // HTML 메시지 삽입
  alertBox.style.display = "flex"; // 알럿 표시
};

// 레이어 알럿 닫기
const closeLayerAlert = () => {
  const alertBox = document.getElementById("layer-alert");
  alertBox.style.display = "none"; // 알럿 숨기기
};

function getCurrentDateTimeString() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}${hour}${minute}${second}`;
}

/**
 * 외부 트래킹 검사
 * @param {Object} data - 저장할 방문자 정보
 */
const insert_dbdbdeep = async (data) => {
  const advtMdiaDivVal = urlParams.get("advtMdiaDivVal") || "none";
  if (advtMdiaDivVal !== "dbd") return;
  function maskUserInfo(name, phone) {
    // --- 1) 이름 마스킹 ---
    // 성 제거 후 앞 글자 * 처리
    const nameWithoutSurname = name.slice(1);
    const maskedName = "*" + nameWithoutSurname;

    // --- 2) 전화번호 마스킹 ---
    // 숫자만 추출
    const cleaned = phone.replace(/[^0-9]/g, "");

    // prefix 판별: 02(2자리) or 일반(3자리)
    let prefix = "";
    if (cleaned.startsWith("02")) {
      prefix = cleaned.substring(0, 2);
    } else {
      prefix = cleaned.substring(0, 3);
    }

    // 무조건 4-4 마스킹 처리
    const maskedPhone = `${prefix}-****-****`;

    return {
      name: maskedName,
      phone: maskedPhone,
    };
  }

  const { name, phone } = maskUserInfo(data.fnm, data.ctp);
  const payload = {
    lncd: new URL(location.href).searchParams.get("lncd") || "",
    age: data.hopPremDivCd,
    item1: data.cnsReqHrDivCd,
    name: name,
    tel: phone,
    // 아이피 난수 생성
    callIp: Array.from(
      { length: 4 },
      () => Math.floor(Math.random() * 256), // 0~255 난수
    ).join("."),
  };

  function insertViaImg({ lncd, name, tel, age, item1, callIp = "127.0.0.1" }) {
    const qs = new URLSearchParams({ lncd, name, tel, age, item1, callIp });
    const url = `https://www.dbdbdeep.com/site19/out/in_db.php?${qs.toString()}&t=${Date.now()}`; // 캐시 방지
    const img = new Image();
    img.referrerPolicy = "no-referrer"; // (옵션) 리퍼러 숨기기
    img.src = url; // 요청 전송(응답은 안 씀)
  }

  insertViaImg(payload);
};

/**
 * 외부 트래킹 검사
 */
const insert_adeeple = async () => {
  const advtMdiaDivVal = urlParams.get("advtMdiaDivVal") || "none";
  const advtMdiaTpDivVal = urlParams.get("advtMdiaTpDivVal") || "none";
  const tokenId = new URL(location.href).searchParams.get("tokenId") || "";
  if (advtMdiaDivVal !== "adp" || advtMdiaTpDivVal !== "cpa" || !tokenId)
    return;
  const data = {
    tokenId: tokenId,
    item1: getCurrentDateTimeString(),
  };

  fetch("https://adeeple.com/actionLog/postback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((err) => console.error("insert_adeeple error", err));
};

const increase_visitors = async () => {
  // const nav = performance.getEntriesByType('navigation')[0].type;
  const nav = "navigate";
  if (nav == "navigate") {
    const location = window.location;
    const origin = location.origin;
    const pathname = location.pathname == "/" ? "" : location.pathname;
    const page_url = origin + pathname;

    const data = {
      page_url: page_url,
    };

    //2024.10.15일 하루 호출하지 않음
    // await insert_visitors(data);
  }
};
/**
 * 방문자 정보를 서버에 저장하는 함수
 * @param {Object} data - 저장할 방문자 정보
 */
const insert_visitors = async (data) => {
  try {
    await fetch(`${API_URL}/meritz/visitors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error inserting visitors:", error);
  }
};

/**
 * 필수값 체크 여부 확인하여 value 반환 또는 true
 * @param selector
 * @param isCheckbox
 */
const getFieldValue = (selector, isCheckbox = false) => {
  const $element = $(selector);
  // is-check-required가 false이면 true 반환, 아니라면 실제 값 반환
  if ($element.data("is-check-required") === false) {
    return true;
  }
  // 체크박스일 경우 checked 상태 반환, 그 외에는 value 반환
  return isCheckbox ? $element.is(":checked") : $element.val();
};

const activeEvent = () => {
  const fnm = getFieldValue("#user_name");
  const ctp = getFieldValue("#user_call");
  const sido = getFieldValue("#user_sido");
  const gugun = getFieldValue("#user_gugun");
  const cns_req_hr_div_cd = getFieldValue("#cns_req_hr_div_cd");
  const agr_tp_cd = getFieldValue("#c_terms", true);
  const ageRange = getFieldValue("#payment");

  console.log(agr_tp_cd, "agr_tp_cd");

  switch (
    !(agr_tp_cd && fnm && ctp && sido && gugun && cns_req_hr_div_cd && ageRange)
  ) {
    case true:
      $(".btn_submit").attr("disabled", "disabled");
      break;
    case false:
      $(".btn_submit").removeAttr("disabled");
      break;
  }
};

// 상수 정의
const KOREAN_REGEX = /^[가-힣ㄱ-ㅎㅏ-ㅣ\p{P}]+$/u;
const ENGLISH_REGEX = /^[a-zA-Z\p{P}]+$/u;
const KOREAN_ONLY_REGEX = /[^가-힣ㄱ-ㅎㅏ-ㅣ\p{P}]/gu; //한글, 특수문자만 허용, 띄어쓰기 비허용
const ENGLISH_AND_SPACE_REGEX = /[^a-zA-Z\p{P}\s]/gu; //영어, 특수문자, 띄어쓰기 허용

// 상태 변수
let isComposing = false;

// 유틸리티 함수
const isKorean = (char) => KOREAN_REGEX.test(char);
const isEnglish = (char) => ENGLISH_REGEX.test(char);

// 입력 처리 함수
const processInput = (value) => {
  const trimmedValue = value.trim();
  const firstChar = trimmedValue.charAt(0);

  if (isKorean(firstChar) || /[\p{P}]/u.test(firstChar)) {
    return value.replace(KOREAN_ONLY_REGEX, "");
  } else if (isEnglish(firstChar) || /[\p{P}]/u.test(firstChar)) {
    return value.replace(ENGLISH_AND_SPACE_REGEX, "");
  }
  return value; // 첫 글자가 한글, 영어, 특수문자가 아닐 경우 원래 값 반환
};

// 이벤트 핸들러
const handleInput = (event) => {
  // if (isComposing) return; // 조합 중일 때는 처리하지 않음

  const $input = $(event.target);
  const currentValue = $input.val();
  const isEng = /^[a-zA-Z]+$/.test(currentValue.replace(/\s+/g, ""));
  //const newValue = processInput(currentValue);
  const trimmedValue = isEng ? currentValue : currentValue.trim();
  $input.val(trimmedValue);

  // if (currentValue !== newValue) {
  //     $input.val(newValue);
  // }
};

$(document).on("input", "#user_name", handleInput);
$(document).on("input", "#user_name", activeEvent);
$(document).on("click", ".confirm ", activeEvent);

$(document).on("input", "#user_call", activeEvent);
$(document).on("change", "#user_sido", activeEvent);
$(document).on("change", "#user_gugun", activeEvent);
$(document).on("change", "#c_terms", activeEvent);
$(document).on("change", "#cns_req_hr_div_cd", activeEvent);
$(document).on("change", "#c_agree", activeEvent);
$(document).on("change", "#payment", activeEvent);
$(document).on("change", ".privacy-check input", activeEvent);

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 *
 * @param event_name
 * @return {Promise<void>}
 */
const sendMetaApiConversionEvent = async (
  event_name = "CompleteRegistration",
) => {
  const PIXEL_ID = "753445463119809";
  const ACCESS_TOKEN =
    "EAASNs1qZAl88BOwQKMMLmX9fl2wSGWZB3cZAP6ldgEKM4WGhkRr8mba5h0EgCFlRnbo2GQkHz3yr0OX3wZCSIIBfIOwNad5fYo4iuQAoGoni1VL6qNsD5oD5ZAB54UdIYCfruJbv8WwGM99LaaDq4eVraeaktB6dJaTsP62MfZCUz98NoOsffhbEnEeJhtab0zzQZDZD";
  const API_VERSION = "v20.0"; // 사용하려는 API 버전
  const emRandomStr = "em_" + Math.random();
  const shaEmRandomStr = await sha256(emRandomStr);
  const eventData = {
    data: [
      {
        event_name: event_name,
        event_time: Math.floor(Date.now() / 1000), // 현재 시간을 UNIX 타임스탬프로 변환
        user_data: {
          client_ip_address: "",
          client_user_agent: navigator.userAgent,
          em: shaEmRandomStr,
        },
        event_source_url: location.href,
        action_source: "website",
      },
    ],
  };

  const params = new URLSearchParams();
  params.append("data", JSON.stringify(eventData.data));
  params.append("access_token", ACCESS_TOKEN);

  try {
    const response = await fetch(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      },
    );

    const result = await response.json();
    // console.log('[sendConversionEvent] :: Event sent successfully:', result);
  } catch (error) {
    console.error("[sendConversionEvent] :: Error sending event:", error);
  }
};

//지역리스트 출력
$(function () {
  areaSelectMaker("#user_sido", "#user_gugun");
});
var areaSelectMaker = function (a2, a3) {
  if (a2 == null || a3 == null) {
    console.warn("Unkwon Area Tag");
    return;
  }

  var area = {
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
    대구: [
      "남구",
      "달서구",
      "동구",
      "북구",
      "서구",
      "수성구",
      "중구",
      "달성군",
    ],
    울산: ["남구", "동구", "북구", "중구", "울주군"],
    제주특별자치도: ["서귀포시", "제주시"],
  };

  //초기화
  init(true);

  var search_sido = ``;
  var search_gugun = ``;

  //권역 기본 생성
  var areaKeys1 = Object.keys(area);
  areaKeys1.forEach(function (Region) {
    var a1_selected = "";

    if (search_sido == Region) {
      a1_selected = "selected";
    }
    $(a2).append(
      "<option value=" +
        Region +
        " " +
        a1_selected +
        ">" +
        Region +
        "</option>",
    );
  });

  if (search_sido) {
    init();

    var Do = search_sido;
    var keys = Object.keys(area[Do]);
    keys.forEach(function (SiGunGu) {
      var a2_selected = "";
      if (search_gugun == area[Do][SiGunGu]) {
        a2_selected = "selected";
      }
      $(a3).append(
        "<option value=" +
          area[Do][SiGunGu] +
          " " +
          a2_selected +
          ">" +
          area[Do][SiGunGu] +
          "</option>",
      );
    });
  }

  //변경 이벤트
  $(document).on("change", a2, function () {
    init();
    var Do = $(this).val();
    var keys = Object.keys(area[Do]);
    keys.forEach(function (SiGunGu) {
      $(a3).append(
        "<option value=" +
          area[Do][SiGunGu] +
          ">" +
          area[Do][SiGunGu] +
          "</option>",
      );
    });
  });

  function init(second) {
    second ? $(a2).empty().append("<option value=''>시/도</option>") : "";
    $(a3).empty().append("<option value=''>시/군/구</option>");
  }
};

function loadAxios() {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
  script.async = true;
  // script.onload = callback; // Axios가 로드된 후 실행할 콜백 함수
  document.head.appendChild(script);
}

loadAxios();
