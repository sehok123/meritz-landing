let currentStep = 1;
let formData = {};
const maxCount = 6;
const user_sido = document.querySelector("#user_sido");
const user_gugun = document.querySelector("#user_gugun");
const cns_req_hr_div_cd = document.querySelector("#cns_req_hr_div_cd");

/** ----------------------------
 * STEP 이동 (애니메이션 + 진행바)
 * ---------------------------- */
function showStep(n, isPrev) {
  const arrowButton = document.querySelector(".form-arrow");
  const range = document.querySelector(".stepRang");
  const currentEl = document.querySelector(
    `.progress[data-step="${currentStep}"]`,
  );
  const nextEl = document.querySelector(`.progress[data-step="${n}"]`);
  if (currentStep === n) return;
  if (!isPrev && !checkCurrentStep(n)) return;
  if(nextEl) {
    if (gsap) {
      gsap.to(currentEl, {
        duration: 0.4,
        opacity: 0,
        onComplete: () => {
          currentEl.classList.remove("active");
          gsap.set(currentEl, { display: "none" });
          nextEl.classList.add("active");
          gsap.set(nextEl, { opacity: 0, display: "flex" });
          gsap.to(nextEl, { duration: 0.5, opacity: 1 });
        },
      });
    } else {
      currentEl.classList.remove("active");
      nextEl.classList.add("active");
    }
  }else{
    document.querySelector("#sendButton").classList.add("complete");
    document.querySelector(".bottom-sheet").classList.add("open");
    return;
  }

  if(n !== 1){
    arrowButton.classList.add("prev");
    arrowButton.classList.remove("close");
  }else{
    arrowButton.classList.add("close");
    arrowButton.classList.remove("prev");
  }
  n === 6 ? range.classList.add("last") : range.classList.remove("last");
  // 카운트/게이지 업데이트
  document.querySelector(".count span").innerHTML = n;
  let percent = (n / (maxCount - 1)) * 100;
  if (percent > 100) percent = 100;
  document.querySelector(".percentBg").style.width = `${percent}%`;

  currentStep = n;
}
function restoreHiddenInput() {
  const select = document.querySelector("#cns_req_hr_div_cd");
  if (!select || select.tagName !== "SELECT") return;

  // 복원용 hidden input 생성
  const hiddenInput = document.createElement("input");
  hiddenInput.type = "hidden";
  hiddenInput.id = "cns_req_hr_div_cd";
  hiddenInput.value = select.value;

  // select 대신 다시 hidden으로 교체
  select.replaceWith(hiddenInput);
}

function prepareSelectForServer() {
  // 이미 존재한다면 중복 생성 방지
  if (document.querySelector("#cns_req_hr_div_cd select")) return;

  const hiddenInput = document.querySelector("#cns_req_hr_div_cd");
  const selectedValue = hiddenInput.value;
  if (!selectedValue) return; // 선택 안했으면 skip

  // select + option 생성
  const select = document.createElement("select");
  select.id = "cns_req_hr_div_cd"; // 서버 코드에서 찾는 id 유지
  select.style.display = "none"; // 눈에 안 보이게 숨김

  const option = document.createElement("option");
  option.value = selectedValue;
  option.selected = true;
  option.textContent =
    selectedValue === "13"
      ? "오전이 좋아요"
      : selectedValue === "14"
        ? "오후가 좋아요"
        : selectedValue;

  select.appendChild(option);

  // 기존 hidden input을 교체 (서버 쪽 querySelector가 option:checked 찾도록)
  hiddenInput.replaceWith(select);
}

/** ----------------------------
 * 각 단계 유효성 체크
 * ---------------------------- */
