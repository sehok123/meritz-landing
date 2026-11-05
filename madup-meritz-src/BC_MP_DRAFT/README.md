# BC_MP_DRAFT: 개발팀 전달 메모

메리츠 파트너스 부업 모집 랜딩 시안입니다. 매드업 메리츠 구조(BC261028·BC260331)를 기준으로 만들었습니다.

## 지킨 것
- `/assets`, `/main` 공통 파일은 하나도 수정하지 않았습니다. 새 파일은 모두 이 폴더 안에만 있습니다.
- `<head>`의 공통 CSS 순서와 `<body>` 끝의 공통 JS 순서는 BC261028과 같습니다.
- 본문 섹션은 BC260331 마크업을 따랐습니다: `section.section.section01~03 > .content`, `.mb-*`, `.mb-3.backgroundMain`, `.reviews`, `.mt-12`, `.btn1~3.viewButton`.
- 공통 컴포넌트를 그대로 썼습니다:
  - 접수: `main.js`의 `save()`
  - 완료 시트: `#sheet-success.bottom-sheet`
  - 안내: `openLayerAlert()`
  - 이탈 방지: `.blockerModal` / `showblockerModal()`
  - 동의 팝업 틀: `.common-modal-wrap.modal-overlay`

## 단계형 폼 대신 "한 페이지 설문형 신청서"
기획 요청에 따라 신청서를 단계형 `.formSection`(2603FA.js)이 아니라 본문 안의 `section04#apply`로 만들었습니다. 흐름은 다음과 같습니다.
1. 드롭다운 4개(지역, 직업, 연령대, 상담시간)를 고르고 이름·연락처를 입력합니다.
2. 신청 버튼을 누르면 개인정보 동의 팝업이 뜹니다.
3. 동의 후 "확인"을 누르면 `save()`가 실행됩니다.

- 그래서 `2603FA.js`는 불러오지 않습니다. 지역 데이터(`area`)만 `js/campaign.js`로 옮겼습니다.
- `save()`가 읽는 id·값은 BC261028과 같습니다.

| 항목 | 요소 | 값 |
|---|---|---|
| 지역 | `select#user_sido`, `select#user_gugun` (hidden) | 예: 서울 / 강남구 → `actArCd` "서울_강남구" |
| 직업 | `#job_div_cd` | 01~05 |
| 연령대 | `#payment` | 01~07 (10대는 신청 불가 안내 후 선택 취소, 20대·60대 이상은 BC261028과 같은 안내) |
| 상담시간 | `select#cns_req_hr_div_cd` (hidden) | 13 / 14 (`option:checked` 문구를 `save()`가 읽으므로 select) |
| 이름·연락처 | `#user_name`, `#user_call` | 연락처는 '-' 없이 11자리 |
| 동의 | `#c_terms`(필수), `#c_survey_privacy`(hidden) | 마케팅 활용 동의와 광고성 정보 수신 동의를 **둘 다** 했을 때만 체크 (BC261028과 같은 기준) |
| 기타 | `#orgCd`, `#is_saved` | 그대로 |

- 로컬(127.0.0.1:8080)에서 `fetch`를 가로채 확인한 결과, `save()`가 다음 값을 보내고 `#sheet-success`가 열렸습니다:
  `{fnm:"홍길동", ctp:"01039274815", actArCd:"서울_강남구", cnsReqHrDivCd:"13", jobDivCd:"01", hopPremDivCd:"03", qstAgrYn:"Y", choAgrYn:"Y"}`

## 파일
- `index.html`
- `style/style.css`, `style/style.scss`: 두 파일은 내용이 같습니다. 위쪽은 BC260331 style.css 그대로이고, 맨 아래 "캠페인 전용" 구역만 추가했습니다.
- `js/campaign.js`:
  - 신청서: 드롭다운, 입력 확인, 동의 팝업 → `save()`
  - 이탈 방지 팝업
  - 연출: 금액 슬롯머신, 후기 롤링, 하단 고정 버튼 숨김
- `images/arrow.png`
- 공통 이미지 사용: `/assets/images/img_logo_color.png`, `img_blocker.png`, `img_blocker_closeBtn.png`
- 외부 글꼴: Pretendard(기존과 같음), 이모지용 Google Noto Color Emoji(사용하는 글자만 받아옴, SIL OFL 1.1)

## 배포 전 확인 부탁
1. **폴더명**: `BC_MP_DRAFT`는 임시 이름입니다. 캠페인 코드로 바꿔 주세요.
2. **광고 추적 코드**: GTM·TikTok·facebook-domain-verification은 넣지 않았습니다. `<head>`에 표시한 주석 위치에 배포 기준대로 넣어 주세요.
3. **5,000,000원 각주**: 현재 "*25년 4월 상위 5% 수익자 기준"인데, 이 문구는 예전 3,102,514원의 기준입니다. 확정 문구로 바꿀 예정입니다.
4. **로컬 확인 주의**: 공통 `main.js`는 `localhost:8080`, `127.0.0.1:8080`에서만 API를 `localhost:8000`으로 보냅니다. 다른 주소에서 열면 운영 API로 접수됩니다.
