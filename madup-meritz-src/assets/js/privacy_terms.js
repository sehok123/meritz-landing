const privacyTerms = `
    <div class="sheet-wrap">
        <div class="sheet-header">
            <h3><span class="text-red">[필수]</span> 메리츠 파트너스 채용상담을 위한 개인신용정보 동의서</h3>
            <p class="desc">* 본 동의서는 메리츠 파트너스가 개인정보처리자로서 수집 · 이용합니다.</p>
            <button onclick="closeBottomSheet('sheet-agreement1')" class="close-button">
                <span class="screen-only">닫기</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24" fill="none">
                    <path fill="#222"
                        d="M21.172 24 5.586 8.414l2.828-2.828L24 21.17 39.586 5.586l2.828 2.828L26.83 24l15.585 15.586-2.828 2.828L24 26.828 8.414 42.414l-2.828-2.828L21.172 24Z" />
                </svg>
            </button>
        </div>
        <div class="sheet-contents">
            <div class="terms-desc">
                <div class="desc-wrap">
                    <h4>1. 수집 · 이용에 관한 사항</h4>
                    <div class="notice">
                        <p>
                            <b>수집 · 이용목적</b>
                            메리츠 파트너스 채용 상담 진행 및 관련 안내 제공<br>
                            메리츠 파트너스에 대한 채용 정보 및 지원 방법 등 안내 제공<br>
                            상담 후 추가적인 지원 안내 및 관련 서비스에 대한 안내 제공
                        </p>
                        <p>
                            <b>보유 및 이용기간</b>
                            보유기간은 동의일로부터 1년이며 이후에는 지체없이 파기됩니다.
                        </p>
                        <p>
                            <b>거부 권리 및 불이익</b>
                            귀하는 아래 개인(신용)정보 수집,이용에 관한 동의를 거부하실 수 있습니다.<br>
                            동의 거부 시 불이익은 없으나 메리츠 파트너스의 채용상담 서비스는 제공되지 않습니다.
                        </p>
                    </div>
                </div>
                <div class="desc-wrap">
                    <h4>2. 수집 · 이용항목</h4>
                    <div class="use">
                        <b>개인(신용) 정보</b>
                        <p>- 일반 개인정보 : 성명, 거주지, 연령대, 전화번호, 상담 가능시간, 직업</p>
                    </div>
                </div>
                <div class="agreement">
                    <p class="text-red">위 개인정보를 수집/이용 하는 것에 동의합니다.</p>
                    <div class="privacy-check">
                        <div class="check-agree">
                            <input type="radio" name="collect_info_chk" id="sheet_collect_info_agree" class="blind" value="true">
                            <label for="sheet_collect_info_agree">동의함</label>
                        </div>
                        <div class="check-disagree">
                            <input type="radio" name="collect_info_chk" id="sheet_collect_info_disagree" class="blind" value="false" checked>
                            <label for="sheet_collect_info_disagree">동의하지 않음</label>
                        </div>
                    </div>
                </div>
                <div class="agreement">
                    <p class="text-red">채용안내 관련 광고성(전화/문자)수신에 동의합니다.</p>
                    <div class="privacy-check">
                        <div class="check-agree">
                            <input type="radio" name="allow_ad_chk" id="sheet_allow_ad_agree" class="blind" value="true">
                            <label for="sheet_allow_ad_agree">동의함</label>
                        </div>
                        <div class="check-disagree">
                            <input type="radio" name="allow_ad_chk" id="sheet_allow_ad_disagree" class="blind" value="false" checked>
                            <label for="sheet_allow_ad_disagree">동의하지 않음</label>
                        </div>
                    </div>
                </div>
                <a href="javascript:void(0);" class="confirm button dark" onclick="agreeAll()">전체 동의</a>
            </div>
        </div>
    </div>
`;
//전체 동의시 체크 값 변경
function agreeAll() {
  $('input[name="collect_info_chk"][value="true"]').prop("checked", true); //채용상담
  $('input[name="allow_ad_chk"][value="true"]').prop("checked", true); //
  $('input[name="c_counsel"][value="true"]').prop("checked", true);
  $('input[name="stndHrexRciAg_chk"][value="true"]').prop("checked", true);

  $("#c_terms").prop("checked", true);
  closeBottomSheet("sheet-agreement1");
}

// 페이지 로드 후 form 내용을 동적으로 삽입
document.addEventListener("DOMContentLoaded", function () {
  const contentArea = document.getElementById("sheet-agreement1");
  if (contentArea) {
    contentArea.innerHTML = privacyTerms; // area_form 내부에 formHTML 삽입
  }
});