const checkCurrentStep = (n) => {
  if (currentStep === 1 && (!user_sido.value || !user_gugun.value)) {
    alert("거주 지역을 선택해주세요");
    return false;
  }
  if (currentStep === 2 && !document.querySelector("#job_div_cd").value) {
    alert("직업을 선택해주세요");
    return false;
  }
  if (currentStep === 3 && !document.querySelector("#payment").value) {
    alert("연령대를 선택해주세요");
    return false;
  }
  if (currentStep === 4 && !cns_req_hr_div_cd.value) {
    alert("상담 가능 시간을 알려주세요");
    return false;
  }
  if (currentStep === 5) {
    const name = document.querySelector("#user_name").value.trim();
    const phone = document.querySelector("#user_call").value.trim();

    // 숫자만 남김
    const cleanedCtp = phone.replace(/[^0-9]/g, "");

    // 앞자리 추출
    const prefix = cleanedCtp.substring(0, 3);
    const suffix = cleanedCtp.slice(3);

    const isMobilePrefix = ["010", "011"].includes(prefix);

    if (isEmpty(name)) {
      return alert("한글 이름을 정확하게 입력해 주세요.");
    }

    if (!isCleanWords(name)) {
      return alert(
        "이름에 부적절한 단어가 포함되어 있습니다.\n다시 입력해 주세요.",
      );
    }

    const nameValidationMessage = isVaildName(name);
    if (nameValidationMessage) {
      return alert(nameValidationMessage);
    }

    if (checkEachCharacterKoreanInput(name)) {
      return alert("입력하신 성함을 다시 한 번 확인 해주세요.");
    }

    // 길이 검사
    const isValidLength = isMobilePrefix && cleanedCtp.length === 11;

    if (
      isEmpty(phone) ||
      !isValidLength ||
      blockedNumbers.includes(suffix) ||
      blockedaLists.includes(cleanedCtp)
    ) {
      return alert("휴대전화 번호를 정확하게 입력해 주세요.");
    }
    if (document.querySelector("#c_terms").checked) {
      prepareSelectForServer();
      save();
    } else {
      alert("필수약관 동의 후 상담 신청이 가능합니다.");
    }
    return false;
  }
  return true;
};

/** ----------------------------
 * 공통 선택값 저장
 * ---------------------------- */
function selectOption(key, value, isFirst) {
  formData[key] = value;
  // const stepDiv = document.querySelector(
  //   `.progress[data-step="${currentStep}"]`,
  // );
  // const nextBtn = stepDiv.querySelector(".next");
  // if (nextBtn) nextBtn.disabled = false;
  if(!isFirst){
    showStep(currentStep + 1);
  }
}

/** ----------------------------
 * 버튼 이벤트 바인딩
 * ---------------------------- */
document.querySelectorAll(".next").forEach((btn) => {
  btn.addEventListener("click", () => {
    showStep(currentStep + 1);
  });
});
document.querySelectorAll(".last").forEach((btn) => {
  btn.addEventListener("click", () => {
    showStep(6);
  });
});
// document.querySelectorAll(".nextBtn").forEach((btn) => {
//   btn.addEventListener("click", () => {
//     closeLayerAlert();
//     selectOption("payment", document.querySelector("input[name='payment']:checked").value);
//   });
// });
document.querySelectorAll(".form-arrow").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const currentBtn = e.currentTarget;

    // 현재 버튼이 'prev' 클래스를 가지고 있는지 확인
    if (currentBtn.classList.contains("prev")) {
      showStep(currentStep - 1, true);
    } 
    // 현재 버튼이 'close' 클래스를 가지고 있는지 확인
    else if (currentBtn.classList.contains("close")) {
      resetFormAndClose();
    }
  });
});

/** ----------------------------
 * Step2 시/도 목록 자동 생성
 * ---------------------------- */
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

/** ----------------------------
 * Step1 지역
 * ---------------------------- */
window.addEventListener("DOMContentLoaded", () => {
  const regionList = document.getElementById("user_sido");
  const cityList = document.getElementById("user_gugun");
  Object.keys(area).forEach((region) => {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    regionList.appendChild(option);
  });
  regionList.addEventListener("change", () => {
    updateCityList(regionList.value);
    selectOption("region", regionList.value, true);
  });
  cityList.addEventListener("change", (e) => {
    selectOption("city", cityList.value);
  });
});

function updateCityList(region) {
  const cityList = document.getElementById("user_gugun");
  area[region].forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    cityList.appendChild(option);
  });
}

/** ----------------------------
 * Step4 상담 가능 시간
 * ---------------------------- */
document.querySelectorAll('input[name="cns_req_hr_div_cd"]').forEach((input) => {
    input.addEventListener("click", (e) => {
      cns_req_hr_div_cd.value = e.target.value;
      selectOption("cns_req_hr_div_cd", e.target.value);
    });
  });

/** ----------------------------
 * Step5 연령대 선택
 * ---------------------------- */
