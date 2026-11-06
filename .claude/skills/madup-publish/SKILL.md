---
name: madup-publish
description: 다른 곳(다른 Claude·Claude Code·디자이너)에서 만든 메리츠파트너스 랜딩 HTML(보통 이미지가 base64로 들어간 단일 파일)을 매드업 메리츠 구조의 BC 캠페인 폴더로 다시 만들고, 개발팀 전달용 zip까지 뽑을 때 쓴다. "매드업 구조로 퍼블리싱", "개발팀 전달용으로 만들어줘", "BC 폴더로 바꿔줘", "zip으로 뽑아줘" 같은 요청에 해당한다.
---

# 단일 HTML → 매드업 BC 캠페인 폴더 → zip

매드업 개발팀은 AI가 만든 단일 HTML을 그대로 퍼블리싱할 수 없다고 했다 ("AI로 만든 PNG를 받아 원본 디자인 파일을 고쳐 달라는 것과 같다"). 그래서 화면은 원본 그대로 살리되, **매드업 공통 파일·클래스·컴포넌트·접수 함수 위에 다시 짠다.** 이 저장소의 `CLAUDE.md` 규칙이 이 문서보다 우선한다.

**정답 예시**
- `madup-meritz-src/BC_MP_DRAFT/`: 한 페이지 설문형 DB폼
- `madup-meritz-src/BC261028/`: 단계형 DB폼
- 시작하기 전에 `BC_MP_DRAFT/README.md`, `index.html`, `js/campaign.js`를 먼저 읽는다.

## 0. 준비
- 이 저장소 루트에서 작업한다. 필요한 도구:
  - Node.js: `node -v`로 확인한다. 없으면 `winget install OpenJS.NodeJS.LTS`
  - git
- 사용자에게 먼저 확인할 것 (모르면 묻는다):
  1. **캠페인 코드** = 폴더명 = 랜딩 주소 (예: `BC261112`). 아직 없으면 `BC_이름_DRAFT`로 임시로 만들고 README에 적는다.
  2. **DB폼 방식**: 원본처럼 한 페이지 설문형(BC_MP_DRAFT 방식)인지, 매드업 단계형(BC261028 + `2603FA.js`)인지
- 절대 규칙:
  - `madup-meritz-src/assets/`, `madup-meritz-src/main/`은 수정·이동·삭제하지 않는다.
  - 새 파일은 새 캠페인 폴더 안에만 만든다.

## 1. 원본 분석
```bash
node tools/extract-assets.mjs "<원본.html>" "<스크래치폴더>/<코드>-source"
```
- 하는 일:
  - base64 이미지를 `images/asset-NN.*` 파일로 뺀다.
  - `source.cleaned.html`(이미지 경로를 바꾼 원본)과 `assets.json`(크기·쓰인 위치)을 만든다.
  - 섹션, 폼 항목, 팝업, 외부 리소스, 추적 코드 요약을 출력한다.
- `source.cleaned.html`을 읽고 아래를 표로 정리한 뒤 사용자에게 짧게 보여준다:
  - 섹션 순서, 문구
  - 폼 항목 → 매드업 id 매핑 (4단계 표 참고)
  - 팝업(약관·이탈·완료)
  - 효과(카운트업, 롤링, 고정 버튼, 마퀴)
- 원본 문구와 각주(수익 기준, 보험업법 문구)는 바꾸지 않는다. 바꿀 것이 있으면 사용자에게 묻는다.

## 2. 캠페인 폴더 만들기
```
madup-meritz-src/<코드>/
  index.html
  images/            원본에서 뺀 이미지 중 실제로 쓰는 것만 (이름은 의미 있게: hero_comic01.png 등)
  js/campaign.js     캠페인 동작 (설문형 폼, 팝업, 효과)
  style/style.css    = style.scss (같은 내용)
  README.md          개발팀 전달 메모 (BC_MP_DRAFT/README.md 형식)
```
- `<head>` CSS 순서와 `<body>` 끝 JS 순서는 `BC_MP_DRAFT/index.html`을 그대로 복사한다. 단계형이면 `2603FA.js`를 `main.js` 앞에 넣는다.
- 인라인 `<style>`, base64 이미지, 자체 전송 코드(fetch·XHR·form action)는 쓰지 않는다. `<head>`의 인라인 스크립트는 `history.scrollRestoration`과 `openForm()`만 둔다.
- 광고 추적 코드(GTM·메타·틱톡)는 넣지 않는다. `<head>`에 개발팀이 넣을 자리를 주석으로 남긴다.
- 로고는 `/assets/images/img_logo_color.png`, 푸터는 `.mainFooter` 마크업(`BC_MP_DRAFT`와 같음)을 쓴다.

