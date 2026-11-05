# 메리츠파트너스 랜딩 작업 규칙

## 역할
- 너는 **메리츠파트너스 랜딩 디자이너**다.
- 사용자는 메리츠파트너스 광고 기획 담당이고, 한국어로 소통한다.
- 만드는 것은 보험설계사 부업 모집용 **DB 신청(상담 신청서) 랜딩**이며, 모바일(360–430px)이 기준이다.

## 최우선 규칙 (매드업 개발팀 요청, 2026-11-05)
1. `madup-meritz-src/assets/`, `madup-meritz-src/main/`에 있는 규칙은 **절대 변경하지 않고 따르며, 최우선으로 참고한다.**
   - 이 두 폴더의 파일은 수정, 이동, 삭제, 이름 변경을 하지 않는다.
2. 새 랜딩은 `madup-meritz-src/BC261028/`과 같은 **캠페인 폴더 하나**로 만든다.
   - 폴더 위치는 `madup-meritz-src/` 아래, `BC261028`과 나란히 둔다.
   - 폴더 이름은 사용자 또는 개발팀이 정한 캠페인 코드를 쓴다.
3. **단일 HTML 파일로 만들지 않는다.** 인라인 CSS/JS, base64 이미지, 자체 폼 전송 코드가 들어간 단일 파일은 개발팀이 퍼블리싱할 수 없다.
   - 개발팀 설명: "AI로 만든 PNG를 받아 디자인 원본 파일을 고쳐 달라는 것과 같다."
4. 출처는 개발팀이 준 `메드업 메리츠 랜딩 샘플.zip`이고, https://meritzpartners.com/BC261028/ 에 적용된 파일이다. 추출본이 `madup-meritz-src/`다.

## 캠페인 폴더 구조 (BC261028 기준)
```
BC2xxxxx/
  index.html
  images/        캠페인 이미지 (section01.gif …, btn_img.png, arrow.png, form1.png, sheet_img.gif …)
  js/2603FA.js   캠페인 스크립트: 스텝 이동 showStep, 지역 updateCityList, 동의 toggleDetail 등
  style/style.scss → style.css (+ .map)   캠페인 전용 스타일만
```
- `BC261028/js/form.js`와 `BC261028/js/main.js`는 index.html에서 쓰지 않는 사본이다. 공통 파일과 내용도 다르니 참고만 한다.

### `<head>` 스타일 순서 (그대로 유지)
1. Pretendard CDN
2. `/assets/css/default.css`
3. `/assets/css/styles_08A.css`
4. `/assets/css/common_modal.css`
5. `/assets/css/modal_alert.css`
6. `./style/style.css`
7. `/main/css/footer.css`

### `<body>` 끝 스크립트 순서 (그대로 유지)
1. `/assets/js/lib/jquery-3.7.0.min.js`, `aos.js`, `swiper-bundle.min.js`
2. axios (unpkg)
3. `/assets/js/commonScript.js`
4. `/assets/js/08/script.js`
5. `/assets/js/checkBadWords.js`
6. `/assets/js/form.js`
7. gsap 3.12.5 (CDN)
8. `./js/2603FA.js`
9. `/assets/js/main.js`
10. `/assets/js/loadHeader.js`

### 마크업 뼈대
- `.wrapper`: 랜딩 본문. BC261028은 섹션 이미지를 `<img>`로 나열하고, `.fixed_btn.viewButton`에 `onclick="openForm()"`을 단다.
- `.formSection` 안의 구성:
  - `.header`: `.form-arrow.close` 포함
  - `section.step.step01`: 인트로. `startDb()`로 시작한다.
  - `section.step.step02`:
    - `.stepRang` 진행바 (`.percentBg`, `.count`)
    - `.progress.p1`~`.p5` (`data-step`)
    - `#sheet-success.bottom-sheet`
- `.mainFooter`: 공통 푸터. SNS 아이콘은 `/main/images/icon_naver|icon_youtube|icon_instar.png`를 쓴다.

### 공통 JS가 읽는 폼 ID와 name (바꾸지 말 것)
| 항목 | 요소 |
|---|---|
| 지역 | `select#user_sido`, `select#user_gugun` |
| 직업 | hidden `#job_div_cd` + radio `name="job_div_cd"` 값 01 직장인, 02 자영업, 03 개인사업자, 04 주부, 05 무직 |
| 연령대 | hidden `#payment` + radio `name="payment"` 값 01 10대 ~ 07 70대 이상 |
| 상담시간 | hidden `#cns_req_hr_div_cd` + radio 값 13 오전, 14 오후 |
| 이름·연락처 | `#user_name`, `#user_call` (maxlength 11, '-' 없이) |
| 숨김값 | `#orgCd`, `#is_saved` (값 "N") |
| 동의 | `#c_agree`(전체), `#c_terms`(필수), `#c_survey_privacy`(선택) / radio `collect_info_chk`, `survey_privacy_chk`, `survey_privacy_chk2` |
| 전송 버튼 | `button#sendButton.btn.last.backgroundMain.submitButton` |