document.querySelectorAll('input[name="payment"]').forEach((input) => {
  input.addEventListener("click", (e) => {
    const value = e.target.value;
    document.querySelector("#payment").value = value;
    ageCheck1();
    if (value === "07" || value === "06" || value === "01" || value === "02") return;
    selectOption("payment", e.target.value);
  });
});

const confirmAlert = ()=>{
    closeLayerAlert();
    selectOption("payment", document.querySelector("input[name='payment']:checked").value);
}
const ageCheck1 = () => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const hop_prem_div_cd = $("#payment").val(); //연령대
  const advtMdiaDivVal = params.get("advtMdiaDivVal");
  const advtMdiaTpDivVal = params.get("advtMdiaTpDivVal");
  const isMaxAge = hop_prem_div_cd === "06" || hop_prem_div_cd === "07";

  if (checkAdvtMdiaDivVal(advtMdiaDivVal, advtMdiaTpDivVal) && isMaxAge) {
    openLayerAlert(
      '메리츠 파트너스는 <span style="color: red; font-weight: bold">60세 이하</span> 고객님만<br/> 신청 하실 수 있습니다.'
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
            <button onclick="confirmAlert()" class="btn nextBtn backgroundMain">확인했습니다</button>
        </div>`
    );
  }
  if (hop_prem_div_cd === "01") {
    openLayerAlert(
      `
            ⚠️ 미성년자는 <span style="color: blue;font-weight: bold;">법령상 활동이 불가능</span>하여<br/>
            신청할 수 없습니다.
        `
    );
  }
  if (hop_prem_div_cd === "02") {
    openLayerAlert(
      '메리츠 파트너스는  <span style="color: red; font-weight: bold">25세 이상</span> 부터 <br>신청하실 수 있습니다.<button onclick="confirmAlert()" class="btn nextBtn backgroundMain">확인했습니다</button>'
    );
  }
};
/** ----------------------------
 * Step6 직업 선택
 * ---------------------------- */
document.querySelectorAll('input[name="job_div_cd"]').forEach((input) => {
  input.addEventListener("click", (e) => {
    document.querySelector("#job_div_cd").value = e.target.value;
    selectOption("job_div_cd", e.target.value);
  });
});

/** ----------------------------
 * Step8 약관 동의 체크
 * ---------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const allAgree = document.getElementById("c_agree"); // 최상위 전체 동의
  const agreeItems = document.querySelectorAll(".agree-item");
  
  // ★ 중요: c_agree 본인을 제외한 순수 개별 체크박스만 추출!
  const subChecks = document.querySelectorAll('.agree-item input[type="checkbox"]');
  const allRadios = document.querySelectorAll('.agree-item input[type="radio"]');

  /* ========================================================
   * 1. 최상위 전체 동의 상태를 검사하여 업데이트하는 함수
   * ======================================================== */
  function updateAllAgreeState() {
    const isAllSubChecked = [...subChecks].every((chk) => chk.checked);
    const radioNames = [...new Set([...allRadios].map((r) => r.name))];
    const isAllRadiosTrue = radioNames.every((name) => {
      const selected = document.querySelector(`input[name="${name}"]:checked`);
      console.log(name, '->', selected?.value); // 👈 이 줄 추가
      return selected && selected.value === "true";
    });
    console.log({ isAllSubChecked, isAllRadiosTrue }); // 👈 이 줄 추가
    allAgree.checked = isAllSubChecked && isAllRadiosTrue;
  }

  /* ========================================================
   * 2. 개별 .agree-item 내부 로직
   * ======================================================== */
  agreeItems.forEach((item) => {
    const masterCheckbox = item.querySelector("input[type='checkbox']");
    const childRadios = item.querySelectorAll("input[type='radio']");

    if (!masterCheckbox) return;

    // A. [개별 체크박스] 클릭 시 -> 하위 라디오 제어
    masterCheckbox.addEventListener("change", () => {
      const isChecked = masterCheckbox.checked;

      childRadios.forEach((radio) => {
        if (isChecked) {
          if (radio.value === "true") radio.checked = true;
        } else {
          if (radio.value === "false") radio.checked = true;
        }
      });

      updateAllAgreeState();
    });

    // B. [하위 라디오] 클릭 시 -> 상위 체크박스 & 전체 동의 제어
    childRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        const localGroups = [...new Set([...childRadios].map((r) => r.name))];

        // 이 약관 항목 안의 모든 라디오가 "true"인가?
        const isLocalAllTrue = localGroups.every((groupName) => {
          const selected = item.querySelector(`input[name="${groupName}"]:checked`);
          return selected && selected.value === "true";
        });

        // 1) 개별 체크박스 상태 갱신
        masterCheckbox.checked = isLocalAllTrue;

        // 2) 전체 동의 상태 갱신
        updateAllAgreeState();
      });
    });
  });

  /* ==========================================================
   * 3. [최상위 전체 동의(#c_agree)] 클릭 시 -> 전체 제어
   * ========================================================== */
  allAgree.addEventListener("change", () => {
    const isChecked = allAgree.checked;

    // 모든 개별 체크박스 갱신
    subChecks.forEach((chk) => (chk.checked = isChecked));

    // 모든 라디오 버튼 갱신
    allRadios.forEach((radio) => {
      if (isChecked) {
        if (radio.value === "true") radio.checked = true;
      } else {
        if (radio.value === "false") radio.checked = true;
      }
    });
  });
});

window.successCallback = (data) => {
  showStep(currentStep + 1, true);
  restoreHiddenInput();
};

/** ----------------------------
 * 완료 후 초기화 및 창 닫기
 * ---------------------------- */
function resetFormAndClose() {
  const arrow = document.querySelector(".form-arrow");
  const wrapper = document.querySelector(".wrapper");
  const modal = document.querySelector(".formSection");
  const nav = document.querySelector(".stepRang");
  document.querySelectorAll("input").forEach((input) => {
    if (input.type === "radio" || input.type === "checkbox") {
      input.checked = false;
    } else {
      input.value = "";
    }
  });
  document.querySelectorAll("select").forEach((select) => {
    select.selectedIndex = 0;
  });
  document.querySelector(".step01").classList.remove("off");
  document.querySelector(".step02").classList.remove("active");
  document.querySelectorAll(".progress").forEach((step) => {
    step.classList.remove("active");
    step.style.display = "none";
  });

  const firstStep = document.querySelector('.progress[data-step="1"]');
  firstStep.classList.add("active");
  firstStep.style.display = "flex";
  firstStep.style.opacity = 1;

  document.querySelector(".count span").innerText = "1";
  document.querySelector(".percentBg").style.width = "20%";

  currentStep = 1;

  nav.classList.remove("last");
  wrapper.classList.remove("off");
  modal.classList.remove("on");
  arrow.classList.remove("prev");
  arrow.classList.add("close");
}

// document.addEventListener("DOMContentLoaded", () => {
//   const resultBtn = document.querySelector(".progress.result .result");
//   const heroBtn = document.querySelector(".heroBtn");
//   const modal = document.querySelector(".formSection");
//   if (resultBtn) {
//     resultBtn.addEventListener("click", resetFormAndClose);
//   }
//   if (heroBtn) {
//     heroBtn.addEventListener("click", () => {
//       modal.classList.add("active");
//     });
//   }
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const allAgree = document.getElementById("c_agree"); // 전체 동의
//   const allChecks = document.querySelectorAll(
//     '.agree-item input[type="checkbox"]',
//   ); // 모든 약관 체크박스
//   const allRadios = document.querySelectorAll(
//     '.agree-item input[type="radio"]',
//   );

//   /*체 동의 체크 시 모든 항목 반영 */
//   allAgree.addEventListener("change", () => {
//     const isChecked = allAgree.checked;

//     // 모든 체크박스
//     allChecks.forEach((chk) => (chk.checked = isChecked));

//     // 모든 라디오 → value="true"면 동의함, 아니면 동의하지 않음
//     allRadios.forEach((radio) => {
//       if (isChecked) {
//         if (radio.value === "true") radio.checked = true;
//       } else {
//         if (radio.value === "false") radio.checked = true;
//       }
//     });
//   });

//   /*개별 체크 변경 시 전체 동의 상태 동기화 */
//   allChecks.forEach((chk) => {
//     chk.addEventListener("change", () => {
//       const allChecked = [...allChecks].every((el) => el.checked);
//       allAgree.checked = allChecked;
//     });
//   });

// });

function toggleDetail(id, btn){
  const open = document.getElementById('detail-'+id).classList.toggle('open');
  btn.querySelector('.agree-arr').textContent = open ? '－' : '＋';
}