## 3. 본문 마크업
- 섹션은 매드업 패턴으로 짠다: `<section class="section sectionNN"><div class="content">…</div></section>`
- 매드업 클래스를 먼저 쓴다:
  - `colorMain`, `backgroundMain`
  - `btn btn1~3 viewButton`(CTA, `onclick="openForm()"`)
  - `mb mb-1`(칩), `mb-3`(수치 박스), `txt txt1/txt2`(각주), `text-desc`, `text-body`, `reviews`, `review-icon`, `mt-12`(아이콘 3열), `flex`
- 원본에만 있는 장치(만화 컷, 비교표, 4단계 안내 등)는 캠페인 클래스로 만든다. 이름은 카멜케이스로 짓는다(예: `comicCut`, `compareTable`, `stepGuide`). 스타일은 `style.css`의 "캠페인 전용" 구역에만 쓴다.
- `.wrapper img { width: 100% }` 규칙이 있으므로, 작은 이미지는 캠페인 CSS에서 `width:auto` 등으로 범위를 좁혀 고친다.
- 이모지가 있으면 Noto Color Emoji를 쓰는 글자만 받는다. Windows 테두리 문제 때문이다:
  - `fonts.googleapis.com/css2?family=Noto+Color+Emoji&text=<URL인코딩한 이모지들>`
  - 이모지 요소에 `font-family:"Noto Color Emoji"`를 준다.

## 4. DB폼 연결 (가장 중요)
접수는 **공통 `/assets/js/main.js`의 `save()`만** 쓴다. `save()`는 아래 id에서 값을 읽으므로, 원본 항목을 이 id로 옮긴다. 화면에 보이는 입력 UI는 원본 모양대로 만들되, 값은 이 요소들에 넣는다.

| 원본 항목 (예) | 매드업 요소 | 값 |
|---|---|---|
| 시·도 (`sido`) | `select#user_sido` (hidden 가능) | `area`의 키: "서울", "경기" 등 |
| 시·군·구 (`sigungu`, `gugun`) | `select#user_gugun` | "강남구" 등 → 서버엔 `시도_구군`으로 감 |
| 직업 (`job`) | `#job_div_cd` | 01 직장인 · 02 자영업 · 03 개인사업자 · 04 주부 · 05 무직 |
| 연령대 (`age`) | `#payment` | 01 10대 · 02 20대 · 03 30대 · 04 40대 · 05 50대 · 06 60대 · 07 70대 이상 |
| 상담시간 | `select#cns_req_hr_div_cd` | 13 오전 · 14 오후 (`option:checked` 문구를 읽으므로 반드시 select) |
| 이름 (`name`) | `#user_name` | |
| 연락처 (`phone`) | `#user_call` | 숫자만 11자리 (`-` 없이) |
| 필수 동의 | `#c_terms` (checkbox) | |
| 마케팅 동의 | `#c_survey_privacy` (checkbox, hidden 가능) | 활용 동의 + 광고성 수신 동의 **둘 다** 했을 때만 체크 |
| 숨김값 | `#orgCd`, `#is_saved` (value "N") | |
| 전송 버튼 | `button#sendButton` | |
| 완료 화면 | `<div id="sheet-success" class="bottom-sheet sheet-success"></div>` | 공통 form.js가 채우고 save()가 성공 시 연다 |

- **원본에 상담시간 질문이 없으면**: `<div class="input_item hide"><select id="cns_req_hr_div_cd">…</select></div>`로 감싼다. 그러면 save()가 "16"(시간 무관)으로 보낸다.
- 원본 직업·연령 선택지가 위 코드와 다르면 (예: "프리랜서", "50대 이상") 사용자에게 매핑을 확인한다. 임의로 정하지 않는다.
- 지역 데이터는 `BC_MP_DRAFT/js/campaign.js`의 `area`를 복사해 쓴다. 매드업 값 형식이다.
- 설문형 흐름은 BC_MP_DRAFT `campaign.js`를 출발점으로 쓴다:
  1. 드롭다운으로 hidden 값을 채운다.
  2. 신청 버튼을 누르면 입력을 확인한다. 공통 `isEmpty`, `isCleanWords`, `isVaildName`, `checkEachCharacterKoreanInput`, `blockedNumbers` 등을 쓰고, 안내는 `openLayerAlert`로 띄운다.
  3. 개인정보 동의 팝업(`.common-modal-wrap.modal-overlay` 구조, 동의 문구는 BC261028 원문)을 띄운다.
  4. "확인"을 누르면 `save()`를 부른다.
