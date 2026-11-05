const floatingComponents = `
    <style>
      .faloting {
        position: fixed;
        right: 32px;
        bottom: 40px;
        z-index:5;
      }
      .faloting button {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 206px;
        height: 70px;
        padding-left: 8px;
        border-radius: 34px;
        background: linear-gradient(270deg, #ee3b24 0%, #d31800 100%);
      }
      .faloting button strong {
        color: #fff;
        text-align: center;
        font-family: Pretendard;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        letter-spacing: 0.975px;
      }
      .faloting button span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 76px;
        height: 50px;
        border-radius: 35px;
        background: #fff;
      }
      .faloting button span img {
        width: 50px;
      }
      @media screen and (max-width: 760px) {
        .faloting {
          position: fixed;
          right: 16px;
          bottom: 20px;
        }
        .faloting button {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 150px;
          height: 52px;
          padding-left: 8px;
          border-radius: 26px;
        }
        .faloting button strong {
          font-size: 18px;
        }
        .faloting button span {
          width: 56px;
          height: 36px;
          border-radius: 26px;
        }
        .faloting button span img {
          width: 36px;
        }
      }
    </style>
  <button class="floating-button">
    <span>
      <img
        src="/assets/images/img_floatingLogo.png"
        alt="메리츠파트너스 로고"
      />
    </span>
    <strong>신청하기</strong>
  </button>
`;
document.addEventListener("DOMContentLoaded", function () {
  const el = document.createElement("div");
  el.className = "faloting";
  el.innerHTML = floatingComponents;

  document.body.appendChild(el);

  const currentParams = getAdvtParams();
  const isParams =
    currentParams.advtMdiaDivVal &&
    currentParams.advtMdiaTpDivVal &&
    currentParams.advtMdiaDtlDivVal;

  const href = window.location.href;

  const pathParts = window.location.pathname.split("/").filter(Boolean).at(-1);
  const targetName = sessionStorage.getItem("template");

  let advtMdiaTpDivVal = "main";
  let advtMdiaDtlDivVal = targetName
    ? `${targetName}-banner-floating`
    : "banner-floating";

  // story / event
  if (href.includes("/review")) {
    advtMdiaTpDivVal = "story";
    advtMdiaDtlDivVal = "review-banner-floating";
  } else if (href.includes("/video")) {
    advtMdiaTpDivVal = "story";
    advtMdiaDtlDivVal = "video-banner-floating";
  } else if (href.includes("/faq")) {
    advtMdiaTpDivVal = "faq";
  } else if (href.includes("/event")) {
    advtMdiaTpDivVal = "event";
  }

  // blog
  else if (href.includes("/blog")) {
    advtMdiaTpDivVal = "blog";

    // blog category
    if (href.includes("/blog/category/")) {
      if (href.includes("factcheck")) {
        advtMdiaDtlDivVal = "factcheck-banner-floating";
      } else if (href.includes("interview")) {
        advtMdiaDtlDivVal = "interview-banner-floating";
      } else if (href.includes("moneylog")) {
        advtMdiaDtlDivVal = "moneylog-banner-floating";
      } else if (href.includes("clip")) {
        advtMdiaDtlDivVal = "clip-banner-floating";
      } else if (href.includes("njob")) {
        advtMdiaDtlDivVal = "njob-banner-floating";
      }
    }
    // blog detail
    else if (
      href.includes("/blog/factcheck") ||
      href.includes("/blog/interview") ||
      href.includes("/blog/moneylog") ||
      href.includes("/blog/clip") ||
      href.includes("/blog/njob")
    ) {
      advtMdiaDtlDivVal = pathParts + "-floating";
    }
    // blog main
    else {
      advtMdiaDtlDivVal = "main-banner-floating";
    }
  }

  const floatingBtn = document.querySelector(".faloting");

  //학습 가이드 카테고리
  const guideUrls = [
    "/blog/guide/",
    "/blog/category/guide/",
    "/blog/crm/",
    "/blog/category/crm/",
  ];
  // 현재 페이지 URL path
  const currentPath = decodeURI(window.location.pathname);

  // 학습가이드 url 인지 여부
  const isGuideUrl = guideUrls.some((url) => currentPath.includes(url));

  if (isGuideUrl) {
    floatingBtn.querySelector("strong").textContent = "학습하기";
  }

  // 클릭 이벤트 설정
  floatingBtn.addEventListener("click", function (e) {
    // 특정 URL 클릭 조건 추가

    if (isGuideUrl) {
      window.location.href = "https://meritz-partners.com/appInstall.jsp";
      return;
    }

    e.preventDefault();

    // 이미 파라미터가 있으면 덮어쓰지 않음
    if (isParams) {
      openBottomSheet("sheet-counsel");
      return;
    }

    // URL에 파라미터 추가
    const url = new URL(window.location.href);
    url.searchParams.set("advtMdiaDivVal", "site");
    url.searchParams.set("advtMdiaTpDivVal", advtMdiaTpDivVal);
    url.searchParams.set("advtMdiaDtlDivVal", advtMdiaDtlDivVal);

    // 주소창에 한글 그대로 반영
    window.history.replaceState({}, "", decodeURI(url.toString()));

    openBottomSheet("sheet-counsel");
  });
});
