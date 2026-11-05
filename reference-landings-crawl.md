# 레퍼런스 유사 랜딩 크롤링 결과 (2026-11-05)

기준 레퍼런스: https://your-teeth.co.kr/view/OxHeilINtB/zPJcCoj ("틈틈 파트너스" N잡 설계사 모집 DB 랜딩)

## 판정 기준

| 조건 | 확정 근거 | 추정 근거 |
| --- | --- | --- |
| ① DB(이벤트) 신청 | 이름·연락처 입력 + 개인정보 동의 + 접수 처리(폼 전송·시트·API)가 페이지에 있음 | — |
| ② Claude Code 사용 | GitHub 커밋에 `Co-Authored-By: Claude …` 서명(Claude Code가 커밋할 때 붙이는 표시) | 코드 주석·구조가 AI 코딩 도구 특유의 형태(공개 저장소 없음) |
| ③ 광고 사용 | 메타 광고 라이브러리에서 해당 주소로 연결되는 광고 확인, 또는 커밋에 "광고 심사", "메타용", "광고 랜딩" 명시 | 광고 픽셀(메타·구글애즈·틱톡 등)·UTM 처리만 있음 |

조사 경로: ① GitHub 커밋 검색(랜딩·DB·상담신청·픽셀·UTM·보험·부업 등 + Claude 서명) ② 메타 광고 라이브러리(대한민국, "설계사 부업", "설계사 모집", "부업 첫 달 평균") ③ 각 라이브 페이지 HTML 점검.

레퍼런스와 같은 빌더(your-teeth.co.kr)의 다른 랜딩은 사이트 루트·robots.txt·목록 경로가 모두 403/404로 막혀 있어 직접 수집하지 못했습니다.

---

## A등급 — 세 조건 모두 확정 (레퍼런스 유사도 순)