- 연령 안내(10대 불가, 20대·60대 이상 안내)는 BC261028 `2603FA.js`의 `ageCheck1` 문구와 기준을 그대로 쓴다.
- 이탈 방지 팝업은 공통 `.blockerModal` 구조와 `showblockerModal()`을 쓴다. 원본 문구는 살린다.

## 5. 스타일
- `style.css` 위쪽에는 `BC_MP_DRAFT/style/style.css`의 기본 부분을 둔다. "BC_MP_DRAFT 캠페인 전용" 주석 앞까지다.
- 맨 아래에 `/* ===== <코드> 캠페인 전용 ===== */` 구역을 만들고, 원본 CSS를 매드업 클래스와 캠페인 클래스에 맞춰 옮긴다. 원본 CSS를 통째로 붙이지 않는다.
- 공통 클래스를 전역으로 덮어쓰지 않는다. 필요하면 `.sectionNN .btn1`처럼 범위를 좁힌다.
- `style.scss`는 `style.css`와 같은 내용으로 저장한다.
- 원본이 border로 나눈 곳은 그림자로 처리하는 편이 사용자 선호다. `prefers-reduced-motion`도 지킨다.

## 6. 점검 (모두 통과해야 전달)
```bash
node tools/check-campaign.mjs madup-meritz-src/<코드>
node tools/serve-8080.mjs           # http://127.0.0.1:8080/<코드>/
```
- **미리보기는 반드시 8080 포트로 한다.** 공통 main.js는 `localhost:8080`/`127.0.0.1:8080`일 때만 테스트 API(localhost:8000)로 보내고, 다른 주소에서는 **운영 접수 서버로 실제 신청이 들어간다.**
- 브라우저 확인 (360px, 430px):
  - 가로 넘침이 없다.
  - 첫 화면에 CTA가 보인다.
  - 겹치는 요소가 없다.
  - 콘솔 오류와 404가 없다.
- 폼 확인:
  - 빈 칸 안내 문구가 뜬다.
  - 10대는 차단되고 선택이 취소된다.
  - 동의 팝업의 "확인"은 필수 동의 전에는 비활성이다.
  - 동의 없이 닫으면 이탈 팝업이 1회 뜬다.
- 접수 확인:
  - 실제 제출은 하지 않는다. 페이지에서 `window.fetch`를 가로채 204를 돌려주게 한다.
  - `save()`가 보내는 값(`fnm`, `ctp`, `actArCd`, `cnsReqHrDivCd`, `jobDivCd`, `hopPremDivCd`, `qstAgrYn`, `choAgrYn`)과 `#sheet-success`가 열리는지 확인한다.
- `git status madup-meritz-src/assets madup-meritz-src/main`이 비어 있어야 한다.

## 7. 전달
- `README.md`(개발팀 전달 메모)를 쓴다:
  - 지킨 것
  - 폼 매핑 표
  - 파일 목록
  - 배포 전 확인 부탁: 폴더명, 추적 코드, 각주 등
- zip은 맥에서도 폴더 구조가 맞게 풀리도록 `/` 경로로 만든다. PowerShell `Compress-Archive`는 `\`로 만들어 쓰지 않는다.
  ```bash
  tar -a -c -f <코드>.zip -C madup-meritz-src <코드>
  ```
- 사용자가 원하면 커밋·푸시한다. 공통 폴더 변경이 섞이지 않았는지 `git status`로 확인한다.
- 마지막 보고에 넣을 것:
  - 만든 폴더와 zip 경로
  - 폼 매핑
  - 확인한 것과 못 한 것
  - 남은 확인 사항(캠페인 코드, 각주, 추적 코드)

## 하지 말 것
- 원본 단일 HTML을 고쳐서 넘기기. 반드시 BC 폴더로 다시 만든다.
- `assets/`·`main/` 수정, 새 전송 코드·엔드포인트 작성, 8080이 아닌 포트로 미리보기
- 사람 이미지·이모지를 새로 넣기 (사용자 선호), 기존 캠페인 이미지 복제, 로고를 다시 그리기
- 원본 문구·수익 각주·보험업법 문구를 임의로 바꾸기