- 전송은 `/assets/js/main.js`의 `save_consultation_information()`이 `${API_URL}/meritz/consultation-information`으로 POST한다.
- **전송 코드나 엔드포인트를 새로 만들지 않는다.**

### 스타일 작성 규칙
- 공통 클래스는 그대로 쓴다: `colorMain`, `backgroundMain`, `btn`, `btn4`, `last`, `flex`, `option-list`, `radio-label`, `icon`, `labelBox`, `label`, `consent`, `allCheck`, `agree-item`, `agree-head`, `agree-detail`, `yn-row`, `yn`, `yn-opt`, `opt-note`, `mo` 등.
- 공통 클래스를 전역으로 덮어쓰지 않는다. 캠페인 차이는 `style/style.scss` 안에서 캠페인 범위로만 준다.
- 경로 규칙:
  - 공통 자원은 루트 절대경로(`/assets/...`, `/main/...`)
  - 캠페인 자원은 상대경로(`./images/...`)
- 로컬 미리보기는 `madup-meritz-src/`를 웹 루트로 띄워야 `/assets` 경로가 맞는다. 예: `npx serve madup-meritz-src`로 띄우고 `/BC261028/`을 연다.

### 추적 코드
- BC261028에는 GTM 2개, TikTok 픽셀, facebook-domain-verification이 들어 있다.
- 우리는 추적 코드를 새로 추가하지 않는다.
- 새 캠페인에 기존 블록을 그대로 둘지는 개발팀 기준을 따르고, 사용자에게 확인한다.

## 사용자 디자인 선호
- 사람 이미지와 사람 이모지는 쓰지 않는다.
- 기존 캠페인 이미지(예: BC260331 입금내역·폰 GIF)를 복제하지 않고 새로 만든다.
- 로고는 공식 파일만 쓰고, 다시 그리지 않는다.
- 히어로:
  - 흰 배경에 가운데 정렬
  - 큰 💸 하나가 둥둥 떠다니고, 주변에 이모지를 조금만 둔다
  - ₩ 동그라미를 반복하지 않는다
  - 이모지는 Noto Color Emoji(테두리 없음)를 쓰고, 애니메이션 WebP는 쓰지 않는다(가장자리 깜박임)
- 금액은 슬롯머신처럼 굴러가게 한다.
- 이탈 방지 팝업은 your-teeth 레퍼런스 톤을 따른다.
- 후기는 위로 계속 롤링하고, 후기 아래 띠 배너는 넣지 않는다.

## 진행 중인 작업
- `madup-meritz-src/BC_MP_DRAFT/` (2026-11-05): mp랜딩을 매드업 구조로 다시 만든 캠페인 폴더. 폴더명은 임시이고, 개발팀이 정한 캠페인 코드로 바꿔야 한다.
  - 본문은 BC260331의 섹션 마크업(`section01`~`03`, `.mb-*`, `.reviews`, `.mt-12`, `.btn1`~`3`)을 따른다.
  - **DB폼은 사용자 요청(2026-11-05)으로 단계형 `.formSection` 대신 "한 페이지 설문형"(`section04#apply`)이다.** 형식은 `랜딩 (1).html`과 같다.
    - 흐름: 드롭다운 4개 + 이름·연락처 → 개인정보 동의 팝업(`.common-modal-wrap`) → 확인 시 공통 `save()`
    - 그래서 `2603FA.js`는 쓰지 않고, 지역 데이터 `area`만 `js/campaign.js`로 옮겼다.
    - `save()`가 읽는 id(`#user_sido` 등)는 hidden 요소로 그대로 둔다. 세부 내용은 `BC_MP_DRAFT/README.md`(개발팀 전달 메모)에 있다.
  - `style/style.css`(= `style.scss`)는 위쪽이 BC260331 CSS 그대로이고, 맨 아래 "캠페인 전용" 구역만 우리가 추가했다.
  - `js/campaign.js`: 신청서, 이탈 방지 팝업(공통 `showblockerModal()`), 슬롯머신 금액, 후기 롤링, 하단 버튼 숨김
  - 전달용 압축: 프로젝트 루트의 `BC_MP_DRAFT.zip`. 경로 구분자는 `/`로 해서 맥에서도 정상으로 풀리게 했다(`tar -a`로 생성).
  - 미리보기는 반드시 **8080 포트**로 연다(`http://127.0.0.1:8080/BC_MP_DRAFT/`). 공통 `main.js`는 8080일 때만 API를 `localhost:8000`으로 보내고, 그 외 포트에서는 실제 운영 API로 접수가 전송된다.
- `mp-landing.html`:
  - BC260331 내용을 클린형으로 만든 **단일 파일 시안**이다. 위 구조(캠페인 폴더)로 다시 만들어야 퍼블리싱할 수 있다.
  - 5,000,000원 각주 기준은 사용자가 보내줄 예정이다. 현재 문구 "*25년 4월 상위 5% 수익자 기준"은 예전 3,102,514원의 기준이다.
- 이전 산출물: `meritz-referral-landing.html`(친구추천 랜딩), `reference-landings-crawl.md`, `landing-comparison.html`, `mp-design-options.html`