### 1. 메리츠 파트너스 2607BO — 하루 1시간, 월평균 150만원 부수입
- 주소: https://meritzpartners.com/2607BO/
- ② Claude: [taiyoung-stong/meritz-2607BO](https://github.com/taiyoung-stong/meritz-2607BO/commits) — 커밋 2건 모두 Claude Opus 4.8 공동 작성 ("메리츠 파트너스 2607BO 단일 히어로 랜딩", "폼 5단계에 입금 알림 카드(500만원 카운트업 GIF) 추가")
- ③ 광고: 메타 광고 라이브러리에서 "메리츠 파트너스" 광고가 이 주소로 연결됨 + GTM
- ① DB: 5단계 신청 폼(이름·연락처)
- 레퍼런스와 닮은 점: 전광판(LED) 마퀴 "선착순 마감 임박", 큰 숫자 히어로(150만원 레드 3D), **입금 알림 카운트업 카드**, 하단 고정 CTA

### 2. 신한라이프 신입 채용 — "집에서 쉬던 나도, 할 수 있을까요?"
- 저장소: [skj9705066-cell/shinhan-landing](https://github.com/skj9705066-cell/shinhan-landing/commits) (공개 배포 주소는 찾지 못함)
- ② Claude: 커밋 3건 Claude Opus 4.8 / Sonnet 4.6 공동 작성
- ③ 광고: 커밋 "푸터에 사업자 신원정보 추가 (광고 심사 대응)"
- ① DB: 이름·연락처·개인정보 동의, 구글 Apps Script(구글 시트)로 접수
- 레퍼런스와 닮은 점: 설계사 모집을 "주부·경력단절·집에서 쉬는 사람" 반전형 후킹으로 풀고, "첫 달부터 지원금", "30초 만에 상담 신청", 마감 타이머, 흐르는 띠, 하단 고정 CTA, 부지점장 친필 편지 섹션

### 3. 보장 점검 신청 — "내 보험, 뭐가 나오는지 알고 계신가요?"
- 주소: https://kim63789520-star.github.io/rentalmallra-site/bohum/ , https://kim63789520-star.github.io/rentalmass-site/bohum/
- ② Claude: [rentalmallra-site](https://github.com/kim63789520-star/rentalmallra-site/commits), [rentalmass-site](https://github.com/kim63789520-star/rentalmass-site/commits) — Claude Opus 5.5 / Fable 5.1 공동 작성
- ③ 광고: 커밋 "보험 랜딩 /bohum/ — …메타용 원본 제외", 메타 픽셀 + UTM, 헤드라인을 `?i=` 값으로 바꾸는 광고 소재별 랜딩
- ① DB: 첫 화면 신청 카드(휴대폰만 필수), 개인정보 동의
- 닮은 점: "신청 30초", 비용·강요 없음 배지, 설계사 실명·프로필, 하단 고정 CTA

### 4. 청년 NEXT STEP 프로젝트 참여자 모집
- 주소: https://muhaevillage-02.github.io/next-step-landing/
- ② Claude: [muhaevillage-02/next-step-landing](https://github.com/muhaevillage-02/next-step-landing/commits) — Claude Opus 5.5 ("UTM 기록 정확도 개선 (메인·군전역 랜딩)")
- ③ 광고: 메타 픽셀 + UTM, 유입 경로별 랜딩
- ① DB: 이름·출생연도·연락처·지역(시·군·구)·개인정보 동의
- 닮은 점: 모집 마감 시각, 정원(총 15명), 전형 선택, 하단 고정 CTA

### 5. 토크비(TalkB) — 식당·카페 AI 마케팅 무료 확인 신청
- 주소: https://talkb.vercel.app
- ② Claude: [TNSCOMPANY-PM/TalkB](https://github.com/TNSCOMPANY-PM/TalkB/commits) — Claude Fable 5 / Opus 5.5
- ③ 광고: 커밋 "메타 픽셀 설치 … 전환 이벤트", "form_start · cta_hesitate 를 GA4 · 메타 픽셀 · Clarity 이벤트로"
- ① DB: 이름·직함·매장명·연락처·문의·개인정보 동의
- 닮은 점: 흐르는 띠, 하단 고정 CTA, 비교 수치

### 6. 힐스테이트 수원파크포레 분양 상담
- 주소: https://suwon.bunyanghouse.com
- ② Claude: [intothefuture2026-commits/bunyanghouse-suwon](https://github.com/intothefuture2026-commits/bunyanghouse-suwon/commits) — Claude Sonnet 5 ("랜딩: Google Ads 전환추적 태그 설치")
- ③ 광고: 구글애즈 전환 태그 + GTM
- ① DB: 성함·연락처·개인정보 동의, 방문예약 접수

### 7. 헬스장·필라테스 창업 상담 — "내 센터를 차리고 싶은데 확신이 서지 않는다면"
- 주소: https://thegrowcompany.vercel.app/lp/startup-guide
- ② Claude: [thegrowcompany1-cm/thegrowcompany](https://github.com/thegrowcompany1-cm/thegrowcompany/commits) — Claude Sonnet 5.5
- ③ 광고: 커밋 "/lp/startup-guide 창업 불안 해소형 광고 랜딩 신설 (걱정 선택 칩·픽셀·섹션 퍼널 등록)"
- ① DB: 이름·연락처·지역·개인정보 동의
- 닮은 점: 걱정 선택 칩(설문형 후킹), 흐르는 띠, 하단 고정 CTA

### 그 밖의 A등급 (업종이 레퍼런스와 거리가 있음)
| 랜딩 | 주소 | Claude 커밋 | 광고 근거 |
| --- | --- | --- | --- |
| 온단골 (식당 리뷰 답글 SaaS 무료 체험 신청) | https://tkdgk0725-cpu.github.io/ondangol-landing/ | [저장소](https://github.com/tkdgk0725-cpu/ondangol-landing/commits) Opus 4.8 | 메타 픽셀 + UTM |
| 다올105 수시 지원 라인 무료 조회 | https://jayu0422-blip.github.io/daol105-susi/ | [저장소](https://github.com/jayu0422-blip/daol105-susi/commits) Opus 5 | "컨설팅 랜딩 2종에 신청폼·유입추적 + UTM 승계" |
| 엔엠솔루션 공장 수리 (작업별 광고 랜딩 5개) | https://nm-solution-inky.vercel.app | [저장소](https://github.com/kdolbae/nmsolution/commits) Opus 5.5 | 커밋 "작업별 광고 랜딩", "누수 피해복구 광고 랜딩" |

---

## B등급 — 광고 집행·DB 신청은 확정, Claude는 코드로 추정 (공개 저장소 없음)

메타 광고 라이브러리에서 설계사 모집·부업 광고의 연결 주소로 확인된 페이지입니다.

| 랜딩 | 주소 | DB 폼 | 광고 추적 | Claude 추정 근거 | 추정 강도 |
| --- | --- | --- | --- | --- | --- |
| 메리츠 파트너스 2608CLV · 2609VTD · 2610AF · 2610CPA | https://meritzpartners.com/2610AF/ 외 | 이름·연락처 | GTM | 2607BO(Claude 확정)와 같은 템플릿 계열 — "S1 HERO", "입금 알림 카드 (연락처 단계 · 카운트업 GIF)", "고정 CTA (하단 sticky)" 주석 | 높음 |
| 메타리치 이룸본부 경력 설계사 영입 | https://metarich-eroom.shop/recruit-pro | 이름·연락처·동의 | 메타 픽셀 · GA4 · Clarity · UTM | "멈춤·재생(자동으로 움직이는 콘텐츠의 정지 수단)", "타입 계단: 12 · 13 · 14…" 같은 설계 설명 주석 | 높음 |
| 메타리치 "고객 확보도, 조직 세팅도." | https://joyful-faloodeh-a259e1.netlify.app/ | 이름·연락처·동의 | 메타 픽셀 | 이미지까지 넣은 단일 HTML(2.9MB), "Analytics must never change the confirmed submission result." 같은 영어 설계 주석, 자동 이름 Netlify 배포 | 중간 |
| 키움에셋플래너 설계사 모집 (신입·경력) | https://kiwoom.ton80.kr/new | 이름·연락처·동의 | 메타 픽셀 · UTM | 영어 구간 주석(hero / benefits / fixed CTA), 짧은 CSS 변수(--ink, --line, --paper) | 중간 |
| "보험영업, 지금은 DB 싸움입니다" (설계사 대상 DB 판매) | https://dancing-buttercream-3072d7.netlify.app/ | 이름·연락처·동의 | UTM | 자동 이름 Netlify 배포, 짧은 CSS 변수 | 낮음 |

판단 불가·제외: KBA본부 구리지사 설계사 모집(https://nes50.mqz.co.kr/, 메타 픽셀, 앱형 페이지라 코드 판별 불가), 메타리치 경력직 모집(heypick.co.kr, 워드프레스 — Claude 아님), leadgeny.kr(리드 빌더, 판별 불가), SHCO(접속 실패).

---

## UI 참고용 (DB 신청 조건 미충족)

- 쁘띠리치 미국 성장주 투자 입문 — https://petitrich-landing.vercel.app ([저장소](https://github.com/jjbb3239-pixel/final_project_marketing), Claude Opus 5.5, 메타 픽셀·GTM·Clarity·UTM). 흐르는 띠, 말풍선, 이탈 팝업, 하단 고정 CTA까지 레퍼런스와 장치가 가장 많이 겹치지만, 신청 DB가 아니라 강의 결제로 보내는 클릭 캠페인입니다.

## 레퍼런스에서 확인한 것

- 빌더: your-teeth.co.kr (`shopCode`/`landingCode` 구조), 방문 시 유입 경로(referrer)를 빌더 서버에 기록, 신청은 빌더 API로 접수
- Claude 생성 코드로 보이는 특징: `[기준 기간 기입]` 같은 대괄호 자리표시, 점선 노란 `.ph` 표시, `/* ===== 첫 화면 ===== */` 구간 주석과 단계별 덧칠 블록, Tailwind zinc 원색값(#71717a 등). 공개 저장소가 없어 확정은 아님.