$(document).on("click", "#c_agree", function () {
  if ($(this).is(":checked")) {
    $('input[name="collect_info_chk"][value="true"]').prop("checked", true);
    $('input[name="allow_ad_chk"][value="true"]').prop("checked", true);
    $('input[name="survey_privacy_chk"][value="true"]').prop("checked", true);
    $('input[name="survey_privacy_chk2"][value="true"]').prop("checked", true);

    // 야간 상담 동의
    $('input[name="stndHrexRciAg_chk"][value="true"]').prop("checked", true);
  } else {
    $('input[name="collect_info_chk"][value="false"]').prop("checked", true);
    $('input[name="allow_ad_chk"][value="false"]').prop("checked", true);
    $('input[name="survey_privacy_chk"][value="false"]').prop("checked", true);
    $('input[name="survey_privacy_chk2"][value="false"]').prop("checked", true);

    // 야간 상담 동의
    $('input[name="stndHrexRciAg_chk"][value="false"]').prop("checked", true);
  }
});

$(document).on("click", "#c_terms", function () {
  if ($(this).is(":checked")) {
    $('input[name="collect_info_chk"][value="true"]').prop("checked", true);
    $('input[name="allow_ad_chk"][value="true"]').prop("checked", true);
  } else {
    $('input[name="collect_info_chk"][value="false"]').prop("checked", true);
    $('input[name="allow_ad_chk"][value="false"]').prop("checked", true);
  }
});

$(document).on("click", "#c_survey_privacy", function () {
  if ($(this).is(":checked")) {
    $('input[name="survey_privacy_chk"][value="true"]').prop("checked", true);
    $('input[name="survey_privacy_chk2"][value="true"]').prop("checked", true);
  } else {
    $('input[name="survey_privacy_chk"][value="false"]').prop("checked", true);
    $('input[name="survey_privacy_chk2"][value="false"]').prop("checked", true);
  }
});

// 야간 동의 대 메뉴 클릭시
$(document).on("click", "#stndHrexRciAgrYn", function () {
  if ($(this).is(":checked")) {
    $('input[name="stndHrexRciAg_chk"][value="true"]')
      .prop("checked", true)
      .trigger("change");
  } else {
    $('input[name="stndHrexRciAg_chk"][value="false"]')
      .prop("checked", true)
      .trigger("change");
  }
});
$(document).ready(function () {
  // 상태를 체크해서 #c_terms 상태를 갱신하는 함수
  function syncChecked(selector, checked) {
    const $target = $(selector);
    const prevChecked = $target.is(":checked");

    $target.prop("checked", checked);

    if (prevChecked !== checked) {
      $target.trigger("change");
    }
  }

  function updateCTerms() {
    const total = $("input[name=agree_chk]").length;
    const total_checked = $("input[name=agree_chk]:checked").length;
    const collectAgreed = $('input[name="collect_info_chk"][value="true"]').is(
      ":checked",
    );
    const adAgreed = $('input[name="allow_ad_chk"][value="true"]').is(
      ":checked",
    );

    //채용마게팅
    const snsAgree = $('input[name="survey_privacy_chk2"][value="true"]').is(
      ":checked",
    );
    const sAgree = $('input[name="survey_privacy_chk"][value="true"]').is(
      ":checked",
    );

    const stndHrexRciAgrYn = $(
      'input[name="stndHrexRciAg_chk"][value="true"]',
    ).is(":checked");

    console.log(collectAgreed, "collectAgreed");
    console.log(sAgree, "sAgree");
    console.log(snsAgree, "snsAgree");

    // 채용상담을 위한
    if (collectAgreed) {
      syncChecked("#c_terms", true); // 둘 다 동의 시 체크
    } else {
      syncChecked("#c_terms", false); // 하나라도 동의 안 하면 해제
    }

    // 마케팅 동의
    if (sAgree && snsAgree) {
      syncChecked("#c_survey_privacy", true); // 둘 다 동의 시 체크
    } else {
      syncChecked("#c_survey_privacy", false); // 하나라도 동의 안 하면 해제
    }

    // 야간 시간 동의
    if (stndHrexRciAgrYn) {
      syncChecked("#stndHrexRciAgrYn", true); // 둘 다 동의 시 체크
    } else {
      syncChecked("#stndHrexRciAgrYn", false); // 하나라도 동의 안 하면 해제
    }

    if (collectAgreed && sAgree && snsAgree && stndHrexRciAgrYn)
      syncChecked("#c_agree", true);
    else {
      syncChecked("#c_agree", false);
    }
  }

  // 동의/비동의 라디오 선택 시마다 갱신
  $(document).on(
    "change",
    'input[name="collect_info_chk"], input[name="allow_ad_chk"], input[name="survey_privacy_chk"], input[name="survey_privacy_chk2"], input[name="stndHrexRciAg_chk"]',
    function () {
      $(`input[name="${this.name}"][value="${this.value}"]`).prop(
        "checked",
        true,
      );
      updateCTerms();
    },
  );
});
